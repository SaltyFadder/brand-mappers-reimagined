import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";
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

const services = [
  "Shop Design",
  "Printing Solutions",
  "Event Management",
  "Exhibition Stands",
  "Booth Creation",
];

const iconMap: Record<string, React.ElementType> = {
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
};

const Footer = () => {
  const [content, setContent] = useState<FooterContent>(defaultContent);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "footer_content")
          .maybeSingle();

        if (error) throw error;

        if (data?.value) {
          setContent(data.value as unknown as FooterContent);
        }
      } catch (err) {
        console.error("Error fetching footer data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-brand-dark text-brand-light">
      {/* Main Footer */}
      <div className="section-padding py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <a href="#home" className="inline-block mb-6">
                <span className="font-display text-2xl font-bold">
                  Brand<span className="text-primary">Mappers</span>
                </span>
              </a>
              <p className="text-brand-light/60 leading-relaxed mb-6">
                {content.companyDescription}
              </p>
              <div className="flex gap-4">
                {content.socialLinks.map((social) => {
                  const IconComponent = iconMap[social.icon] || Linkedin;
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="w-10 h-10 rounded-full bg-brand-light/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {content.quickLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      className="text-brand-light/60 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-brand-light/60">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={`tel:${content.contact.phone.replace(/\s/g, "")}`}
                    className="text-brand-light/60 hover:text-primary transition-colors"
                  >
                    {content.contact.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href={`mailto:${content.contact.email}`}
                    className="text-brand-light/60 hover:text-primary transition-colors"
                  >
                    {content.contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-brand-light/60 whitespace-pre-line">
                    {content.contact.address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-light/10">
        <div className="section-padding py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-brand-light/50">
            <p>
              © {new Date().getFullYear()} Brand Mappers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
