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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ImageUpload } from "../ImageUpload";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: "small" | "medium" | "large";
}

const categories = ["All", "Exhibitions", "Printing", "Stands", "Activations"];

const defaultItems: PortfolioItem[] = [
  { id: "1", title: "Giza Systems Smart Guide", category: "Exhibitions", image: "/src/assets/portfolio/portfolio-1.jpg", size: "large" },
  { id: "2", title: "Papa Johns Branding", category: "Printing", image: "/src/assets/portfolio/portfolio-2.jpg", size: "small" },
  { id: "3", title: "Glemgas Italy Campaign", category: "Printing", image: "/src/assets/portfolio/portfolio-3.jpg", size: "small" },
  { id: "4", title: "Fashion Optics Display", category: "Stands", image: "/src/assets/portfolio/portfolio-4.jpg", size: "medium" },
  { id: "5", title: "Renault Exhibition Stand", category: "Exhibitions", image: "/src/assets/portfolio/portfolio-5.jpg", size: "small" },
  { id: "6", title: "Heritage College Event", category: "Activations", image: "/src/assets/portfolio/portfolio-6.jpg", size: "medium" },
  { id: "7", title: "Cisco Partnership Display", category: "Stands", image: "/src/assets/portfolio/portfolio-7.jpg", size: "small" },
  { id: "8", title: "Valentine's Campaign", category: "Activations", image: "/src/assets/portfolio/portfolio-8.jpg", size: "small" },
  { id: "9", title: "Real Repair Product Launch", category: "Printing", image: "/src/assets/portfolio/portfolio-9.jpg", size: "medium" },
  { id: "10", title: "Telefunken Tablet Campaign", category: "Activations", image: "/src/assets/portfolio/portfolio-10.jpg", size: "small" },
  { id: "11", title: "Smart Payment Solutions", category: "Exhibitions", image: "/src/assets/portfolio/portfolio-11.jpg", size: "small" },
  { id: "12", title: "Rekaz Developments Launch", category: "Activations", image: "/src/assets/portfolio/portfolio-12.jpg", size: "large" },
];

export const PortfolioEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PortfolioItem[]>(defaultItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "portfolio_items")
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data?.value) {
          setItems(data.value as unknown as PortfolioItem[]);
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
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
        .upsert({ key: "portfolio_items", value: JSON.parse(JSON.stringify(items)) }, { onConflict: "key" });

      if (error) throw error;

      toast({
        title: "Portfolio saved",
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
      { id: Date.now().toString(), title: "", category: "Exhibitions", image: "", size: "medium" },
    ]);
  };

  const updateItem = (id: string, field: keyof PortfolioItem, value: string) => {
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
            Portfolio Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your portfolio items and categories
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
              <CardTitle>Portfolio Items</CardTitle>
              <CardDescription>Add and manage portfolio projects</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-4 border border-border rounded-lg"
              >
                <ImageUpload
                  currentImage={item.image}
                  onImageUploaded={(url) => updateItem(item.id, "image", url)}
                  folder="portfolio"
                  className="w-24 h-24 flex-shrink-0"
                />
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(item.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Category</Label>
                      <Select
                        value={item.category}
                        onValueChange={(v) => updateItem(item.id, "category", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Size</Label>
                      <Select
                        value={item.size}
                        onValueChange={(v) => updateItem(item.id, "size", v)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
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
