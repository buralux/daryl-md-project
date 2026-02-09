import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

const phases = [
  { key: "phase1", active: true, statusType: "inProgress" as const },
  { key: "phase2", active: false, statusType: "planned" as const },
  { key: "phase3", active: false, statusType: "planned" as const },
  { key: "phase4", active: false, statusType: "planned" as const },
];

function getBadgeVariant(statusType: string): "secondary" | "outline" {
  if (statusType === "inProgress") return "secondary";
  return "outline";
}

export default function Roadmap() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="Roadmap - DARYL"
        description={t("roadmap.hero.subtitle")}
        path="/roadmap"
      />

      <section
        data-testid="section-roadmap-hero"
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
        >
          {t("roadmap.hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("roadmap.hero.subtitle")}
        </motion.p>
      </section>

      <section className="px-6 pb-16">
        <motion.p
          {...fadeInUp}
          data-testid="text-roadmap-disclaimer"
          className="text-sm text-muted-foreground italic max-w-2xl mx-auto text-center"
        >
          {t("roadmap.disclaimer")}
        </motion.p>
      </section>

      <section
        data-testid="section-roadmap-timeline"
        className="py-24 px-6"
      >
        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-[5px] top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {phases.map((phase, i) => (
                <motion.div
                  key={phase.key}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
                  className="relative pl-12"
                  data-testid={`roadmap-${phase.key}`}
                >
                  <div
                    className={`absolute left-0 top-1.5 w-3 h-3 rounded-full ${
                      phase.active ? "bg-foreground" : "bg-border"
                    }`}
                  />
                  <div className="space-y-2">
                    <div className="flex items-center flex-wrap gap-3">
                      <h3 className="text-xl font-semibold text-foreground">
                        {t(`roadmap.${phase.key}.title`)}
                      </h3>
                      <Badge
                        variant={getBadgeVariant(phase.statusType)}
                        className="no-default-hover-elevate"
                      >
                        {t(`roadmap.${phase.key}.status`)}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {t(`roadmap.${phase.key}.description`)}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
