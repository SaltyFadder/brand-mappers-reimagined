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
import { Loader2, Plus, Trash2, Save, GripVertical } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "../ImageUpload";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
}

interface ServicesContent {
  title: string;
  subtitle: string;
  description: string;
}

const defaultContent: ServicesContent = {
  title: "Our Services",
  subtitle: "What We Deliver",
  description: "Comprehensive BTL advertising solutions tailored to elevate your brand presence and create lasting impressions.",
};

const defaultServices: Service[] = [
  { id: "1", title: "Exhibitions & Events", description: "End-to-end event solutions from concept to execution", icon: "Calendar", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop" },
  { id: "2", title: "Offset & Digital Printing", description: "Premium quality printing solutions from small format to large scale", icon: "Printer", image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=600&fit=crop" },
  { id: "3", title: "Shop & Office Interior", description: "Transform retail and office spaces with stunning designs", icon: "Store", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop" },
  { id: "4", title: "Stands & Display Units", description: "Eye-catching exhibition stands and display units", icon: "Box", image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop" },
];

export const ServicesEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ServicesContent>(defaultContent);
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["services_content", "services_list"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "services_content" && item.value) {
              setContent(item.value as unknown as ServicesContent);
            }
            if (item.key === "services_list" && item.value) {
              setServices(item.value as unknown as Service[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching services data:", err);
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
        .upsert({ key: "services_content", value: JSON.parse(JSON.stringify(content)) }, { onConflict: "key" });

      const servicesUpdate = supabase
        .from("site_settings")
        .upsert({ key: "services_list", value: JSON.parse(JSON.stringify(services)) }, { onConflict: "key" });

      const [contentRes, servicesRes] = await Promise.all([contentUpdate, servicesUpdate]);

      if (contentRes.error) throw contentRes.error;
      if (servicesRes.error) throw servicesRes.error;

      toast({
        title: "Services saved",
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

  const addService = () => {
    setServices([
      ...services,
      { id: Date.now().toString(), title: "", description: "", icon: "Settings", image: "" },
    ]);
  };

  const updateService = (id: string, field: keyof Service, value: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const removeService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
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
              <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Input value={content.subtitle} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              rows={2}
            />
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
                <ImageUpload
                  currentImage={service.image}
                  onImageUploaded={(url) => updateService(service.id, "image", url)}
                  folder="services"
                  className="w-24 h-24 flex-shrink-0"
                />
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
