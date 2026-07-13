import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Terminal,
  FileWarning,
  Scale,
  Users,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CinematicBackground } from "@/world-integrated/CinematicBackground"; // [experiment/scroll-world-integrated-page]

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

const problems = ["c1", "c2", "c3"] as const;
const dsmCards = [
  { key: "c1", icon: GitBranch },
  { key: "c2", icon: GitBranch },
  { key: "c3", icon: ShieldCheck },
];
const howSteps = ["s1", "s2", "s3", "s4", "s5"] as const;
const useCases = [
  { key: "c1", icon: Scale },
  { key: "c2", icon: ShieldCheck },
  { key: "c3", icon: Users },
];
const phases = ["phase1", "phase2", "phase3", "phase4"] as const;

const GITHUB_URL = "https://github.com/daryl-labs-ai/daryl";

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      {/* Couche cinématique intégrée — derrière le contenu réel, jamais à sa place. */}
      <CinematicBackground />
      <PageHead
        title="DARYL — Trust & audit layer for AI agents"
        description={t("home.hero.description")}
        path="/home"
      />

      {/* HERO */}
      <section
        data-testid="section-hero"
        className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      >
        <span
          aria-hidden
          className="pointer-events-none select-none absolute text-[28vw] font-extrabold tracking-tighter text-foreground/[0.035]"
        >
          DARYL
        </span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-3xl flex flex-col items-center gap-5"
        >
          <Badge variant="outline" className="no-default-hover-elevate font-mono text-xs">
            {t("home.hero.tag")}
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-b from-foreground to-foreground/60 bg-clip-text text-transparent">
            {t("home.hero.title")}
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl">
            {t("home.hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-3 justify-center mt-2">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" data-testid="button-hero-demo">
                {t("home.hero.cta1")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
            <a href="#developers">
              <Button variant="outline" size="lg" data-testid="button-hero-start">
                {t("home.hero.cta2")}
              </Button>
            </a>
          </div>

          <code className="mt-2 font-mono text-sm bg-card border border-card-border rounded-md px-4 py-2 text-foreground">
            <span className="text-muted-foreground">$</span> pip install daryl-dsm
          </code>
        </motion.div>
      </section>

      {/* PROBLEM */}
      <section data-testid="section-problem" className="py-24 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-14 max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.problem.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.problem.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.problem.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((k, i) => (
              <motion.div
                key={k}
                {...stagger}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-7 space-y-3">
                    <FileWarning className="h-7 w-7 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      {t(`home.problem.${k}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`home.problem.${k}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF — terminal */}
      <section data-testid="section-proof" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeInUp}>
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.proof.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.proof.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.proof.subtitle")}
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mt-10 rounded-lg border border-border overflow-hidden text-left font-mono text-sm bg-[hsl(220_10%_6%)]"
          >
            <div className="flex gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="px-6 py-5 leading-loose text-[hsl(220_8%_72%)]">
              <div>
                <span className="text-[hsl(220_8%_50%)]">$</span>{" "}
                <span className="text-white">dsm verify --shard sessions</span>
              </div>
              <div><span className="text-[hsl(220_8%_50%)]">total_entries:</span> 248&nbsp;&nbsp;<span className="text-[hsl(220_8%_50%)]">verified:</span> 247</div>
              <div><span className="text-[hsl(220_8%_50%)]">tampered:</span> <span className="text-[#f87171] font-semibold">1</span>&nbsp;&nbsp;<span className="text-[hsl(220_8%_50%)]">chain_breaks:</span> <span className="text-[#f87171] font-semibold">1</span></div>
              <div><span className="text-[hsl(220_8%_50%)]">status:</span> <span className="text-[#f87171] font-semibold">{t("home.proof.status")}</span></div>
            </div>
          </motion.div>

          <p className="mt-5 text-sm text-muted-foreground">
            {t("home.proof.note")}
          </p>
        </div>
      </section>

      {/* DSM */}
      <section data-testid="section-dsm" className="py-28 px-6 bg-card/40">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.dsm.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.dsm.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.dsm.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dsmCards.map((c, i) => (
              <motion.div
                key={c.key}
                {...stagger}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-7 space-y-3">
                    <span className="font-mono text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold">
                      {t(`home.dsm.${c.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`home.dsm.${c.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-10">
            <Link href="/dsm">
              <Button variant="outline" size="lg" data-testid="button-dsm-cta">
                {t("home.dsm.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" data-testid="section-how" className="py-28 px-6 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.how.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.how.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.how.subtitle")}
            </p>
          </motion.div>

          <div className="divide-y divide-border">
            {howSteps.map((s, i) => (
              <motion.div
                key={s}
                {...stagger}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="flex gap-5 items-start py-5"
              >
                <span className="font-mono text-sm text-primary w-8 flex-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-[15px]">
                  <span className="font-semibold text-foreground">
                    {t(`home.how.${s}.title`)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}— {t(`home.how.${s}.description`)}
                  </span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section
        id="usecases"
        data-testid="section-usecases"
        className="py-28 px-6 bg-card/40 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.usecases.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.usecases.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.usecases.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((c, i) => (
              <motion.div
                key={c.key}
                {...stagger}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-7 space-y-3">
                    <c.icon className="h-7 w-7 text-muted-foreground" />
                    <h3 className="text-lg font-semibold">
                      {t(`home.usecases.${c.key}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`home.usecases.${c.key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEVELOPERS */}
      <section
        id="developers"
        data-testid="section-developers"
        className="py-28 px-6 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-12 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.dev.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.dev.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.dev.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="hover-elevate">
              <CardContent className="p-7 space-y-4">
                <Terminal className="h-7 w-7 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{t("home.dev.c1.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.dev.c1.description")}</p>
                <code className="block font-mono text-sm bg-[hsl(220_10%_6%)] text-white rounded-md px-4 py-2">
                  <span className="text-[hsl(220_8%_50%)]">$</span> dsm verify --shard agent_memory
                </code>
              </CardContent>
            </Card>

            <Card className="hover-elevate">
              <CardContent className="p-7 space-y-4">
                <ShieldCheck className="h-7 w-7 text-muted-foreground" />
                <h3 className="text-lg font-semibold">{t("home.dev.c2.title")}</h3>
                <p className="text-sm text-muted-foreground">{t("home.dev.c2.description")}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["MIT", "1500+ tests", "Python 3.10+", "Goose MCP", "Ed25519", "SHA-256"].map(
                    (p) => (
                      <span
                        key={p}
                        className="font-mono text-xs px-3 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {p}
                      </span>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button data-testid="button-dev-github">
                {t("home.dev.cta1")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section data-testid="section-roadmap" className="py-28 px-6 bg-card/40">
        <div className="max-w-5xl mx-auto">
          <motion.div {...fadeInUp} className="mb-14 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
              {t("home.roadmap.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {t("home.roadmap.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("home.roadmap.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {phases.map((p, i) => (
              <motion.div
                key={p}
                {...stagger}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              >
                <Card className="hover-elevate h-full">
                  <CardContent className="p-6 space-y-2">
                    <span className="font-mono text-xs text-primary">
                      {t(`home.roadmap.${p}.status`)}
                    </span>
                    <h3 className="text-base font-semibold">
                      {t(`home.roadmap.${p}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`home.roadmap.${p}.description`)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeInUp} className="mt-8 text-sm text-muted-foreground max-w-3xl">
            {t("home.roadmap.note")}
          </motion.p>

          <motion.div {...fadeInUp} className="mt-8">
            <Link href="/roadmap">
              <Button variant="outline" data-testid="link-roadmap-full">
                {t("common.viewFullRoadmap")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* VISION / STORY */}
      <section
        data-testid="section-manifesto"
        className="py-32 px-6 max-w-3xl mx-auto text-center"
      >
        <motion.p
          {...fadeInUp}
          className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3"
        >
          {t("home.manifesto.eyebrow")}
        </motion.p>
        <motion.h2
          {...fadeInUp}
          className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
        >
          {t("home.manifesto.title")}
        </motion.h2>
        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-8 text-xl text-muted-foreground leading-relaxed"
        >
          {t("home.manifesto.text")}
        </motion.p>
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-10"
        >
          <Link href="/vision">
            <Button variant="outline" size="lg" data-testid="link-manifesto-cta">
              {t("home.manifesto.cta")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </Layout>
  );
}
