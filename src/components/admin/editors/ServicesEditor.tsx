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
import { Loader2, Plus, Trash2, Save, GripVertical } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ServicesEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("Our Services");
  const [sectionSubtitle, setSectionSubtitle] = useState("What We Deliver");

  const [services, setServices] = useState<Service[]>([
    { id: "1", title: "Exhibitions & Events", description: "End-to-end exhibition solutions from concept to execution", icon: "Calendar" },
    { id: "2", title: "Brand Activations", description: "Creating memorable brand experiences that engage your audience", icon: "Zap" },
    { id: "3", title: "Printing & Signage", description: "High-quality printing solutions for all your marketing needs", icon: "Printer" },
    { id: "4", title: "Creative Design", description: "Innovative design solutions that make your brand stand out", icon: "Palette" },
    { id: "5", title: "Digital Marketing", description: "Comprehensive digital strategies to grow your online presence", icon: "Globe" },
    { id: "6", title: "Video Production", description: "Professional video content that tells your brand story", icon: "Video" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Services saved",
      description: "Your changes have been published.",
    });
  };

  const addService = () => {
    setServices([
      ...services,
      { id: Date.now().toString(), title: "", description: "", icon: "Settings" },
    ]);
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Services Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage the services displayed on your website
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
          <CardTitle>Section Header</CardTitle>
          <CardDescription>Edit the services section header</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={sectionSubtitle} onChange={(e) => setSectionSubtitle(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Services</CardTitle>
              <CardDescription>Add, edit, or remove services</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addService}>
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-start gap-3 p-4 border border-border rounded-lg"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab mt-2" />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={service.title}
                        onChange={(e) => updateService(service.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Icon Name</Label>
                      <Input
                        value={service.icon}
                        onChange={(e) => updateService(service.id, "icon", e.target.value)}
                        placeholder="Lucide icon name"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => updateService(service.id, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeService(service.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
