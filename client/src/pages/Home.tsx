import { motion } from "framer-motion";
import { Link } from "wouter";
import { BookOpen, Brain, Bot, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
};

const pillars = [
  { key: "narrative", icon: BookOpen },
  { key: "intelligence", icon: Brain },
  { key: "agents", icon: Bot },
];

const products = [
  { key: "darylab", link: "/products" },
  { key: "api", link: "/products" },
  { key: "sdk", link: "/products" },
];

const phases = [
  { key: "phase1" },
  { key: "phase2" },
  { key: "phase3" },
  { key: "phase4" },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="DARYL - Intelligence Layer"
        description={t("home.hero.description")}
        path="/"
      />

      <section
        data-testid="section-hero"
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent"
        >
          {t("home.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("home.hero.subtitle")}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="mt-4 text-lg text-muted-foreground/70 max-w-lg mx-auto"
        >
          {t("home.hero.description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.45 }}
          className="mt-10"
        >
          <Link href="/vision">
            <Button
              variant="outline"
              size="lg"
              data-testid="button-hero-cta"
            >
              {t("home.hero.cta")}
            </Button>
          </Link>
        </motion.div>
      </section>

      <section
        data-testid="section-what"
        className="py-32 px-6 max-w-6xl mx-auto"
      >
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("home.what.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("home.what.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              {...stagger}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
            >
              <Card className="hover-elevate p-8" data-testid={`card-pillar-${pillar.key}`}>
                <CardContent className="p-0 space-y-4">
                  <pillar.icon className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`home.pillars.${pillar.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`home.pillars.${pillar.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        data-testid="section-products"
        className="py-32 px-6 bg-card/30"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              {t("home.products.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.products.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, i) => {
              const status = t(`products.${product.key}.status`);
              const isAvailable =
                status === "Available" || status === "Disponible";

              return (
                <motion.div
                  key={product.key}
                  {...stagger}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                    delay: i * 0.15,
                  }}
                >
                  <Card
                    className="hover-elevate h-full"
                    data-testid={`card-product-${product.key}`}
                  >
                    <CardContent className="p-8 md:p-12 flex flex-col gap-4 h-full">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {t(`products.${product.key}.title`)}
                        </h3>
                        <Badge
                          variant={isAvailable ? "secondary" : "outline"}
                          className="no-default-hover-elevate"
                        >
                          {status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground flex-1">
                        {t(`products.${product.key}.description`)}
                      </p>
                      <Link href={product.link}>
                        <span
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          data-testid={`link-product-${product.key}`}
                        >
                          {t("common.learnMore")}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        data-testid="section-roadmap"
        className="py-32 px-6 max-w-4xl mx-auto"
      >
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("home.roadmap.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t("home.roadmap.subtitle")}
          </p>
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="relative"
        >
          <div className="absolute top-3 left-0 right-0 h-px bg-border hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {phases.map((phase, i) => {
              const isFirst = i === 0;
              return (
                <motion.div
                  key={phase.key}
                  {...stagger}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.1,
                  }}
                  className="text-center md:text-center"
                  data-testid={`roadmap-${phase.key}`}
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className={`h-6 w-6 rounded-full border-2 ${
                        isFirst
                          ? "bg-foreground border-foreground"
                          : "bg-background border-muted-foreground/30"
                      }`}
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
                    {t(`roadmap.${phase.key}.title`)}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {t(`roadmap.${phase.key}.status`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div {...fadeInUp} className="text-center mt-12">
          <Link href="/roadmap">
            <Button variant="outline" data-testid="link-roadmap-full">
              {t("common.viewFullRoadmap")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <section
        data-testid="section-manifesto"
        className="py-32 px-6 max-w-3xl mx-auto text-center"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          {t("home.manifesto.title")}
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-8 text-xl text-muted-foreground leading-relaxed"
        >
          {t("home.manifesto.text")}
        </motion.p>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-10"
        >
          <Link href="/vision">
            <Button variant="outline" size="lg" data-testid="link-manifesto-cta">
              {t("home.manifesto.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
