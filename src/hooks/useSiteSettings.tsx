import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface VantaSettings {
  color: string;
  backgroundColor: string;
  points: number;
  maxDistance: number;
  spacing: number;
  showDots: boolean;
}

export interface HeroContent {
  badge: string;
  headline: string;
  tagline: string;
  ctaText: string;
  ctaSecondaryText: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface SiteColors {
  primary: string;
  accent: string;
  background: string;
}

export interface SiteSettings {
  vanta_settings: VantaSettings;
  hero_content: HeroContent;
  hero_stats: HeroStat[];
  site_colors: SiteColors;
}

const defaultSettings: SiteSettings = {
  vanta_settings: {
    color: "0x8e2881",
    backgroundColor: "0x0a0a0a",
    points: 12,
    maxDistance: 20,
    spacing: 15,
    showDots: true
  },
  hero_content: {
    badge: "Welcome to Brand Mappers",
    headline: "GROW BIGGER. EVERYDAY.",
    tagline: "We transform ambitious brands into market leaders through strategic digital solutions, innovative design, and data-driven growth strategies.",
    ctaText: "Start Your Project",
    ctaSecondaryText: "View Our Work"
  },
  hero_stats: [
    { value: "5000+", label: "Projects Delivered" },
    { value: "15+", label: "Years Experience" },
    { value: "99%", label: "Client Satisfaction" },
    { value: "50+", label: "Team Experts" }
  ],
  site_colors: {
    primary: "307 56% 40%",
    accent: "307 70% 50%",
    background: "270 15% 4%"
  }
};

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) throw error;

      if (data && data.length > 0) {
        const settingsMap = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, any>);

        setSettings({
          vanta_settings: settingsMap.vanta_settings || defaultSettings.vanta_settings,
          hero_content: settingsMap.hero_content || defaultSettings.hero_content,
          hero_stats: settingsMap.hero_stats || defaultSettings.hero_stats,
          site_colors: settingsMap.site_colors || defaultSettings.site_colors
        });
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
      setError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key);

      if (error) throw error;

      // Update local state
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));

      return { success: true };
    } catch (err) {
      console.error("Error updating setting:", err);
      return { success: false, error: err };
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { settings, loading, error, updateSetting, refetch: fetchSettings };
};
