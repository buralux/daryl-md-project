import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";

export default function DSM() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="DSM - DARYL"
        description="Daryl Sharding Memory - Persistent semantic memory system"
        path="/dsm"
      />

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground">
          {t("dsm.hero.headline")}
        </h1>

        <p className="mt-8 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight max-w-3xl">
          {t("dsm.hero.subtitle")} — {t("dsm.hero.tagline")}
        </p>
      </section>

      {/* Core Pillars - 3 Bullets */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Shard</div>
            <p className="text-base text-muted-foreground">
              {t("dsm.pillars.shard")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Index</div>
            <p className="text-base text-muted-foreground">
              {t("dsm.pillars.index")}
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Verify</div>
            <p className="text-base text-muted-foreground">
              {t("dsm.pillars.verify")}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.howitworks.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("dsm.howitworks.step1.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("dsm.howitworks.step1.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("dsm.howitworks.step2.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("dsm.howitworks.step2.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("dsm.howitworks.step3.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("dsm.howitworks.step3.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t("dsm.howitworks.step4.title")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("dsm.howitworks.step4.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases - 3 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.usecases.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.usecases.coordination.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.coordination.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.usecases.continuity.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.continuity.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.usecases.evolution.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.evolution.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
