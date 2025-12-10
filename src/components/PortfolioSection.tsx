import { useState } from "react";
import { ExternalLink } from "lucide-react";

const categories = ["All", "Events", "Shop Design", "Printing", "Exhibitions"];

const portfolioItems = [
  {
    id: 1,
    title: "Heritage College Launch Event",
    category: "Events",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    size: "large",
  },
  {
    id: 2,
    title: "Premium Retail Store Design",
    category: "Shop Design",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: 3,
    title: "Corporate Brand Materials",
    category: "Printing",
    image: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: 4,
    title: "Tech Expo Exhibition Stand",
    category: "Exhibitions",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 5,
    title: "Annual Gala Production",
    category: "Events",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: 6,
    title: "Luxury Boutique Interior",
    category: "Shop Design",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&h=600&fit=crop",
    size: "medium",
  },
];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");

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
