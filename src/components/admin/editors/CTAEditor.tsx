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

interface CTAContent {
  headline: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

const defaultContent: CTAContent = {
  headline: "Ready to Transform Your Brand?",
  description: "Let's create something extraordinary together. Get in touch with our team to discuss your next project.",
  primaryButton: "Get Started",
  secondaryButton: "Schedule a Call",
};

export const CTAEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<CTAContent>(defaultContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "cta_content")
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data?.value) {
          setContent(data.value as unknown as CTAContent);
        }
      } catch (err) {
        console.error("Error fetching CTA data:", err);
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
        .upsert({ key: "cta_content", value: JSON.parse(JSON.stringify(content)) }, { onConflict: "key" });

      if (error) throw error;

      toast({
        title: "CTA section saved",
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
            CTA Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Edit the call-to-action section content
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
          <CardDescription>Edit the CTA section text and buttons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              value={content.headline}
              onChange={(e) => setContent({ ...content, headline: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryButton">Primary Button</Label>
              <Input
                id="primaryButton"
                value={content.primaryButton}
                onChange={(e) => setContent({ ...content, primaryButton: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryButton">Secondary Button</Label>
              <Input
                id="secondaryButton"
                value={content.secondaryButton}
                onChange={(e) => setContent({ ...content, secondaryButton: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
