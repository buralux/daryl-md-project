import { motion } from "framer-motion";
import { BarChart3, Network, MessageSquare, Activity } from "lucide-react";
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

const agents = [
  { key: "analysis", icon: BarChart3 },
  { key: "orchestration", icon: Network },
  { key: "communication", icon: MessageSquare },
  { key: "monitoring", icon: Activity },
];

export default function Agents() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="Agents - DARYL"
        description={t("agents.hero.subtitle")}
        path="/agents"
      />

      <section
        data-testid="section-agents-hero"
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground"
        >
          {t("agents.hero.title")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight"
        >
          {t("agents.hero.subtitle")}
        </motion.p>
      </section>

      <section
        data-testid="section-agents-intro"
        className="py-16 px-6"
      >
        <motion.p
          {...fadeInUp}
          className="text-xl text-muted-foreground max-w-3xl mx-auto text-center leading-relaxed"
        >
          {t("agents.intro")}
        </motion.p>
      </section>

      <section
        data-testid="section-agents-grid"
        className="py-24 px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <Card
                className="hover-elevate p-8"
                data-testid={`card-agent-${agent.key}`}
              >
                <CardContent className="p-0 space-y-4">
                  <agent.icon className="h-8 w-8 text-muted-foreground" />
                  <h3 className="text-xl font-semibold text-foreground">
                    {t(`agents.${agent.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`agents.${agent.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section
        data-testid="section-agents-blockchain"
        className="py-24 px-6"
      >
        <motion.div
          {...fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <Card className="p-8 border-dashed" data-testid="card-agent-blockchain">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("agents.blockchain.title")}
                </h3>
                <Badge variant="outline" className="no-default-hover-elevate">
                  {t("agents.blockchain.status")}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {t("agents.blockchain.description")}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
}
