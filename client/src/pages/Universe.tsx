import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" },
};

export default function Universe() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="Universe - DARYL"
        description={t("universe.hero.subtitle")}
        path="/universe"
      />

      <section
        data-testid="section-universe-hero"
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
        >
          {t("universe.hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("universe.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-universe-origin"
        className="py-24 px-6"
      >
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("universe.origin.title")}
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            {t("universe.origin.text")}
          </p>
        </motion.div>
      </section>

      <section
        data-testid="section-universe-question"
        className="py-24 px-6 bg-card/30"
      >
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("universe.question.title")}
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            {t("universe.question.text")}
          </p>
        </motion.div>
      </section>

      <section
        data-testid="section-universe-today"
        className="py-24 px-6"
      >
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {t("universe.today.title")}
          </h2>
          <p className="mt-8 text-xl leading-relaxed text-muted-foreground">
            {t("universe.today.text")}
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}
