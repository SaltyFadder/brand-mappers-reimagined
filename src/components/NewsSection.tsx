import { useState, useEffect } from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import heritageCollege from "@/assets/heritage-college.jpg";
import portfolio2 from "@/assets/portfolio/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio/portfolio-3.jpg";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

const defaultNewsItems: NewsItem[] = [
  {
    id: "1",
    title: "Celebrating New Contract with Heritage College",
    excerpt: "Brand Mappers secures major partnership to design and produce college events for the upcoming academic year.",
    date: "2024-12-05",
    image: heritageCollege,
    category: "Partnership",
  },
  {
    id: "2",
    title: "Expanding Our Presence in the Gulf Region",
    excerpt: "Opening new offices in Dubai and Riyadh to better serve our growing client base in the Middle East.",
    date: "2024-11-28",
    image: portfolio2,
    category: "Expansion",
  },
  {
    id: "3",
    title: "Award-Winning Exhibition at Cairo Expo 2024",
    excerpt: "Our innovative booth design wins Best Exhibition Stand at the annual Cairo International Trade Show.",
    date: "2024-11-15",
    image: portfolio3,
    category: "Awards",
  },
];

// Map old static paths to imported images for fallback
const imageMap: Record<string, string> = {
  "": "",
};

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateString;
  }
};

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(defaultNewsItems);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", "news_items")
          .maybeSingle();

        if (error) throw error;

        if (data?.value) {
          const items = data.value as unknown as NewsItem[];
          // Map images - use the URL if it's a full URL, otherwise use fallback
          const mappedItems = items.map(item => ({
            ...item,
            image: item.image?.startsWith("http") ? item.image : (imageMap[item.image] || item.image || defaultNewsItems[0]?.image),
          }));
          setNewsItems(mappedItems);
        }
      } catch (err) {
        console.error("Error fetching news data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="news" className="py-24 md:py-32 section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
              Latest News
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">
              What's <span className="text-gradient">Happening</span>
            </h2>
          </div>
          <a
            href="/news"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            View All News
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border card-hover"
            >
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {formatDate(item.date)}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                  {item.excerpt}
                </p>

                <a
                  href={`/news/${item.id}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
