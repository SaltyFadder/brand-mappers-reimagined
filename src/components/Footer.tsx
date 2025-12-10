import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "News", href: "#news" },
  { name: "Contact", href: "#contact" },
];

const services = [
  "Shop Design",
  "Printing Solutions",
  "Event Management",
  "Exhibition Stands",
  "Booth Creation",
];

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/brand-mappers", label: "LinkedIn" },
  { icon: Instagram, href: "https://instagram.com/brandmappers", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com/brandmappers", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com/brandmappers", label: "Twitter" },
];

const Footer = () => {
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
                Your one-stop BTL advertising partner since 2016. Creating
                impactful brand experiences across Egypt, Gulf, Africa, and the
                Americas.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-brand-light/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
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
                    href="tel:+201003323458"
                    className="text-brand-light/60 hover:text-primary transition-colors"
                  >
                    +20 100 332 3458
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:info@brand-mappers.com"
                    className="text-brand-light/60 hover:text-primary transition-colors"
                  >
                    info@brand-mappers.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-brand-light/60">
                    Cairo, Egypt
                    <br />
                    Dubai, UAE
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
