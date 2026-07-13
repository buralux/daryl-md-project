import { Switch, Route } from "wouter";
import { MotionConfig } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { ExperienceShell } from "@/world/ExperienceShell";
import WorldLab from "@/world-lab/WorldLab"; // [experiment/scroll-world uniquement]
import NotFound from "@/pages/not-found";
import Teaser from "@/pages/Teaser";
import Home from "@/pages/Home";
import Vision from "@/pages/Vision";
import Products from "@/pages/Products";
import DaryLab from "@/pages/DaryLab";
import Agents from "@/pages/Agents";
import Roadmap from "@/pages/Roadmap";
import Universe from "@/pages/Universe";
import DSM from "@/pages/DSM";
import Contact from "@/pages/Contact";
import Cookies from "@/pages/Cookies";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";

function Router() {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/" component={Teaser} />
      <Route path="/vision" component={Vision} />
      <Route path="/products" component={Products} />
      <Route path="/products/darylab" component={DaryLab} />
      <Route path="/lab" component={DaryLab} />
      <Route path="/agents" component={Agents} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/universe" component={Universe} />
      <Route path="/dsm" component={DSM} />
      <Route path="/contact" component={Contact} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      {/* Route d'expérimentation — branche experiment/scroll-world uniquement, noindex, hors sitemap */}
      <Route path="/world-lab" component={WorldLab} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          {/* reducedMotion="user": toutes les animations framer-motion respectent prefers-reduced-motion. */}
          <MotionConfig reducedMotion="user">
            <TooltipProvider>
              <Toaster />
              {/* Frontiere persistante : survit aux changements de route (voir world/ExperienceShell). */}
              <ExperienceShell>
                <Router />
              </ExperienceShell>
            </TooltipProvider>
          </MotionConfig>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
