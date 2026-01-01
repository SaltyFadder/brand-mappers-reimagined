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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Save, Image as ImageIcon } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: "small" | "medium" | "large";
}

const categories = ["All", "Exhibitions", "Printing", "Stands", "Activations"];

export const PortfolioEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [items, setItems] = useState<PortfolioItem[]>([
    { id: "1", title: "Tech Conference 2024", category: "Exhibitions", image: "/portfolio-1.jpg", size: "large" },
    { id: "2", title: "Product Launch Event", category: "Activations", image: "/portfolio-2.jpg", size: "medium" },
    { id: "3", title: "Corporate Branding", category: "Printing", image: "/portfolio-3.jpg", size: "small" },
    { id: "4", title: "Trade Show Booth", category: "Stands", image: "/portfolio-4.jpg", size: "medium" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Portfolio saved",
      description: "Your changes have been published.",
    });
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
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
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
                  <div className="space-y-1">
                    <Label className="text-xs">Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => updateItem(item.id, "image", e.target.value)}
                      placeholder="/portfolio-image.jpg"
                    />
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
