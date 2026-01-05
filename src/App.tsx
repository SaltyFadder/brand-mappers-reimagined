import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// Admin components
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { HeroEditor } from "@/components/admin/editors/HeroEditor";
import { AboutEditor } from "@/components/admin/editors/AboutEditor";
import { ServicesEditor } from "@/components/admin/editors/ServicesEditor";
import { PortfolioEditor } from "@/components/admin/editors/PortfolioEditor";
import { ClientsEditor } from "@/components/admin/editors/ClientsEditor";
import { NewsEditor } from "@/components/admin/editors/NewsEditor";
import { CTAEditor } from "@/components/admin/editors/CTAEditor";
import { NavigationEditor } from "@/components/admin/editors/NavigationEditor";
import { FooterEditor } from "@/components/admin/editors/FooterEditor";
import { ThemeEditor } from "@/components/admin/editors/ThemeEditor";
import { SEOEditor } from "@/components/admin/editors/SEOEditor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminOverview />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="about" element={<AboutEditor />} />
              <Route path="services" element={<ServicesEditor />} />
              <Route path="portfolio" element={<PortfolioEditor />} />
              <Route path="clients" element={<ClientsEditor />} />
              <Route path="news" element={<NewsEditor />} />
              <Route path="cta" element={<CTAEditor />} />
              <Route path="navigation" element={<NavigationEditor />} />
              <Route path="footer" element={<FooterEditor />} />
              <Route path="theme" element={<ThemeEditor />} />
              <Route path="seo" element={<SEOEditor />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
