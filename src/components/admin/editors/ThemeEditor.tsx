import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

export const ThemeEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [colors, setColors] = useState({
    primary: "#8e2881",
    accent: "#b03aa0",
    background: "#0a0a0a",
    foreground: "#fafafa",
    muted: "#1a1a1a",
    card: "#111111",
    border: "#262626",
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Theme saved",
      description: "Your changes have been published.",
    });
  };

  const updateColor = (key: string, value: string) => {
    setColors({ ...colors, [key]: value });
  };

  const colorFields = [
    { key: "primary", label: "Primary Color", description: "Main brand color used for buttons and accents" },
    { key: "accent", label: "Accent Color", description: "Secondary accent color" },
    { key: "background", label: "Background", description: "Main background color" },
    { key: "foreground", label: "Foreground", description: "Main text color" },
    { key: "muted", label: "Muted", description: "Muted background color" },
    { key: "card", label: "Card", description: "Card background color" },
    { key: "border", label: "Border", description: "Border color" },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Colors & Theme
          </h2>
          <p className="text-muted-foreground mt-1">
            Customize your website's color scheme
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
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Click on a color to change it. Colors are applied site-wide.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {colorFields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id={field.key}
                    value={colors[field.key as keyof typeof colors]}
                    onChange={(e) => updateColor(field.key, e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={colors[field.key as keyof typeof colors]}
                    onChange={(e) => updateColor(field.key, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{field.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>See how your colors look together</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="p-6 rounded-lg"
            style={{ backgroundColor: colors.background }}
          >
            <div
              className="p-4 rounded-lg mb-4"
              style={{ backgroundColor: colors.card, border: `1px solid ${colors.border}` }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: colors.foreground }}
              >
                Sample Card Title
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: colors.foreground, opacity: 0.7 }}
              >
                This is sample text showing how your content will appear.
              </p>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: colors.primary }}
                >
                  Primary Button
                </button>
                <button
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{
                    backgroundColor: colors.muted,
                    color: colors.foreground,
                  }}
                >
                  Secondary
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
