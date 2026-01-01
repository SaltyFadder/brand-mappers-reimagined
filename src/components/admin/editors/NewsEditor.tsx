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
import { Loader2, Plus, Trash2, Save, Image as ImageIcon } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export const NewsEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [items, setItems] = useState<NewsItem[]>([
    {
      id: "1",
      title: "Brand Mappers Wins Best Exhibition Award",
      excerpt: "We're proud to announce our latest achievement in the industry...",
      date: "2024-01-15",
      category: "Awards",
      image: "",
    },
    {
      id: "2",
      title: "New Office Opening in Dubai",
      excerpt: "Expanding our presence in the Middle East region...",
      date: "2024-01-10",
      category: "Company News",
      image: "",
    },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "News saved",
      description: "Your changes have been published.",
    });
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Date.now().toString(),
        title: "",
        excerpt: "",
        date: new Date().toISOString().split("T")[0],
        category: "",
        image: "",
      },
    ]);
  };

  const updateItem = (id: string, field: keyof NewsItem, value: string) => {
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
            News Section
          </h2>
          <p className="text-muted-foreground mt-1">
            Publish and manage news articles
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
              <CardTitle>News Articles</CardTitle>
              <CardDescription>Add and manage news posts</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addItem}>
              <Plus className="w-4 h-4 mr-2" />
              Add Article
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
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
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
                    <div className="col-span-2 space-y-1">
                      <Label className="text-xs">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(item.id, "title", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Date</Label>
                      <Input
                        type="date"
                        value={item.date}
                        onChange={(e) => updateItem(item.id, "date", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Excerpt</Label>
                    <Textarea
                      value={item.excerpt}
                      onChange={(e) => updateItem(item.id, "excerpt", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs">Category</Label>
                      <Input
                        value={item.category}
                        onChange={(e) => updateItem(item.id, "category", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Image URL</Label>
                      <Input
                        value={item.image}
                        onChange={(e) => updateItem(item.id, "image", e.target.value)}
                      />
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
