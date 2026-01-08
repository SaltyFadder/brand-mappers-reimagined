import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save, Upload, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
interface HeroStat {
  value: string;
  label: string;
}

interface HeroContent {
  badge: string;
  headline: string;
  tagline: string;
  ctaText: string;
  ctaSecondaryText: string;
}

export const HeroEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Hero content state
  const [content, setContent] = useState<HeroContent>({
    badge: "BTL Advertising Excellence Since 2016",
    headline: "GROW BIGGER.\nEVERYDAY.",
    tagline: "Your One-Stop BTL Advertising Partner. Transforming brands through exceptional events, exhibitions, and creative design solutions.",
    ctaText: "Start Your Project",
    ctaSecondaryText: "View Our Work",
  });

  // Stats state
  const [stats, setStats] = useState<HeroStat[]>([
    { value: "5000+", label: "Projects Delivered" },
    { value: "8+", label: "Years Experience" },
    { value: "15+", label: "Countries Served" },
    { value: "50+", label: "Team Members" },
  ]);

  // Video URL state
  const [videoUrl, setVideoUrl] = useState<string>("/hero-video.mp4");

  // Fetch existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["hero_content", "hero_stats", "hero_video"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "hero_content" && item.value) {
              setContent(item.value as unknown as HeroContent);
            }
            if (item.key === "hero_stats" && item.value) {
              setStats(item.value as unknown as HeroStat[]);
            }
            if (item.key === "hero_video" && item.value) {
              const videoData = item.value as { url?: string };
              if (videoData.url) {
                setVideoUrl(videoData.url);
              }
            }
          });
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
        toast({
          title: "Error loading data",
          description: "Could not load hero section data.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video must be smaller than 50MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-video-${Date.now()}.${fileExt}`;
      const filePath = `videos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-assets")
        .getPublicUrl(filePath);

      setVideoUrl(urlData.publicUrl);

      // Save video URL to database
      const { error: saveError } = await supabase
        .from("site_settings")
        .upsert(
          { key: "hero_video", value: { url: urlData.publicUrl }, updated_at: new Date().toISOString() },
          { onConflict: "key" }
        );

      if (saveError) throw saveError;

      toast({
        title: "Video uploaded",
        description: "Hero video has been updated successfully.",
      });
    } catch (err) {
      console.error("Error uploading video:", err);
      toast({
        title: "Upload failed",
        description: "Could not upload video. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the input
      if (videoInputRef.current) {
        videoInputRef.current.value = "";
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Upsert hero_content
      const { error: contentError } = await supabase
        .from("site_settings")
        .upsert({ key: "hero_content", value: JSON.parse(JSON.stringify(content)), updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (contentError) throw contentError;

      // Upsert hero_stats
      const { error: statsError } = await supabase
        .from("site_settings")
        .upsert({ key: "hero_stats", value: JSON.parse(JSON.stringify(stats)), updated_at: new Date().toISOString() }, { onConflict: "key" });

      if (statsError) throw statsError;

      toast({
        title: "Hero section saved",
        description: "Your changes have been published.",
      });
    } catch (err) {
      console.error("Error saving hero data:", err);
      toast({
        title: "Error saving",
        description: "Could not save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (field: keyof HeroContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const updateStat = (index: number, field: keyof HeroStat, value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const addStat = () => {
    setStats([...stats, { value: "", label: "" }]);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Hero Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Edit the main hero section of your homepage
          </p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>
            Edit the text content displayed in the hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badge">Badge Text</Label>
            <Input
              id="badge"
              value={content.badge}
              onChange={(e) => updateContent("badge", e.target.value)}
              placeholder="Badge text shown above headline"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Textarea
              id="headline"
              value={content.headline}
              onChange={(e) => updateContent("headline", e.target.value)}
              placeholder="Main headline"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Textarea
              id="tagline"
              value={content.tagline}
              onChange={(e) => updateContent("tagline", e.target.value)}
              placeholder="Descriptive tagline"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryCta">Primary Button</Label>
              <Input
                id="primaryCta"
                value={content.ctaText}
                onChange={(e) => updateContent("ctaText", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryCta">Secondary Button</Label>
              <Input
                id="secondaryCta"
                value={content.ctaSecondaryText}
                onChange={(e) => updateContent("ctaSecondaryText", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>
                Edit the statistics displayed at the bottom of the hero
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addStat}>
              <Plus className="w-4 h-4 mr-2" />
              Add Stat
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 border border-border rounded-lg"
              >
                <div className="flex-1 space-y-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Value</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", e.target.value)}
                      placeholder="5000+"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => updateStat(index, "label", e.target.value)}
                      placeholder="Projects Delivered"
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStat(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Background Card */}
      <Card>
        <CardHeader>
          <CardTitle>Video Background</CardTitle>
          <CardDescription>
            Upload a new video for the hero background (max 50MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {videoUrl && (
              <div className="mb-4">
                <video
                  src={videoUrl}
                  className="w-full max-w-md mx-auto rounded-lg"
                  controls
                  muted
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Video className="w-5 h-5" />
              <span className="text-sm">
                {videoUrl.includes("site-assets") ? "Custom video uploaded" : "Using default video"}
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => videoInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Video
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
