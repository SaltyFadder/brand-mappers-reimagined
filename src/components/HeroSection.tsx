import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "./ContactFormModal";
import { supabase } from "@/integrations/supabase/client";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroContent {
  badge: string;
  headline: string;
  tagline: string;
  ctaText: string;
  ctaSecondaryText: string;
}

const defaultContent: HeroContent = {
  badge: "BTL Advertising Excellence Since 2016",
  headline: "GROW BIGGER.\nEVERYDAY.",
  tagline: "Your One-Stop BTL Advertising Partner. Transforming brands through exceptional events, exhibitions, and creative design solutions.",
  ctaText: "Start Your Project",
  ctaSecondaryText: "View Our Work",
};

const defaultStats: HeroStat[] = [
  { value: "5000+", label: "Projects Delivered" },
  { value: "8+", label: "Years Experience" },
  { value: "15+", label: "Countries Served" },
  { value: "50+", label: "Team Members" },
];

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [content, setContent] = useState<HeroContent>(defaultContent);
  const [stats, setStats] = useState<HeroStat[]>(defaultStats);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["hero_content", "hero_stats"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "hero_content" && item.value) {
              setContent(item.value as unknown as HeroContent);
            }
            if (item.key === "hero_stats" && item.value) {
              setStats(item.value as unknown as HeroStat[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };

    fetchHeroData();
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Parse headline to handle line breaks
  const headlineParts = content.headline.split("\n");

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video background */}
        <div className="absolute inset-0 bg-background">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-background/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 section-padding text-center max-w-6xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up opacity-0">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              {content.badge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-light leading-[1.1] mb-6 animate-fade-up opacity-0 animation-delay-100">
            {headlineParts[0]}
            {headlineParts.length > 1 && (
              <>
                <br />
                <span className="text-gradient">{headlineParts[1]}</span>
              </>
            )}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-brand-light/70 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 animation-delay-200">
            {content.tagline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 animation-delay-300">
            <Button className="btn-primary min-w-[200px]" onClick={() => setContactOpen(true)}>
              {content.ctaText}
            </Button>
            <Button
              variant="outline"
              className="min-w-[200px] border-brand-light/20 text-brand-light hover:bg-brand-light/10 hover:border-brand-light/40 rounded-full px-8 py-6"
              onClick={scrollToPortfolio}
            >
              {content.ctaSecondaryText}
            </Button>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-up opacity-0 animation-delay-400">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-brand-light mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-brand-light/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-light/50 hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronDown className="w-8 h-8 animate-scroll-indicator" />
        </a>
      </section>

      <ContactFormModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default HeroSection;
