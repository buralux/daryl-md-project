import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Layers, Plug } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const useCases = [
  { key: "research", icon: Search },
  { key: "prototyping", icon: Layers },
  { key: "integration", icon: Plug },
];

const steps = [
  { key: "step1", number: 1 },
  { key: "step2", number: 2 },
  { key: "step3", number: 3 },
];

export default function DaryLab() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="DaryLab - DARYL"
        description={t("darylab.intro")}
        path="/products/darylab"
      />

      <section
        data-testid="section-darylab-hero"
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground"
        >
          {t("darylab.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("darylab.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-darylab-intro"
        className="py-24 px-6"
      >
        <motion.p
          {...fadeInUp}
          className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed text-center"
        >
          {t("darylab.intro")}
        </motion.p>
      </section>

      <section
        data-testid="section-darylab-usecases"
        className="py-32 px-6 max-w-6xl mx-auto"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16"
        >
          {t("darylab.usecases.title")}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.key}
              {...stagger}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
            >
              <Card
                className="hover-elevate p-8 h-full"
                data-testid={`card-usecase-${useCase.key}`}
              >
                <CardContent className="p-0 space-y-4">
                  <useCase.icon className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`darylab.usecases.${useCase.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`darylab.usecases.${useCase.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        data-testid="section-darylab-how"
        className="py-32 px-6 max-w-4xl mx-auto"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-16"
        >
          {t("darylab.how.title")}
        </motion.h2>

        <motion.div {...fadeInUp} className="relative">
          <div className="hidden md:block absolute top-6 left-[16.67%] right-[16.67%] h-px border-t border-dashed border-border" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.key}
                {...stagger}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex items-center justify-center h-12 w-12 rounded-full border-2 border-foreground bg-background mb-6">
                  <span className="text-sm font-semibold text-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`darylab.how.${step.key}.title`)}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {t(`darylab.how.${step.key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section
        data-testid="section-darylab-cta"
        className="py-24 px-6 text-center"
      >
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-10"
        >
          {t("darylab.cta.title")}
        </motion.h2>

        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <Link href="/contact">
            <Button
              variant="default"
              size="lg"
              data-testid="button-darylab-cta"
            >
              {t("darylab.cta.button")}
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
