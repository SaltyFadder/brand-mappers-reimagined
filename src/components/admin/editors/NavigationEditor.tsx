import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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

interface NavItem {
  id: string;
  name: string;
  href: string;
  enabled: boolean;
}

const defaultItems: NavItem[] = [
  { id: "1", name: "Home", href: "#home", enabled: true },
  { id: "2", name: "About", href: "#about", enabled: true },
  { id: "3", name: "Services", href: "#services", enabled: true },
  { id: "4", name: "Portfolio", href: "#portfolio", enabled: true },
  { id: "5", name: "News", href: "#news", enabled: true },
  { id: "6", name: "Careers", href: "/careers", enabled: true },
  { id: "7", name: "Contact", href: "#contact", enabled: true },
];

export const NavigationEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<NavItem[]>(defaultItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "navigation_items")
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data?.value) {
          setItems(data.value as unknown as NavItem[]);
        }
      } catch (err) {
        console.error("Error fetching navigation data:", err);
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
        .upsert({ key: "navigation_items", value: JSON.parse(JSON.stringify(items)) }, { onConflict: "key" });

      if (error) throw error;

      toast({
        title: "Navigation saved",
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

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: "", href: "", enabled: true },
    ]);
  };

  const updateItem = (id: string, field: keyof NavItem, value: string | boolean) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
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
            Navigation
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage navigation menu items
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
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Menu Items</CardTitle>
              <CardDescription>Add, edit, or reorder navigation links</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 border border-border rounded-lg"
              >
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Name</Label>
                    <Input
                      value={item.name}
                      onChange={(e) => updateItem(item.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Link</Label>
                    <Input
                      value={item.href}
                      onChange={(e) => updateItem(item.id, "href", e.target.value)}
                      placeholder="#section or /page"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={item.enabled}
                    onCheckedChange={(v) => updateItem(item.id, "enabled", v)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
