import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

function RiskBadge({ level, delay = 0 }: { level: string | null; delay?: number }) {
  if (!level) return <Badge variant="outline" className="text-muted-foreground">—</Badge>;
  const colors: Record<string, string> = {
    HIGH: "bg-red-500/10 text-[#ef4444] border-red-500/30",
    MEDIUM: "bg-amber-500/10 text-[#f59e0b] border-amber-500/30",
    LOW: "bg-green-500/10 text-[#22c55e] border-green-500/30",
  };
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22, delay }}
    >
      <Badge variant="outline" className={colors[level] ?? ""}>
        {level}
      </Badge>
    </motion.div>
  );
}

/* ── Flow Diagram: Input → Agents → AI-Bridge → Consensus → DSM ── */

const FLOW_CYCLE = 5000;

function FlowDiagram() {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    let start = performance.now();
    let raf: number;
    const tick = () => { setElapsed((performance.now() - start) % FLOW_CYCLE); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const inPause = elapsed > 3500;
  const lit = (ms: number) => !inPause && elapsed >= ms;
  const pulse = (ms: number) => lit(ms) && elapsed < ms + 600;

  const n = (on: boolean, bigger?: boolean) =>
    `${bigger ? "px-2.5 py-1.5 md:px-3 md:py-2" : "px-2 py-1 md:px-2.5 md:py-1.5"} rounded-md border text-[10px] md:text-xs font-mono whitespace-nowrap transition-all duration-300 ${
      on ? "border-foreground/50 bg-foreground/5 text-foreground" : "border-border/15 text-muted-foreground/15"
    }`;

  const Arrow = ({ on }: { on: boolean }) => (
    <svg width="18" height="8" viewBox="0 0 18 8" className="shrink-0">
      <path d="M0 4 L14 4 M12 1 L16 4 L12 7" fill="none" stroke="currentColor" strokeWidth="1.2"
        className="text-muted-foreground" style={{ opacity: on && !inPause ? 0.5 : 0.08, transition: "opacity 0.3s" }} />
    </svg>
  );

  return (
    <div className="flex items-center justify-center py-5 max-w-[680px] mx-auto overflow-x-auto">
      <div className="flex items-center gap-1">
        <div className={n(lit(0))}>Input</div>
        <Arrow on={lit(300)} />
        <div className="flex flex-col gap-0.5">
          <div className={n(lit(400))}>Claude</div>
          <div className={n(lit(550))}>GPT-4</div>
          <div className={n(lit(700))}>GLM</div>
        </div>
        <Arrow on={lit(1100)} />
        <div className={`${n(pulse(1400), true)} ${pulse(1400) ? "ring-1 ring-foreground/20" : ""}`}>AI-Bridge</div>
        <Arrow on={lit(1900)} />
        <div className={n(lit(1900))}>Consensus</div>
        <Arrow on={lit(2300)} />
        <div className={n(lit(2300))}>DSM ✓</div>
      </div>
    </div>
  );
}

/* ── Skeleton ── */

function SkeletonShimmer() {
  return (
    <div className="space-y-2.5 mt-1">
      <div className="h-3 w-14 rounded bg-muted-foreground/10 animate-shimmer" />
      <div className="h-3 w-full rounded bg-muted-foreground/10 animate-shimmer [animation-delay:80ms]" />
      <div className="h-3 w-3/4 rounded bg-muted-foreground/10 animate-shimmer [animation-delay:160ms]" />
    </div>
  );
}

/* ── Agent Card ── */

function AgentCard({
  agentId, status, riskLevel, content, sigVerified, index,
}: {
  agentId: string; status: "pending" | "complete"; riskLevel: string | null;
  content: string; sigVerified: boolean; index: number;
}) {
  const topRisks = (() => {
    if (!content) return [];
    const m = content.match(/— (.+)$/);
    return m ? m[1].split(", ").filter(Boolean) : [];
  })();
  const summaryText = content.replace(/ — .+$/, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: status === "pending" ? index * 0.1 : 0 }}
    >
      <Card className="p-4 h-full relative overflow-hidden">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-mono font-medium truncate mr-2">{agentId}</span>
            {status === "complete" ? (
              sigVerified ? <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          : <XCircle className="h-4 w-4 text-red-500 shrink-0" />
            ) : (
              <div className="relative flex items-center">
                <motion.div
                  className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-muted-foreground/40"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground shrink-0" />
              </div>
            )}
          </div>

          {status === "complete" ? (
            <>
              <RiskBadge level={riskLevel} delay={0.1} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {summaryText}
              </motion.p>
              {topRisks.length > 0 && (
                <ul className="space-y-1">
                  {topRisks.map((risk, ri) => (
                    <motion.li
                      key={ri}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.25 + ri * 0.07 }}
                      className="text-xs text-muted-foreground/80 pl-2 border-l border-muted-foreground/20"
                    >
                      {risk}
                    </motion.li>
                  ))}
                </ul>
              )}
            </>
          ) : (
            <>
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs text-muted-foreground/50 italic"
              >
                Waiting for agent…
              </motion.p>
              <SkeletonShimmer />
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ── AI-Bridge Block ── */

function AIBridgeBlock({ status, consensus }: { status: string; consensus: string | null }) {
  const allDone = status === "complete";
  const hasResults = status === "partial" || status === "complete";

  if (!hasResults && status !== "pending") return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
    >
      {/* Connecting line */}
      <motion.div
        className="h-px w-full overflow-hidden mb-4"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ originX: 0 }}
      >
        <div className="h-px bg-border w-full" />
      </motion.div>

      <div className="rounded-lg border border-border/50 bg-muted/30 px-4 py-3 space-y-2">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
          AI-Bridge
        </p>
        {!allDone ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            <motion.span
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm text-muted-foreground"
            >
              Waiting for all responses…
            </motion.span>
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {consensus
              ? `Synthesis complete — ${consensus} agents agree on the risk level.`
              : "All agents responded. No clear consensus on risk level."}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

/* ── Consensus Block ── */

function ConsensusBlock({ consensus }: { consensus: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
    >
      {/* Animated separator */}
      <motion.div
        className="h-px w-full overflow-hidden mb-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        style={{ originX: 0 }}
      >
        <div className="h-px bg-border w-full" />
      </motion.div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Consensus:</span>
        {consensus ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.5 }}
          >
            <Badge variant="secondary" className="font-mono text-xs">
              {consensus}
            </Badge>
          </motion.div>
        ) : (
          <span className="text-sm text-muted-foreground">No consensus</span>
        )}
      </div>
    </motion.div>
  );
}

/* ── DSM Proof Block ── */

function ProofBlock({ dashboardUrl, eventCount }: { dashboardUrl: string; eventCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
      className="rounded-lg border border-green-500/20 bg-green-500/5 px-4 py-3 space-y-2"
    >
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 }}
          className="flex items-center gap-2"
        >
          <span className="text-base">🔐</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            Stored in DSM
          </span>
        </motion.div>
        <motion.a
          href={dashboardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-primary hover:underline underline-offset-4"
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
        >
          View DSM Proof →
        </motion.a>
      </div>
      {eventCount > 0 && (
        <p className="text-xs text-muted-foreground font-mono">
          {eventCount} events · hash-chained · Ed25519 signed
        </p>
      )}
    </motion.div>
  );
}

const EXPECTED_AGENTS = ["agent_claude_prod", "agent_gpt4_prod", "agent_glm_prod"];

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
    Date.now() - startedAt > 15_000 &&
    (pollQuery.data?.results?.length ?? 0) === 0;

  const handleSubmit = useCallback(() => {
    if (content.length < 10) return;
    setMissionId(null);
    setStartedAt(null);
    submitMutation.mutate();
  }, [content, submitMutation]);

  const data = pollQuery.data;
  const dashboardUrl = import.meta.env.VITE_DASHBOARD_URL || "#";
  const completedIds = new Set((data?.results ?? []).map((r) => r.agentId));

  return (
    <section
      data-testid="section-darylab-try"
      className="py-32 px-6 max-w-5xl mx-auto"
    >
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-center mb-4"
      >
        Try DaryLab
      </motion.h2>

      <FlowDiagram />

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

        <div className="flex flex-col items-center mt-6 gap-2">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={content.length < 10 || submitMutation.isPending}
            data-testid="button-analyze"
            className={submitMutation.isPending ? "opacity-60 cursor-not-allowed" : ""}
          >
            {submitMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Analyze with 3 agents
          </Button>
          <AnimatePresence>
            {submitMutation.isPending && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-muted-foreground"
              >
                Sending to agents…
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {submitMutation.isError && (
          <p className="text-destructive text-sm text-center mt-4">
            {submitMutation.error.message.includes("503")
              ? "agent-mesh is not reachable. Check server status."
              : `Error: ${submitMutation.error.message}`}
          </p>
        )}

        <AnimatePresence>
          {missionId && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Mission: <code className="text-xs">{missionId}</code>
                </p>
                {data && (
                  <motion.div
                    animate={
                      data.status === "pending"
                        ? { opacity: [0.5, 1, 0.5] }
                        : { opacity: 1 }
                    }
                    transition={
                      data.status === "pending"
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : {}
                    }
                  >
                    <Badge
                      variant={
                        data.status === "complete"
                          ? "default"
                          : data.status === "partial"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {data.status === "pending" ? "Analyzing…" : data.status}
                    </Badge>
                  </motion.div>
                )}
              </div>

              {noWorkersYet && (
                <p className="text-sm text-orange-600 dark:text-orange-400 text-center">
                  Waiting for workers to respond…
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {EXPECTED_AGENTS.map((agentId, i) => {
                  const result = (data?.results ?? []).find((r) => r.agentId === agentId);
                  return (
                    <AgentCard
                      key={agentId}
                      agentId={agentId}
                      status={result ? "complete" : "pending"}
                      riskLevel={result?.riskLevel ?? null}
                      content={result?.summary ?? ""}
                      sigVerified={result?.sigVerified ?? false}
                      index={i}
                    />
                  );
                })}
              </div>

              {/* AI-Bridge: visible as soon as any result arrives */}
              {data && data.results.length > 0 && (
                <AIBridgeBlock status={data.status} consensus={data.consensus} />
              )}

              {/* Pending: grayedout bridge placeholder */}
              {missionId && (!data || data.results.length === 0) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="rounded-lg border border-border/30 bg-muted/10 px-4 py-3"
                >
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground/40 font-medium">AI-Bridge</p>
                  <p className="text-xs text-muted-foreground/30 mt-1">Waiting for responses…</p>
                </motion.div>
              )}

              {/* Consensus + Proof: only when complete */}
              {data && data.status === "complete" && (
                <>
                  <ConsensusBlock consensus={data.consensus} />
                  <ProofBlock
                    dashboardUrl={dashboardUrl}
                    eventCount={data.eventCount}
                  />
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
