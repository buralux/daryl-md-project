import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import { Logo } from "@/components/Logo";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.vision", href: "/vision" },
  { key: "nav.products", href: "/products" },
  { key: "nav.agents", href: "/agents" },
  { key: "nav.roadmap", href: "/roadmap" },
  { key: "nav.universe", href: "/universe" },
  { key: "nav.contact", href: "/contact" },
];

const legalLinks = [
  { key: "footer.legal.cookies", href: "/cookies" },
  { key: "footer.legal.privacy", href: "/privacy" },
  { key: "footer.legal.terms", href: "/terms" },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer data-testid="footer" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("footer.nav.title")}</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  data-testid={`link-footer-${item.key.replace("nav.", "")}`}
                  className="text-sm text-muted-foreground hover-elevate rounded-md px-1 py-0.5 w-fit transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("footer.legal.title")}</h3>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  data-testid={`link-footer-${item.href.replace("/", "")}`}
                  className="text-sm text-muted-foreground hover-elevate rounded-md px-1 py-0.5 w-fit transition-colors"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Email</h3>
            <a
              href="mailto:hello@daryl.md"
              data-testid="link-footer-email"
              className="text-sm text-muted-foreground hover-elevate rounded-md px-1 py-0.5 w-fit transition-colors inline-block"
            >
              hello@daryl.md
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
