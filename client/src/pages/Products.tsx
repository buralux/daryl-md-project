import { motion } from "framer-motion";
import { Link } from "wouter";
import { FlaskConical, Code, Package, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";
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

const products = [
  { key: "darylab", icon: FlaskConical, link: "/products/darylab", available: true },
  { key: "api", icon: Code, link: null, available: false },
  { key: "sdk", icon: Package, link: null, available: false },
];

export default function Products() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="Products - DARYL"
        description={t("products.hero.subtitle")}
        path="/products"
      />

      <section
        data-testid="section-products-hero"
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground"
        >
          {t("products.hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("products.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-products-grid"
        className="py-32 px-6 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, i) => {
            const status = t(`products.${product.key}.status`);

            return (
              <motion.div
                key={product.key}
                {...stagger}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
              >
                <Card
                  className="hover-elevate h-full"
                  data-testid={`card-product-${product.key}`}
                >
                  <CardContent className="p-8 flex flex-col gap-5 h-full">
                    <product.icon className="h-8 w-8 text-muted-foreground" />
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {t(`products.${product.key}.title`)}
                      </h3>
                      <Badge
                        variant={product.available ? "secondary" : "outline"}
                        className="no-default-hover-elevate"
                      >
                        {status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground flex-1">
                      {t(`products.${product.key}.description`)}
                    </p>
                    {product.link && (
                      <Link href={product.link}>
                        <span
                          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                          data-testid={`link-product-${product.key}`}
                        >
                          Learn more
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
