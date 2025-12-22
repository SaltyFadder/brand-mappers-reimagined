import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useSiteSettings, HeroStat } from "@/hooks/useSiteSettings";
import { LogOut, Settings, Palette, Type, BarChart3, Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const { settings, loading: settingsLoading, updateSetting } = useSiteSettings();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vanta settings state
  const [vantaColor, setVantaColor] = useState("#8e2881");
  const [vantaBgColor, setVantaBgColor] = useState("#0a0a0a");
  const [vantaPoints, setVantaPoints] = useState(12);
  const [vantaMaxDistance, setVantaMaxDistance] = useState(20);
  const [vantaSpacing, setVantaSpacing] = useState(15);
  const [vantaShowDots, setVantaShowDots] = useState(true);

  // Hero content state
  const [heroBadge, setHeroBadge] = useState("");
  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroTagline, setHeroTagline] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaSecondaryText, setHeroCtaSecondaryText] = useState("");

  // Hero stats state
  const [heroStats, setHeroStats] = useState<HeroStat[]>([]);

  // Site colors state
  const [primaryColor, setPrimaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    } else if (!authLoading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive"
      });
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (!settingsLoading && settings) {
      // Convert hex color from "0x8e2881" format
      const colorHex = settings.vanta_settings.color.replace("0x", "#");
      const bgColorHex = settings.vanta_settings.backgroundColor.replace("0x", "#");
      
      setVantaColor(colorHex);
      setVantaBgColor(bgColorHex);
      setVantaPoints(settings.vanta_settings.points);
      setVantaMaxDistance(settings.vanta_settings.maxDistance);
      setVantaSpacing(settings.vanta_settings.spacing);
      setVantaShowDots(settings.vanta_settings.showDots);

      setHeroBadge(settings.hero_content.badge);
      setHeroHeadline(settings.hero_content.headline);
      setHeroTagline(settings.hero_content.tagline);
      setHeroCtaText(settings.hero_content.ctaText);
      setHeroCtaSecondaryText(settings.hero_content.ctaSecondaryText);

      setHeroStats(settings.hero_stats);

      setPrimaryColor(settings.site_colors.primary);
      setAccentColor(settings.site_colors.accent);
      setBackgroundColor(settings.site_colors.background);
    }
  }, [settings, settingsLoading]);

  const handleSaveVanta = async () => {
    setSaving(true);
    const result = await updateSetting("vanta_settings", {
      color: vantaColor.replace("#", "0x"),
      backgroundColor: vantaBgColor.replace("#", "0x"),
      points: vantaPoints,
      maxDistance: vantaMaxDistance,
      spacing: vantaSpacing,
      showDots: vantaShowDots
    });
    setSaving(false);
    
    if (result.success) {
      toast({ title: "Settings saved", description: "Vanta animation settings updated." });
    } else {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const handleSaveHeroContent = async () => {
    setSaving(true);
    const result = await updateSetting("hero_content", {
      badge: heroBadge,
      headline: heroHeadline,
      tagline: heroTagline,
      ctaText: heroCtaText,
      ctaSecondaryText: heroCtaSecondaryText
    });
    setSaving(false);
    
    if (result.success) {
      toast({ title: "Settings saved", description: "Hero content updated." });
    } else {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const handleSaveHeroStats = async () => {
    setSaving(true);
    const result = await updateSetting("hero_stats", heroStats);
    setSaving(false);
    
    if (result.success) {
      toast({ title: "Settings saved", description: "Hero statistics updated." });
    } else {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const handleSaveColors = async () => {
    setSaving(true);
    const result = await updateSetting("site_colors", {
      primary: primaryColor,
      accent: accentColor,
      background: backgroundColor
    });
    setSaving(false);
    
    if (result.success) {
      toast({ title: "Settings saved", description: "Site colors updated." });
    } else {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const updateStat = (index: number, field: "value" | "label", newValue: string) => {
    const updated = [...heroStats];
    updated[index] = { ...updated[index], [field]: newValue };
    setHeroStats(updated);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || settingsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="vanta" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="vanta" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Animation
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Colors
            </TabsTrigger>
          </TabsList>

          {/* Vanta Animation Settings */}
          <TabsContent value="vanta">
            <Card>
              <CardHeader>
                <CardTitle>Vanta.js Animation Settings</CardTitle>
                <CardDescription>
                  Customize the animated background in the hero section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="vantaColor">Animation Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="vantaColor"
                        value={vantaColor}
                        onChange={(e) => setVantaColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={vantaColor}
                        onChange={(e) => setVantaColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vantaBgColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        id="vantaBgColor"
                        value={vantaBgColor}
                        onChange={(e) => setVantaBgColor(e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={vantaBgColor}
                        onChange={(e) => setVantaBgColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Points: {vantaPoints}</Label>
                    <Slider
                      value={[vantaPoints]}
                      onValueChange={(v) => setVantaPoints(v[0])}
                      min={1}
                      max={30}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Distance: {vantaMaxDistance}</Label>
                    <Slider
                      value={[vantaMaxDistance]}
                      onValueChange={(v) => setVantaMaxDistance(v[0])}
                      min={5}
                      max={50}
                      step={1}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Spacing: {vantaSpacing}</Label>
                    <Slider
                      value={[vantaSpacing]}
                      onValueChange={(v) => setVantaSpacing(v[0])}
                      min={5}
                      max={30}
                      step={1}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={vantaShowDots}
                      onCheckedChange={setVantaShowDots}
                    />
                    <Label>Show Dots</Label>
                  </div>
                </div>

                <Button onClick={handleSaveVanta} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Animation Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Content Settings */}
          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Hero Content</CardTitle>
                <CardDescription>
                  Edit the text and buttons in the hero section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="badge">Badge Text</Label>
                  <Input
                    id="badge"
                    value={heroBadge}
                    onChange={(e) => setHeroBadge(e.target.value)}
                    placeholder="Welcome badge text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="headline">Headline</Label>
                  <Input
                    id="headline"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    placeholder="Main headline"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Textarea
                    id="tagline"
                    value={heroTagline}
                    onChange={(e) => setHeroTagline(e.target.value)}
                    placeholder="Descriptive tagline"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ctaText">Primary Button Text</Label>
                    <Input
                      id="ctaText"
                      value={heroCtaText}
                      onChange={(e) => setHeroCtaText(e.target.value)}
                      placeholder="Start Your Project"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ctaSecondaryText">Secondary Button Text</Label>
                    <Input
                      id="ctaSecondaryText"
                      value={heroCtaSecondaryText}
                      onChange={(e) => setHeroCtaSecondaryText(e.target.value)}
                      placeholder="View Our Work"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveHeroContent} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Content
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Stats Settings */}
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Hero Statistics</CardTitle>
                <CardDescription>
                  Edit the statistics displayed in the hero section
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {heroStats.map((stat, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={stat.value}
                          onChange={(e) => updateStat(index, "value", e.target.value)}
                          placeholder="5000+"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={stat.label}
                          onChange={(e) => updateStat(index, "label", e.target.value)}
                          placeholder="Projects Delivered"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handleSaveHeroStats} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Statistics
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Site Colors Settings */}
          <TabsContent value="colors">
            <Card>
              <CardHeader>
                <CardTitle>Site Colors</CardTitle>
                <CardDescription>
                  Customize the color scheme (HSL format: "307 56% 40%")
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
                    <Input
                      id="primaryColor"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="307 56% 40%"
                    />
                    <p className="text-xs text-muted-foreground">
                      Format: hue saturation% lightness%
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color (HSL)</Label>
                    <Input
                      id="accentColor"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      placeholder="307 70% 50%"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
                    <Input
                      id="backgroundColor"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="270 15% 4%"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveColors} disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Save Colors
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
