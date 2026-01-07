import { useEffect, useRef, useState } from "react";
import { Globe, Users, Award, Briefcase } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AboutStat {
  icon: string;
  value: number;
  suffix: string;
  label: string;
}

interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  secondaryDescription: string;
}

const defaultContent: AboutContent = {
  title: "About Us",
  subtitle: "Crafting Brand Experiences",
  description: "Since 2016, Brand Mappers has been at the forefront of BTL advertising, transforming how brands connect with their audiences. We specialize in creating immersive experiences that leave lasting impressions.",
  secondaryDescription: "From Egypt to the Gulf, across Africa to the Americas and Canada, we've helped brands grow bigger every day through exceptional events, stunning exhibitions, and innovative design solutions.",
};

const defaultStats: AboutStat[] = [
  { icon: "Briefcase", value: 5000, suffix: "+", label: "Projects Completed" },
  { icon: "Award", value: 8, suffix: "+", label: "Years in Business" },
  { icon: "Globe", value: 15, suffix: "+", label: "Countries Served" },
  { icon: "Users", value: 50, suffix: "+", label: "Team Members" },
];

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Award,
  Globe,
  Users,
};

const AnimatedCounter = ({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<AboutContent>(defaultContent);
  const [stats, setStats] = useState<AboutStat[]>(defaultStats);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["about_content", "about_stats"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "about_content" && item.value) {
              setContent(item.value as unknown as AboutContent);
            }
            if (item.key === "about_stats" && item.value) {
              setStats(item.value as unknown as AboutStat[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 section-padding bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
              {content.title}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {content.subtitle.split(" ").slice(0, -1).join(" ")}
              <br />
              <span className="text-gradient">{content.subtitle.split(" ").slice(-1)}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {content.description}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.secondaryDescription}
            </p>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 p-8 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-primary/30 blur-2xl" />
              <div className="absolute bottom-12 left-12 w-32 h-32 rounded-full bg-primary/20 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <span className="text-8xl font-display font-bold text-primary/20">
                    8+
                  </span>
                  <p className="text-xl font-semibold text-foreground mt-4">
                    Years of Excellence
                  </p>
                </div>

                <div className="space-y-4">
                  {["Egypt", "Gulf Region", "Africa", "Americas", "Canada"].map(
                    (region, index) => (
                      <div
                        key={region}
                        className="flex items-center gap-3"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="text-foreground font-medium">
                          {region}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Briefcase;
            return (
              <div
                key={index}
                className="bg-background rounded-2xl p-8 text-center card-hover group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
