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
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground">
          {t("dsm.hero.title")}
        </h1>

        <p className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight">
          {t("dsm.hero.subtitle")}
        </p>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6">
        <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed text-center">
          {t("dsm.intro")}
        </p>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.capabilities.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.capabilities.sharding.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.capabilities.sharding.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.capabilities.coordination.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.capabilities.coordination.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">{t("dsm.capabilities.continuity.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.capabilities.continuity.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.architecture.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8">{t("dsm.architecture.shards.title")}</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.shards.system")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.shards.personal")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.shards.projects")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.shards.shared")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8">{t("dsm.architecture.agents.title")}</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.agents.primary")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.agents.worker")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.agents.monitor")}</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span>{t("dsm.architecture.agents.sync")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.status.title")}
        </h2>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dsm.status.system")}</span>
                  <span className="text-green-400 font-semibold">{t("dsm.status.system.value")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dsm.status.shards")}</span>
                  <span className="text-white font-semibold">{t("dsm.status.shards.value")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dsm.status.agents")}</span>
                  <span className="text-white font-semibold">{t("dsm.status.agents.value")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{t("dsm.status.updated")}</span>
                  <span className="text-white font-semibold">{t("dsm.status.updated.value")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
