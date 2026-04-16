import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, Layers, Plug, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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

      <TryDaryLab />
    </Layout>
  );
}

const PLACEHOLDERS: Record<string, string> = {
  general: "Paste any text to analyze with 3 independent agents…",
  contract: "Paste a contract clause or legal excerpt to review…",
  debate: "Enter a statement or argument to debate from multiple angles…",
  research: "Describe a research question or topic to investigate…",
};

interface AnalyzeResult {
  agentId: string;
  sigVerified: boolean;
  summary: string;
  riskLevel: string | null;
}

interface AnalyzeResponse {
  status: "pending" | "partial" | "complete";
  results: AnalyzeResult[];
  consensus: string | null;
  eventCount: number;
}

function RiskBadge({ level }: { level: string | null }) {
  if (!level) return <Badge variant="outline" className="text-muted-foreground">—</Badge>;
  const colors: Record<string, string> = {
    HIGH: "bg-red-500/10 text-red-600 border-red-500/30",
    MEDIUM: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    LOW: "bg-green-500/10 text-green-600 border-green-500/30",
  };
  return (
    <Badge variant="outline" className={colors[level] ?? ""}>
      {level}
    </Badge>
  );
}

function TryDaryLab() {
  const [type, setType] = useState("general");
  const [content, setContent] = useState("");
  const [missionId, setMissionId] = useState<string | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/analyze", { content, type });
      return (await res.json()) as { missionId: string };
    },
    onSuccess: (data) => {
      setMissionId(data.missionId);
      setStartedAt(Date.now());
    },
  });

  const pollQuery = useQuery<AnalyzeResponse>({
    queryKey: ["/api/analyze", missionId!],
    queryFn: async () => {
      const res = await fetch(`/api/analyze/${missionId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error(`${res.status}`);
      return res.json();
    },
    refetchInterval: (query) =>
      query.state.data?.status === "complete" ? false : 2000,
    refetchIntervalInBackground: false,
    enabled: !!missionId,
    staleTime: 0,
  });

  useEffect(() => {
    if (!missionId || !startedAt) return;
    const timer = setTimeout(() => setMissionId(null), 60_000);
    return () => clearTimeout(timer);
  }, [missionId, startedAt]);

  const noWorkersYet =
    !!missionId &&
    startedAt !== null &&
    Date.now() - startedAt > 10_000 &&
    (pollQuery.data?.results?.length ?? 0) === 0;

  const handleSubmit = useCallback(() => {
    if (content.length < 10) return;
    setMissionId(null);
    setStartedAt(null);
    submitMutation.mutate();
  }, [content, submitMutation]);

  const data = pollQuery.data;
  const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "#";

  return (
    <section
      data-testid="section-darylab-try"
      className="py-32 px-6 max-w-5xl mx-auto"
    >
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-12"
      >
        Try DaryLab
      </motion.h2>

      <motion.div {...fadeInUp}>
        <Tabs value={type} onValueChange={setType} className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contract">Contract</TabsTrigger>
            <TabsTrigger value="debate">Debate</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>

          {Object.keys(PLACEHOLDERS).map((key) => (
            <TabsContent key={key} value={key}>
              <Textarea
                placeholder={PLACEHOLDERS[key]}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[140px] text-base"
              />
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex justify-center mt-6">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={content.length < 10 || submitMutation.isPending}
            data-testid="button-analyze"
          >
            {submitMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Analyze with 3 agents
          </Button>
        </div>

        {submitMutation.isError && (
          <p className="text-destructive text-sm text-center mt-4">
            {submitMutation.error.message.includes("503")
              ? "agent-mesh is not reachable. Make sure it's running on port 8000."
              : `Error: ${submitMutation.error.message}`}
          </p>
        )}

        {missionId && (
          <div className="mt-10 space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mission: <code className="text-xs">{missionId}</code>
              </p>
              {data && (
                <Badge
                  variant={
                    data.status === "complete"
                      ? "default"
                      : data.status === "partial"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {data.status}
                </Badge>
              )}
            </div>

            {noWorkersYet && (
              <p className="text-sm text-orange-600 dark:text-orange-400 text-center">
                No workers running. Start agent-mesh workers first.
              </p>
            )}

            {data && data.results.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.results.map((r) => (
                    <Card key={r.agentId} className="p-4">
                      <CardContent className="p-0 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono font-medium truncate mr-2">
                            {r.agentId}
                          </span>
                          {r.sigVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          )}
                        </div>
                        <RiskBadge level={r.riskLevel} />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {r.summary}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-sm font-medium">
                    Consensus:{" "}
                    <span className="text-muted-foreground">
                      {data.consensus ?? "No consensus"}
                    </span>
                  </p>
                  <a
                    href={dashboardUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View DSM Proof →
                  </a>
                </div>
              </>
            )}

            {data &&
              data.status !== "complete" &&
              data.results.length > 0 && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Waiting for remaining agents…
                </div>
              )}
          </div>
        )}
      </motion.div>
    </section>
  );
}
