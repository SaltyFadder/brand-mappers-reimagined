import { useState } from "react";
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

interface AboutStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

export const AboutEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("About Us");
  const [subtitle, setSubtitle] = useState("Who We Are");
  const [description, setDescription] = useState(
    "Brand Mappers is a leading BTL advertising agency dedicated to transforming brands through innovative experiential marketing, exhibitions, and creative design solutions."
  );

  const [stats, setStats] = useState<AboutStat[]>([
    { icon: "Target", value: 5000, suffix: "+", label: "Projects Completed" },
    { icon: "Users", value: 150, suffix: "+", label: "Team Members" },
    { icon: "Globe", value: 25, suffix: "+", label: "Countries Served" },
    { icon: "Award", value: 99, suffix: "%", label: "Client Satisfaction" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "About section saved",
      description: "Your changes have been published.",
    });
  };

  const updateStat = (index: number, field: keyof AboutStat, value: string | number) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
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
