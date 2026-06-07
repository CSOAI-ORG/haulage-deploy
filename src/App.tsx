import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import "@/i18n";  // initialise i18next before any component mounts
import ScrollToTop from "@/components/ScrollToTop";
import SkipToContent from "@/components/SkipToContent";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import ThemeProvider from "@/components/ThemeProvider";
import Index from "./pages/Index";

// Lazy-load secondary routes — Index stays in main bundle for fastest LCP.
const MCPsPage = lazy(() => import("./pages/MCPsPage"));
const MapPage = lazy(() => import("./pages/MapPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const GovernancePage = lazy(() => import("./pages/GovernancePage"));
const QuickstartPage = lazy(() => import("./pages/QuickstartPage"));
const TrustPage = lazy(() => import("./pages/TrustPage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const BlogLaunchPage = lazy(() => import("./pages/BlogLaunchPage"));
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const PartnersPage = lazy(() => import("./pages/PartnersPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const GlossaryPage = lazy(() => import("./pages/GlossaryPage"));
const ControlsPage = lazy(() => import("./pages/ControlsPage"));
const IntegrationsPage = lazy(() => import("./pages/IntegrationsPage"));
const StatusPage = lazy(() => import("./pages/StatusPage"));
const ChangelogPage = lazy(() => import("./pages/ChangelogPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SkipToContent />
        <ScrollToTop />
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/mcps" element={<MCPsPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/governance" element={<GovernancePage />} />
            <Route path="/docs/quickstart" element={<QuickstartPage />} />
            <Route path="/trust" element={<TrustPage />} />
            <Route path="/vs/:slug" element={<ComparisonPage />} />
            <Route path="/blog/launch" element={<BlogLaunchPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/legal/:doc" element={<LegalPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/controls" element={<ControlsPage />} />
            <Route path="/integrations" element={<IntegrationsPage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Analytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ThemeProvider>
);

export default App;
