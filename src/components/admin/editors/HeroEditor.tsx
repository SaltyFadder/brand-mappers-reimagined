import { useState, useEffect } from "react";
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
import { Loader2, Plus, Trash2, Save } from "lucide-react";
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

  // Fetch existing data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["hero_content", "hero_stats"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "hero_content" && item.value) {
              setContent(item.value as unknown as HeroContent);
            }
            if (item.key === "hero_stats" && item.value) {
              setStats(item.value as unknown as HeroStat[]);
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
            Upload a new video for the hero background
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground">
              Current video: hero-video.mp4
            </p>
            <Button variant="outline" className="mt-4">
              Upload New Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
