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

interface AboutStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  secondaryDescription: string;
}

const defaultContent: AboutContent = {
  title: "About Us",
  subtitle: "Crafting Brand Experiences",
  description: "Since 2016, Brand Mappers has been at the forefront of BTL advertising, transforming how brands connect with their audiences. We specialize in creating immersive experiences that leave lasting impressions.",
  secondaryDescription: "From Egypt to the Gulf, across Africa to the Americas and Canada, we've helped brands grow bigger every day through exceptional events, stunning exhibitions, and innovative design solutions.",
};

const defaultStats: AboutStat[] = [
  { icon: "Briefcase", value: 5000, suffix: "+", label: "Projects Completed" },
  { icon: "Award", value: 8, suffix: "+", label: "Years in Business" },
  { icon: "Globe", value: 15, suffix: "+", label: "Countries Served" },
  { icon: "Users", value: 50, suffix: "+", label: "Team Members" },
];

export const AboutEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [stats, setStats] = useState<AboutStat[]>(defaultStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["about_content", "about_stats"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "about_content" && item.value) {
              setContent(item.value as unknown as AboutContent);
            }
            if (item.key === "about_stats" && item.value) {
              setStats(item.value as unknown as AboutStat[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const contentUpdate = supabase
        .from("site_settings")
        .upsert({ key: "about_content", value: JSON.parse(JSON.stringify(content)) }, { onConflict: "key" });

      const statsUpdate = supabase
        .from("site_settings")
        .upsert({ key: "about_stats", value: JSON.parse(JSON.stringify(stats)) }, { onConflict: "key" });

      const [contentRes, statsRes] = await Promise.all([contentUpdate, statsUpdate]);

      if (contentRes.error) throw contentRes.error;
      if (statsRes.error) throw statsRes.error;

      toast({
        title: "About section saved",
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

  const updateStat = (index: number, field: keyof AboutStat, value: string | number) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
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
            About Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Edit the about section content and statistics
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
          <CardTitle>Content</CardTitle>
          <CardDescription>Edit the main about section text</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={content.title}
                onChange={(e) => setContent({ ...content, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={content.subtitle}
                onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Primary Description</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secondaryDescription">Secondary Description</Label>
            <Textarea
              id="secondaryDescription"
              value={content.secondaryDescription}
              onChange={(e) => setContent({ ...content, secondaryDescription: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Edit the animated counter statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Value</Label>
                    <Input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(index, "value", parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Suffix</Label>
                    <Input
                      value={stat.suffix}
                      onChange={(e) => updateStat(index, "suffix", e.target.value)}
                      placeholder="+ or %"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Label</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
