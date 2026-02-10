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
          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-card-border rounded">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{t("dsm.howitworks.step1.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("dsm.howitworks.step1.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-card-border rounded">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{t("dsm.howitworks.step2.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("dsm.howitworks.step2.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-card-border rounded">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{t("dsm.howitworks.step3.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t("dsm.howitworks.step3.description")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-card-border rounded">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{t("dsm.howitworks.step4.title")}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
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
          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.usecases.coordination.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.coordination.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.usecases.continuity.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.continuity.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.usecases.evolution.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.usecases.evolution.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Design Principles - 4 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.principles.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.principles.appendonly.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.principles.appendonly.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.principles.sharded.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.principles.sharded.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.principles.verifiable.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.principles.verifiable.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.principles.deterministic.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.principles.deterministic.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What DSM is NOT - 3 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          {t("dsm.isnot.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.isnot.chathistory.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.isnot.chathistory.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.isnot.vectordb.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.isnot.vectordb.description")}
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate p-8">
            <CardContent className="p-0 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">{t("dsm.isnot.blackbox.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("dsm.isnot.blackbox.description")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Example Flow */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            {t("dsm.exampleFlow.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("dsm.exampleFlow.subtitle")}
          </p>
        </div>

        <Card className="hover-elevate p-8">
          <CardContent className="p-0 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-border text-sm font-semibold text-foreground">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("dsm.exampleFlow.step1.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("dsm.exampleFlow.step1.description")}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-border text-sm font-semibold text-foreground">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("dsm.exampleFlow.step2.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("dsm.exampleFlow.step2.description")}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-border text-sm font-semibold text-foreground">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("dsm.exampleFlow.step3.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("dsm.exampleFlow.step3.description")}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-border text-sm font-semibold text-foreground">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("dsm.exampleFlow.step4.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("dsm.exampleFlow.step4.description")}
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-card-border text-sm font-semibold text-foreground">
                  5
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {t("dsm.exampleFlow.step5.title")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t("dsm.exampleFlow.step5.description")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </Layout>
  );
}
