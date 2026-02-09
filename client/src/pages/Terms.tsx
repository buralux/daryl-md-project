import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead title="Terms and Conditions - DARYL" path="/terms" />

      <section data-testid="section-terms">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-24 text-center px-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t("terms.title")}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-6 py-12"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t("terms.content")}
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}
