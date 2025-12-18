import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { name: "Home", href: "/#home" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "News", href: "/#news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/#contact" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-soft py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="section-padding flex items-center justify-between max-w-[1800px] mx-auto">
        {/* Logo */}
        <Link to="/" className="relative z-50">
          <img src={logo} alt="Brand Mappers" className="h-10 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            link.href.startsWith('/') && !link.href.includes('#') ? (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 link-underline"
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300 link-underline"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Button className="btn-primary text-sm">Get Started</Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden relative z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background z-40 lg:hidden transition-transform duration-500 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link, index) => (
              link.href.startsWith('/') && !link.href.includes('#') ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-foreground hover:text-primary transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-display font-bold text-foreground hover:text-primary transition-colors"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.name}
                </a>
              )
            ))}
            <Button
              className="btn-primary mt-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
