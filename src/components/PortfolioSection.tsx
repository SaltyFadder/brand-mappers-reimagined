import { useState, useEffect } from "react";
import { ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import portfolio1 from "@/assets/portfolio/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio/portfolio-7.jpg";
import portfolio8 from "@/assets/portfolio/portfolio-8.jpg";
import portfolio9 from "@/assets/portfolio/portfolio-9.jpg";
import portfolio10 from "@/assets/portfolio/portfolio-10.jpg";
import portfolio11 from "@/assets/portfolio/portfolio-11.jpg";
import portfolio12 from "@/assets/portfolio/portfolio-12.jpg";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  size: "small" | "medium" | "large";
}

const categories = ["All", "Exhibitions", "Printing", "Stands", "Activations"];

// Map old static paths to imported images for fallback
const imageMap: Record<string, string> = {
  "/src/assets/portfolio/portfolio-1.jpg": portfolio1,
  "/src/assets/portfolio/portfolio-2.jpg": portfolio2,
  "/src/assets/portfolio/portfolio-3.jpg": portfolio3,
  "/src/assets/portfolio/portfolio-4.jpg": portfolio4,
  "/src/assets/portfolio/portfolio-5.jpg": portfolio5,
  "/src/assets/portfolio/portfolio-6.jpg": portfolio6,
  "/src/assets/portfolio/portfolio-7.jpg": portfolio7,
  "/src/assets/portfolio/portfolio-8.jpg": portfolio8,
  "/src/assets/portfolio/portfolio-9.jpg": portfolio9,
  "/src/assets/portfolio/portfolio-10.jpg": portfolio10,
  "/src/assets/portfolio/portfolio-11.jpg": portfolio11,
  "/src/assets/portfolio/portfolio-12.jpg": portfolio12,
};

const defaultItems: PortfolioItem[] = [
  { id: "1", title: "Giza Systems Smart Guide", category: "Exhibitions", image: portfolio1, size: "large" },
  { id: "2", title: "Papa Johns Branding", category: "Printing", image: portfolio2, size: "small" },
  { id: "3", title: "Glemgas Italy Campaign", category: "Printing", image: portfolio3, size: "small" },
  { id: "4", title: "Fashion Optics Display", category: "Stands", image: portfolio4, size: "medium" },
  { id: "5", title: "Renault Exhibition Stand", category: "Exhibitions", image: portfolio5, size: "small" },
  { id: "6", title: "Heritage College Event", category: "Activations", image: portfolio6, size: "medium" },
  { id: "7", title: "Cisco Partnership Display", category: "Stands", image: portfolio7, size: "small" },
  { id: "8", title: "Valentine's Campaign", category: "Activations", image: portfolio8, size: "small" },
  { id: "9", title: "Real Repair Product Launch", category: "Printing", image: portfolio9, size: "medium" },
  { id: "10", title: "Telefunken Tablet Campaign", category: "Activations", image: portfolio10, size: "small" },
  { id: "11", title: "Smart Payment Solutions", category: "Exhibitions", image: portfolio11, size: "small" },
  { id: "12", title: "Rekaz Developments Launch", category: "Activations", image: portfolio12, size: "large" },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "portfolio_items")
          .maybeSingle();

        if (error) throw error;

        if (data?.value) {
          const items = data.value as unknown as PortfolioItem[];
          // Map old static paths to imported images
          const mappedItems = items.map(item => ({
            ...item,
            image: imageMap[item.image] || item.image,
          }));
          setPortfolioItems(mappedItems);
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 md:py-32 section-padding bg-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our portfolio of successful campaigns and creative
            executions across various industries.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-primary/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                item.size === "large"
                  ? "col-span-2 row-span-2"
                  : item.size === "medium"
                  ? "col-span-2"
                  : ""
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <span className="text-primary text-sm font-semibold mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-brand-light mb-3">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-brand-light/80">
                  <span className="text-sm">View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-outline">View All Projects</button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
