import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Home,
  Settings,
  Image,
  Users,
  Newspaper,
  Megaphone,
  Building2,
  Palette,
  Navigation,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Hero Section",
    description: "Edit headline, tagline, stats, and video background",
    icon: Home,
    path: "/admin/hero",
    color: "text-blue-500",
  },
  {
    title: "About Section",
    description: "Manage company information and statistics",
    icon: Building2,
    path: "/admin/about",
    color: "text-green-500",
  },
  {
    title: "Services",
    description: "Add, edit, or remove services offered",
    icon: Settings,
    path: "/admin/services",
    color: "text-purple-500",
  },
  {
    title: "Portfolio",
    description: "Manage portfolio items and categories",
    icon: Image,
    path: "/admin/portfolio",
    color: "text-orange-500",
  },
  {
    title: "Clients",
    description: "Edit client logos and testimonials",
    icon: Users,
    path: "/admin/clients",
    color: "text-pink-500",
  },
  {
    title: "News",
    description: "Publish and manage news articles",
    icon: Newspaper,
    path: "/admin/news",
    color: "text-cyan-500",
  },
  {
    title: "CTA Section",
    description: "Edit call-to-action content",
    icon: Megaphone,
    path: "/admin/cta",
    color: "text-red-500",
  },
  {
    title: "Navigation",
    description: "Manage navigation menu items",
    icon: Navigation,
    path: "/admin/navigation",
    color: "text-indigo-500",
  },
  {
    title: "Footer",
    description: "Edit footer content and links",
    icon: Phone,
    path: "/admin/footer",
    color: "text-amber-500",
  },
  {
    title: "Colors & Theme",
    description: "Customize site colors and theme settings",
    icon: Palette,
    path: "/admin/theme",
    color: "text-violet-500",
  },
];

export const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage all sections of your website from one place
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link key={section.path} to={section.path}>
            <Card className="hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-muted ${section.color}`}
                  >
                    <section.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};
