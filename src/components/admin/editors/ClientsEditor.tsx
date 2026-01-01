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
import { Loader2, Plus, Trash2, Save } from "lucide-react";

interface Client {
  id: string;
  name: string;
  logo: string;
}

export const ClientsEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("Trusted Partners");
  const [sectionSubtitle, setSectionSubtitle] = useState("Brands That Trust Us");

  const [clients, setClients] = useState<Client[]>([
    { id: "1", name: "Company One", logo: "" },
    { id: "2", name: "Company Two", logo: "" },
    { id: "3", name: "Company Three", logo: "" },
    { id: "4", name: "Company Four", logo: "" },
    { id: "5", name: "Company Five", logo: "" },
    { id: "6", name: "Company Six", logo: "" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Clients saved",
      description: "Your changes have been published.",
    });
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
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 text-xs text-muted-foreground">
                  Logo
                </div>
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
