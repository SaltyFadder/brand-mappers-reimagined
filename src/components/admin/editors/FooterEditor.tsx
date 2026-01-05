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
import { Loader2, Plus, Trash2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface FooterLink {
  id: string;
  name: string;
  href: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

interface FooterContent {
  companyDescription: string;
  contact: ContactInfo;
  quickLinks: FooterLink[];
  socialLinks: SocialLink[];
}

const defaultContent: FooterContent = {
  companyDescription: "Your one-stop BTL advertising partner since 2016. Creating impactful brand experiences across Egypt, Gulf, Africa, and the Americas.",
  contact: {
    phone: "+20 100 332 3458",
    email: "info@brand-mappers.com",
    address: "Cairo, Egypt\nDubai, UAE",
  },
  quickLinks: [
    { id: "1", name: "About Us", href: "#about" },
    { id: "2", name: "Services", href: "#services" },
    { id: "3", name: "Portfolio", href: "#portfolio" },
    { id: "4", name: "News", href: "#news" },
    { id: "5", name: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { id: "1", platform: "LinkedIn", url: "https://linkedin.com/company/brand-mappers", icon: "Linkedin" },
    { id: "2", platform: "Instagram", url: "https://instagram.com/brandmappers", icon: "Instagram" },
    { id: "3", platform: "Facebook", url: "https://facebook.com/brandmappers", icon: "Facebook" },
    { id: "4", platform: "Twitter", url: "https://twitter.com/brandmappers", icon: "Twitter" },
  ],
};

export const FooterEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<FooterContent>(defaultContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .eq("key", "footer_content")
          .single();

        if (error && error.code !== "PGRST116") throw error;

        if (data?.value) {
          setContent(data.value as unknown as FooterContent);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
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
        .upsert({ key: "footer_content", value: JSON.parse(JSON.stringify(content)) }, { onConflict: "key" });

      if (error) throw error;

      toast({
        title: "Footer saved",
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

  const addQuickLink = () => {
    setContent({
      ...content,
      quickLinks: [...content.quickLinks, { id: Date.now().toString(), name: "", href: "" }],
    });
  };

  const addSocialLink = () => {
    setContent({
      ...content,
      socialLinks: [...content.socialLinks, { id: Date.now().toString(), platform: "", url: "", icon: "" }],
    });
  };

  const updateQuickLink = (id: string, field: keyof FooterLink, value: string) => {
    setContent({
      ...content,
      quickLinks: content.quickLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    setContent({
      ...content,
      socialLinks: content.socialLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
    });
  };

  const removeQuickLink = (id: string) => {
    setContent({
      ...content,
      quickLinks: content.quickLinks.filter((l) => l.id !== id),
    });
  };

  const removeSocialLink = (id: string) => {
    setContent({
      ...content,
      socialLinks: content.socialLinks.filter((l) => l.id !== id),
    });
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
            Footer
          </h2>
          <p className="text-muted-foreground mt-1">
            Edit footer content, links, and contact information
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
          <CardTitle>Company Info</CardTitle>
          <CardDescription>Edit company description and contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Description</Label>
            <Textarea
              value={content.companyDescription}
              onChange={(e) => setContent({ ...content, companyDescription: e.target.value })}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                value={content.contact.phone}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                value={content.contact.email}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={content.contact.address}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Manage footer navigation links</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addQuickLink}>
              <Plus className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {content.quickLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-3">
                <Input
                  value={link.name}
                  onChange={(e) => updateQuickLink(link.id, "name", e.target.value)}
                  placeholder="Link name"
                  className="flex-1"
                />
                <Input
                  value={link.href}
                  onChange={(e) => updateQuickLink(link.id, "href", e.target.value)}
                  placeholder="/path or #section"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeQuickLink(link.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Manage social media links</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={addSocialLink}>
              <Plus className="w-4 h-4 mr-2" />
              Add Social
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {content.socialLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-3">
                <Input
                  value={link.platform}
                  onChange={(e) => updateSocialLink(link.id, "platform", e.target.value)}
                  placeholder="Platform"
                  className="w-32"
                />
                <Input
                  value={link.url}
                  onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                  placeholder="URL"
                  className="flex-1"
                />
                <Input
                  value={link.icon}
                  onChange={(e) => updateSocialLink(link.id, "icon", e.target.value)}
                  placeholder="Icon name"
                  className="w-32"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialLink(link.id)}
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
