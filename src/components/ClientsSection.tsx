import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface ClientsContent {
  title: string;
  subtitle: string;
  description: string;
}

const defaultContent: ClientsContent = {
  title: "Trusted Partners",
  subtitle: "Brands That Trust Us",
  description: "Bond is how we describe our business relationships - a deep connection full of responsibility for quality and impact.",
};

const defaultClients: Client[] = [
  { id: "1", name: "HP", logo: "" },
  { id: "2", name: "Samsung", logo: "" },
  { id: "3", name: "Coca Cola", logo: "" },
  { id: "4", name: "Jotun", logo: "" },
  { id: "5", name: "L'Oreal", logo: "" },
  { id: "6", name: "Orascom", logo: "" },
  { id: "7", name: "ExxonMobil", logo: "" },
  { id: "8", name: "Emirates NBD", logo: "" },
  { id: "9", name: "Banque du Caire", logo: "" },
  { id: "10", name: "Heritage College", logo: "" },
  { id: "11", name: "Papa Johns", logo: "" },
  { id: "12", name: "Renault", logo: "" },
  { id: "13", name: "Glemgas", logo: "" },
  { id: "14", name: "LUNA", logo: "" },
  { id: "15", name: "Vezeeta", logo: "" },
  { id: "16", name: "Molfix", logo: "" },
];

const ClientsSection = () => {
  const [content, setContent] = useState<ClientsContent>(defaultContent);
  const [clients, setClients] = useState<Client[]>(defaultClients);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", ["clients_content", "clients_list"]);

        if (error) throw error;

        if (data) {
          data.forEach((item) => {
            if (item.key === "clients_content" && item.value) {
              setContent(item.value as unknown as ClientsContent);
            }
            if (item.key === "clients_list" && item.value) {
              setClients(item.value as unknown as Client[]);
            }
          });
        }
      } catch (err) {
        console.error("Error fetching clients data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-20 section-padding bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            {content.title}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {content.subtitle.split(" ").slice(0, -1).join(" ")} <span className="text-gradient">{content.subtitle.split(" ").slice(-1)}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {content.description}
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
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="max-h-10 max-w-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground font-semibold text-sm md:text-base group-hover:text-primary transition-colors whitespace-nowrap">
                      {client.name}
                    </span>
                  )}
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
                  {client.logo ? (
                    <img src={client.logo} alt={client.name} className="max-h-10 max-w-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground font-semibold text-sm md:text-base group-hover:text-primary transition-colors whitespace-nowrap">
                      {client.name}
                    </span>
                  )}
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
