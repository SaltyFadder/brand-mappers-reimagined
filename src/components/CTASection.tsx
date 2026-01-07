import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactFormModal from "./ContactFormModal";
import { supabase } from "@/integrations/supabase/client";

interface CTAContent {
  headline: string;
  description: string;
  primaryButton: string;
  secondaryButton: string;
}

const defaultContent: CTAContent = {
  headline: "Ready to Grow Your Brand?",
  description: "Let's discuss your next project. Our team is ready to help you create impactful brand experiences that drive results.",
  primaryButton: "Start Your Project",
  secondaryButton: "Request Quote",
};

const CTASection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [content, setContent] = useState<CTAContent>(defaultContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "cta_content")
          .maybeSingle();

        if (error) throw error;

        if (data?.value) {
          setContent(data.value as unknown as CTAContent);
        }
      } catch (err) {
        console.error("Error fetching CTA data:", err);
      }
    };

    fetchData();
  }, []);

  // Parse headline to handle line breaks
  const headlineParts = content.headline.includes("\n") 
    ? content.headline.split("\n") 
    : content.headline.split(" ").reduce((acc, word, i, arr) => {
        if (i < Math.ceil(arr.length / 2)) {
          acc[0] = (acc[0] || "") + (acc[0] ? " " : "") + word;
        } else {
          acc[1] = (acc[1] || "") + (acc[1] ? " " : "") + word;
        }
        return acc;
      }, [] as string[]);

  return (
    <>
    <section id="contact" className="py-24 md:py-32 section-padding bg-brand-dark relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30"
          style={{ background: "hsl(270 70% 50%)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-25"
          style={{ background: "hsl(280 80% 60%)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary">
            Let's Work Together
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-light leading-tight mb-6">
          {headlineParts[0]}
          {headlineParts.length > 1 && (
            <>
              <br />
              <span className="text-gradient">{headlineParts[1]}</span>
            </>
          )}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl text-brand-light/70 max-w-2xl mx-auto mb-10">
          {content.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button className="btn-primary min-w-[220px] group" onClick={() => setContactOpen(true)}>
            {content.primaryButton}
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="outline"
            className="min-w-[220px] border-brand-light/20 text-brand-light hover:bg-brand-light/10 hover:border-brand-light/40 rounded-full px-8 py-6"
            onClick={() => setContactOpen(true)}
          >
            {content.secondaryButton}
          </Button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-brand-light/60">
          <a
            href="tel:+201003323458"
            className="hover:text-primary transition-colors"
          >
            +20 100 332 3458
          </a>
          <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-light/30" />
          <a
            href="mailto:info@brand-mappers.com"
            className="hover:text-primary transition-colors"
          >
            info@brand-mappers.com
          </a>
        </div>
      </div>
    </section>

    <ContactFormModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default CTASection;
