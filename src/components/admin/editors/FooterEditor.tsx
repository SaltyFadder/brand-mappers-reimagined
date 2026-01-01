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
import { Loader2, Plus, Trash2, Save } from "lucide-react";

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

export const FooterEditor = () => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const [companyDescription, setCompanyDescription] = useState(
    "Brand Mappers is a leading BTL advertising agency transforming brands through exceptional events, exhibitions, and creative design solutions."
  );
  const [address, setAddress] = useState("123 Business Park, Dubai, UAE");
  const [phone, setPhone] = useState("+971 4 123 4567");
  const [email, setEmail] = useState("info@brandmappers.com");

  const [quickLinks, setQuickLinks] = useState<FooterLink[]>([
    { id: "1", name: "Home", href: "/" },
    { id: "2", name: "About", href: "#about" },
    { id: "3", name: "Services", href: "#services" },
    { id: "4", name: "Portfolio", href: "#portfolio" },
    { id: "5", name: "Careers", href: "/careers" },
  ]);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "1", platform: "Facebook", url: "https://facebook.com", icon: "Facebook" },
    { id: "2", platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { id: "4", platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
  ]);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    toast({
      title: "Footer saved",
      description: "Your changes have been published.",
    });
  };

  const addQuickLink = () => {
    setQuickLinks([...quickLinks, { id: Date.now().toString(), name: "", href: "" }]);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { id: Date.now().toString(), platform: "", url: "", icon: "" }]);
  };

  const updateQuickLink = (id: string, field: keyof FooterLink, value: string) => {
    setQuickLinks(quickLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const updateSocialLink = (id: string, field: keyof SocialLink, value: string) => {
    setSocialLinks(socialLinks.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const removeQuickLink = (id: string) => {
    setQuickLinks(quickLinks.filter((l) => l.id !== id));
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter((l) => l.id !== id));
  };

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
              value={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
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
            {quickLinks.map((link) => (
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
            {socialLinks.map((link) => (
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
