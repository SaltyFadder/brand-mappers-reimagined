import { Store, Printer, Calendar, Layers, Box, ArrowRight, Palette, Gift, Globe } from "lucide-react";

const services = [
  {
    icon: Calendar,
    title: "Exhibitions & Events",
    description:
      "End-to-end event solutions from concept to execution, creating memorable experiences that exceed expectations.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
  },
  {
    icon: Printer,
    title: "Offset & Digital Printing",
    description:
      "Premium quality printing solutions from small format to large scale productions with meticulous attention to detail.",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=600&fit=crop",
  },
  {
    icon: Store,
    title: "Shop & Office Interior & Facade",
    description:
      "Transform retail and office spaces with stunning designs that captivate customers and enhance brand identity.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    icon: Layers,
    title: "Industrial Visuals & Printouts",
    description:
      "Large-scale industrial printing and visual solutions for manufacturing and commercial environments.",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
  },
  {
    icon: Box,
    title: "Stands & Display Units",
    description:
      "Eye-catching exhibition stands and display units that make your brand stand out in any trade show or expo.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
  },
  {
    icon: Globe,
    title: "Applications & Website Development",
    description:
      "Custom web and mobile applications that extend your brand's digital presence with modern technology.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: Gift,
    title: "Corporate Giveaways",
    description:
      "Memorable branded merchandise and promotional items that leave a lasting impression on clients and partners.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
  },
  {
    icon: Palette,
    title: "360 Brand Activations",
    description:
      "Comprehensive brand activation campaigns that engage audiences across multiple touchpoints and channels.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Our Services
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            What We <span className="text-gradient">Deliver</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive BTL advertising solutions tailored to elevate your
            brand presence and create lasting impressions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-strong ${
                index === 0 || index === 7 ? "lg:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-90" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
