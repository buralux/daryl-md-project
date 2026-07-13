import { Link } from "wouter";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead title="404 — DARYL" description={t("notFound.message")} />
      <section
        data-testid="section-not-found"
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
      >
        <p className="text-sm uppercase tracking-widest text-muted-foreground">
          404
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
          {t("notFound.title")}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("notFound.message")}
        </p>
        <Button asChild variant="secondary" className="mt-8" data-testid="button-notfound-home">
          <Link href="/home">{t("notFound.home")}</Link>
        </Button>
      </section>
    </Layout>
  );
}
