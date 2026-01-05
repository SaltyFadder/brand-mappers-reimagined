import { useState, useEffect } from "react";
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
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "../ImageUpload";

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface ClientsContent {
  title: string;
  subtitle: string;
  description: string;
}

const defaultContent: ClientsContent = {
  title: "Trusted Partners",
  subtitle: "Brands That Trust Us",
  description: "Bond is how we describe our business relationships - a deep connection full of responsibility for quality and impact.",
};

const defaultClients: Client[] = [
  { id: "1", name: "HP", logo: "" },
  { id: "2", name: "Samsung", logo: "" },
  { id: "3", name: "Coca Cola", logo: "" },
  { id: "4", name: "Jotun", logo: "" },
  { id: "5", name: "L'Oreal", logo: "" },
  { id: "6", name: "Orascom", logo: "" },
];

export const ClientsEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ClientsContent>(defaultContent);
  const [clients, setClients] = useState<Client[]>(defaultClients);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["clients_content", "clients_list"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "clients_content" && item.value) {
              setContent(item.value as unknown as ClientsContent);
            }
            if (item.key === "clients_list" && item.value) {
              setClients(item.value as unknown as Client[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching clients data:", err);
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
        .upsert({ key: "clients_content", value: JSON.parse(JSON.stringify(content)) }, { onConflict: "key" });

      const clientsUpdate = supabase
        .from("site_settings")
        .upsert({ key: "clients_list", value: JSON.parse(JSON.stringify(clients)) }, { onConflict: "key" });

      const [contentRes, clientsRes] = await Promise.all([contentUpdate, clientsUpdate]);

      if (contentRes.error) throw contentRes.error;
      if (clientsRes.error) throw clientsRes.error;

      toast({
        title: "Clients saved",
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

  const addClient = () => {
    setClients([...clients, { id: Date.now().toString(), name: "", logo: "" }]);
  };

  const updateClient = (id: string, field: keyof Client, value: string) => {
    setClients(clients.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const removeClient = (id: string) => {
    setClients(clients.filter((c) => c.id !== id));
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
            Clients Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage client logos displayed in the marquee
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
          <CardDescription>Edit the clients section header</CardDescription>
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
            <Input value={content.description} onChange={(e) => setContent({ ...content, description: e.target.value })} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Client Logos</CardTitle>
              <CardDescription>Add and manage client logos</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addClient}>
              <Plus className="w-4 h-4 mr-2" />
              Add Client
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-3 p-4 border border-border rounded-lg"
              >
                <ImageUpload
                  currentImage={client.logo}
                  onImageUploaded={(url) => updateClient(client.id, "logo", url)}
                  folder="clients"
                  className="w-16 h-16 flex-shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={client.name}
                      onChange={(e) => updateClient(client.id, "name", e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeClient(client.id)}
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
