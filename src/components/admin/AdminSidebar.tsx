import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  Settings,
  Palette,
  Image,
  Users,
  Newspaper,
  Phone,
  Navigation,
  LayoutDashboard,
  Megaphone,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Overview", path: "/admin", icon: LayoutDashboard },
  { title: "Hero Section", path: "/admin/hero", icon: Home },
  { title: "About Section", path: "/admin/about", icon: Building2 },
  { title: "Services", path: "/admin/services", icon: Settings },
  { title: "Portfolio", path: "/admin/portfolio", icon: Image },
  { title: "Clients", path: "/admin/clients", icon: Users },
  { title: "News", path: "/admin/news", icon: Newspaper },
  { title: "CTA Section", path: "/admin/cta", icon: Megaphone },
  { title: "Navigation", path: "/admin/navigation", icon: Navigation },
  { title: "Footer", path: "/admin/footer", icon: Phone },
  { title: "Colors & Theme", path: "/admin/theme", icon: Palette },
  { title: "SEO Settings", path: "/admin/seo", icon: Search },
];

export const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-screen bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <h2 className="font-display font-bold text-lg text-foreground">
            Dashboard
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/admin"
                ? location.pathname === "/admin"
                : location.pathname.startsWith(item.path);

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                    "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
                    isActive &&
                      "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.title}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        {!collapsed && (
          <p className="text-xs text-muted-foreground text-center">
            Brand Mappers Admin
          </p>
        )}
      </div>
    </aside>
  );
};
