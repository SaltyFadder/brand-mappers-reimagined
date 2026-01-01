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

export const CTAEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [headline, setHeadline] = useState("Ready to Transform Your Brand?");
  const [description, setDescription] = useState(
    "Let's create something extraordinary together. Get in touch with our team to discuss your next project."
  );
  const [primaryButton, setPrimaryButton] = useState("Get Started");
  const [secondaryButton, setSecondaryButton] = useState("Schedule a Call");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "CTA section saved",
      description: "Your changes have been published.",
    });
  };

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
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryButton">Primary Button</Label>
              <Input
                id="primaryButton"
                value={primaryButton}
                onChange={(e) => setPrimaryButton(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryButton">Secondary Button</Label>
              <Input
                id="secondaryButton"
                value={secondaryButton}
                onChange={(e) => setSecondaryButton(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
