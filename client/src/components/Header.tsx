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

// New IA: lead with the product (DSM), then how/use-cases/developers as
// on-page sections of Home (#anchors, no new routes), then Roadmap/Vision.
// `anchor: true` items render as plain <a> so in-page scrolling works with wouter.
const navItems = [
  { key: "nav.home", href: "/home" },
  { key: "nav.dsm", href: "/dsm" },
  { key: "nav.how", href: "/home#how", anchor: true },
  { key: "nav.usecases", href: "/home#usecases", anchor: true },
  { key: "nav.dev", href: "/home#developers", anchor: true },
  { key: "nav.roadmap", href: "/roadmap" },
  { key: "nav.vision", href: "/vision" },
  { key: "nav.contact", href: "/contact" },
];

export function Header() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [sheetOpen, setSheetOpen] = useState(false);

  const linkClass = (isActive: boolean) =>
    cn(
      "text-sm px-3 py-2 rounded-md transition-colors hover-elevate",
      isActive ? "text-foreground font-medium" : "text-muted-foreground",
    );

  const renderItem = (
    item: (typeof navItems)[number],
    mobile = false,
  ) => {
    const isActive = location === item.href;
    const testid = `link-${mobile ? "mobile-" : ""}${item.key.replace("nav.", "")}`;
    const onClick = mobile ? () => setSheetOpen(false) : undefined;

    if (item.anchor) {
      return (
        <a
          key={item.key}
          href={item.href}
          data-testid={testid}
          className={linkClass(false)}
          onClick={onClick}
        >
          {t(item.key)}
        </a>
      );
    }
    return (
      <Link
        key={item.key}
        href={item.href}
        data-testid={testid}
        className={linkClass(isActive)}
        onClick={onClick}
      >
        {t(item.key)}
      </Link>
    );
  };

  return (
    <header
      data-testid="header"
      className="sticky top-0 z-50 h-16 backdrop-blur-xl bg-background/80 border-b border-border/50"
    >
      <a
        href="#main"
        data-testid="link-skip-to-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:px-3 focus:py-2 focus:rounded-md focus:bg-background focus:text-foreground focus:ring-1 focus:ring-ring"
      >
        {t("common.skipToContent")}
      </a>
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo rend son propre <a> (wouter Link) — pas de <a> imbriqué. */}
        <Logo href="/home" data-testid="link-logo" />

        <nav className="hidden md:flex items-center gap-1 flex-wrap">
          {navItems.map((item) => renderItem(item))}
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
                aria-label={t("a11y.openMenu")}
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
                {navItems.map((item) => renderItem(item, true))}
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
