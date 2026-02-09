import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";

export default function Cookies() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead title="Cookies Policy - DARYL" path="/cookies" />

      <section data-testid="section-cookies">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-24 text-center px-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {t("cookies.title")}
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
            {t("cookies.content")}
          </p>
        </motion.div>
      </section>
    </Layout>
  );
}
