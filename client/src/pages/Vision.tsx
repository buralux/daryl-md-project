import { motion } from "framer-motion";
import { Eye, Compass, Shield, Sparkles, ArrowRight, ArrowDown } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";

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

const principles = [
  { key: "clarity", icon: Eye },
  { key: "autonomy", icon: Compass },
  { key: "safety", icon: Shield },
  { key: "elegance", icon: Sparkles },
];

const diagramNodes = ["user", "core", "agents", "systems"];

export default function Vision() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="Vision - DARYL"
        description={t("vision.intro")}
        path="/vision"
      />

      <section
        data-testid="section-vision-hero"
        className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground"
        >
          {t("vision.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("vision.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-vision-intro"
        className="py-24 px-6"
      >
        <motion.p
          {...fadeInUp}
          className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed text-center"
        >
          {t("vision.intro")}
        </motion.p>
      </section>

      <section
        data-testid="section-vision-principles"
        className="py-32 px-6 max-w-5xl mx-auto"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16"
        >
          {t("vision.principles.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((principle, i) => (
            <motion.div
              key={principle.key}
              {...stagger}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
            >
              <Card
                className="hover-elevate p-8"
                data-testid={`card-principle-${principle.key}`}
              >
                <CardContent className="p-0 space-y-4">
                  <principle.icon className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`vision.principles.${principle.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`vision.principles.${principle.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        data-testid="section-vision-diagram"
        className="py-32 px-6 max-w-4xl mx-auto"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16"
        >
          {t("vision.diagram.title")}
        </motion.h2>

        <motion.div
          {...fadeInUp}
          className="hidden md:flex items-center justify-center gap-4"
        >
          {diagramNodes.map((node, i) => (
            <div key={node} className="flex items-center gap-4">
              <div className="flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background">
                <span className="text-sm font-medium text-foreground">
                  {t(`vision.diagram.${node}`)}
                </span>
              </div>
              {i < diagramNodes.length - 1 && (
                <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeInUp}
          className="flex md:hidden flex-col items-center gap-4"
        >
          {diagramNodes.map((node, i) => (
            <div key={node} className="flex flex-col items-center gap-4">
              <div className="flex items-center justify-center px-6 py-3 rounded-full border border-border bg-background">
                <span className="text-sm font-medium text-foreground">
                  {t(`vision.diagram.${node}`)}
                </span>
              </div>
              {i < diagramNodes.length - 1 && (
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </motion.div>
      </section>
    </Layout>
  );
}
