import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-brand-dark">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, hsl(168 84% 32% / 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, hsl(168 84% 32% / 0.2) 0%, transparent 40%)`,
          }}
        />
        {/* Animated grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding text-center max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-up opacity-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            BTL Advertising Excellence Since 2016
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-brand-light leading-[1.1] mb-6 animate-fade-up opacity-0 animation-delay-100">
          GROW BIGGER.
          <br />
          <span className="text-gradient">EVERYDAY.</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-brand-light/70 max-w-2xl mx-auto mb-12 animate-fade-up opacity-0 animation-delay-200">
          Your One-Stop BTL Advertising Partner. Transforming brands through
          exceptional events, exhibitions, and creative design solutions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0 animation-delay-300">
          <Button className="btn-primary min-w-[200px]">
            Start Your Project
          </Button>
          <Button
            variant="outline"
            className="min-w-[200px] border-brand-light/20 text-brand-light hover:bg-brand-light/10 hover:border-brand-light/40 rounded-full px-8 py-6"
          >
            View Our Work
          </Button>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-up opacity-0 animation-delay-400">
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "8+", label: "Years Experience" },
            { value: "15+", label: "Countries Served" },
            { value: "50+", label: "Team Members" },
          ].map((stat, index) => (
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
  );
};

export default HeroSection;
