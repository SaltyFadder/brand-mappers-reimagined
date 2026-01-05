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
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "../ImageUpload";

interface SEOSettings {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterHandle: string;
  googleAnalyticsId: string;
}

const defaultSettings: SEOSettings = {
  siteTitle: "Brand Mappers | BTL Advertising Excellence",
  siteDescription: "Your One-Stop BTL Advertising Partner. Transforming brands through exceptional events, exhibitions, and creative design solutions since 2016.",
  keywords: "BTL advertising, exhibitions, events, brand activation, printing, signage, Egypt, Dubai, Gulf",
  ogTitle: "Brand Mappers - Grow Bigger. Everyday.",
  ogDescription: "Leading BTL advertising agency creating impactful brand experiences across Egypt, Gulf, Africa, and the Americas.",
  ogImage: "",
  twitterHandle: "@brandmappers",
  googleAnalyticsId: "",
};

export const SEOEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<SEOSettings>(defaultSettings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "seo_settings")
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data?.value) {
          setSettings(data.value as unknown as SEOSettings);
        }
      } catch (err) {
        console.error("Error fetching SEO data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key: "seo_settings", value: JSON.parse(JSON.stringify(settings)) }, { onConflict: "key" });

      if (error) throw error;

      toast({
        title: "SEO settings saved",
        description: "Your changes have been published.",
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast({
        title: "Error saving",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
            SEO Settings
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage search engine optimization and social sharing settings
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

      <Card>
        <CardHeader>
          <CardTitle>Basic SEO</CardTitle>
          <CardDescription>Core meta tags for search engines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="siteTitle">Site Title</Label>
            <Input
              id="siteTitle"
              value={settings.siteTitle}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              placeholder="Your site title"
            />
            <p className="text-xs text-muted-foreground">Keep under 60 characters for best results</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="siteDescription">Meta Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              placeholder="Brief description of your site"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">Keep under 160 characters for best results</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              value={settings.keywords}
              onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-muted-foreground">Comma-separated list of keywords</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph (Social Sharing)</CardTitle>
          <CardDescription>How your site appears when shared on social media</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ogTitle">OG Title</Label>
            <Input
              id="ogTitle"
              value={settings.ogTitle}
              onChange={(e) => setSettings({ ...settings, ogTitle: e.target.value })}
              placeholder="Title for social sharing"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ogDescription">OG Description</Label>
            <Textarea
              id="ogDescription"
              value={settings.ogDescription}
              onChange={(e) => setSettings({ ...settings, ogDescription: e.target.value })}
              placeholder="Description for social sharing"
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label>OG Image</Label>
            <div className="flex items-start gap-4">
              <ImageUpload
                currentImage={settings.ogImage}
                onImageUploaded={(url) => setSettings({ ...settings, ogImage: url })}
                folder="seo"
                className="w-48 h-24"
              />
              <p className="text-xs text-muted-foreground">Recommended: 1200x630 pixels</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="twitterHandle">Twitter Handle</Label>
            <Input
              id="twitterHandle"
              value={settings.twitterHandle}
              onChange={(e) => setSettings({ ...settings, twitterHandle: e.target.value })}
              placeholder="@yourhandle"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
          <CardDescription>Connect tracking and analytics services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
            <Input
              id="googleAnalyticsId"
              value={settings.googleAnalyticsId}
              onChange={(e) => setSettings({ ...settings, googleAnalyticsId: e.target.value })}
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
