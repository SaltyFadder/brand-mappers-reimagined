const clients = [
  { name: "Heritage College", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Heritage" },
  { name: "Tech Corp", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=TechCorp" },
  { name: "Gulf Industries", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Gulf+Ind" },
  { name: "Cairo Events", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Cairo+Events" },
  { name: "African Trade", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=African+Trade" },
  { name: "Premium Retail", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Premium" },
  { name: "Global Expo", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Global+Expo" },
  { name: "Elite Brands", logo: "https://via.placeholder.com/180x60/f3f4f6/a3a3a3?text=Elite" },
];

const ClientsSection = () => {
  return (
    <section className="py-20 section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Trusted Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Brands That <span className="text-gradient">Trust Us</span>
          </h2>
        </div>

        {/* Logo Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary to-transparent z-10" />

          {/* Scrolling Container */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            {clients.map((client, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 group"
              >
                <div className="w-36 h-16 md:w-44 md:h-20 bg-background rounded-xl flex items-center justify-center p-4 border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-medium">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12 group"
              >
                <div className="w-36 h-16 md:w-44 md:h-20 bg-background rounded-xl flex items-center justify-center p-4 border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-medium">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
