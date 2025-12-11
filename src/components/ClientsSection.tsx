const clients = [
  { name: "HP" },
  { name: "Samsung" },
  { name: "Coca Cola" },
  { name: "Jotun" },
  { name: "L'Oreal" },
  { name: "Orascom" },
  { name: "ExxonMobil" },
  { name: "Emirates NBD" },
  { name: "Banque du Caire" },
  { name: "Heritage College" },
  { name: "Papa Johns" },
  { name: "Renault" },
  { name: "Glemgas" },
  { name: "LUNA" },
  { name: "Vezeeta" },
  { name: "Molfix" },
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
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Brands That <span className="text-gradient">Trust Us</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Bond is how we describe our business relationships - a deep connection full of responsibility for quality and impact.
          </p>
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
                className="flex-shrink-0 mx-6 md:mx-8 group"
              >
                <div className="w-32 h-14 md:w-40 md:h-16 bg-background rounded-xl flex items-center justify-center px-4 border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-medium">
                  <span className="text-muted-foreground font-semibold text-sm md:text-base group-hover:text-primary transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {clients.map((client, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 mx-6 md:mx-8 group"
              >
                <div className="w-32 h-14 md:w-40 md:h-16 bg-background rounded-xl flex items-center justify-center px-4 border border-border transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-medium">
                  <span className="text-muted-foreground font-semibold text-sm md:text-base group-hover:text-primary transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
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
