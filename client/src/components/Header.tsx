import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation, LanguageSwitcher } from "@/lib/i18n";
import { ThemeToggle } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/Logo";

const navItems = [
  { key: "nav.home", href: "/home" },
  { key: "nav.vision", href: "/vision" },
  { key: "nav.products", href: "/products" },
  { key: "nav.agents", href: "/agents" },
  { key: "nav.roadmap", href: "/roadmap" },
  { key: "nav.universe", href: "/universe" },
  { key: "nav.dsm", href: "/dsm" },
  { key: "nav.contact", href: "/contact" },
];

export function Header() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-background/80 border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <Link href="/home" data-testid="link-logo">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-wrap">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                data-testid={`link-${item.key.replace("nav.", "")}`}
                className={cn(
                  "text-sm px-3 py-2 rounded-md transition-colors hover-elevate",
                  isActive
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      data-testid={`link-mobile-${item.key.replace("nav.", "")}`}
                      className={cn(
                        "text-sm px-3 py-2 rounded-md transition-colors hover-elevate",
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setSheetOpen(false)}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </nav>
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
