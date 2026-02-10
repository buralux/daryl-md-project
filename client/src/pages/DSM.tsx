import { useTranslation } from "@/lib/i18n";
import Layout from "@/components/Layout";
import { PageHead } from "@/components/PageHead";
import { Card, CardContent } from "@/components/ui/card";

export default function DSM() {
  const { t } = useTranslation();

  return (
    <Layout>
      <PageHead
        title="DSM - DARYL"
        description="Daryl Sharding Memory - Persistent semantic memory system"
        path="/dsm"
      />

      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-foreground">
          Memory reimagined.
        </h1>

        <p className="mt-8 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight max-w-3xl">
          {t("dsm.hero.subtitle")} — the semantic memory engine powering persistent, intelligent agents.
        </p>

        <p className="mt-12 text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Daryl's flagship product. Distributed knowledge. Append-only certainty. Real-time retrieval.
        </p>
      </section>

      {/* Core Pillars - 3 Bullets */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Shard</div>
            <p className="text-base text-muted-foreground">
              Break down knowledge into four semantic domains: system, personal, projects, and shared.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Index</div>
            <p className="text-base text-muted-foreground">
              Enable fast semantic retrieval with distributed indexing across all shards.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-4">Verify</div>
            <p className="text-base text-muted-foreground">
              Ensure consistency and accuracy with append-only event logging and validation.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works - 4 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          How it works
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Shard Knowledge</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize incoming data into semantic shards. Each shard represents a distinct knowledge domain with its own schema and constraints.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Build Indexes</h3>
                  <p className="text-sm text-muted-foreground">
                    Automatically create semantic indexes for fast retrieval. Indexes remain synchronized with shard state.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verify State</h3>
                  <p className="text-sm text-muted-foreground">
                    Validate data consistency across all shards. Every write is append-only and immutable for auditability.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-bold text-white/60 flex-shrink-0 w-8 h-8 flex items-center justify-center bg-slate-900 rounded">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Retrieve in Context</h3>
                  <p className="text-sm text-muted-foreground">
                    Query knowledge with full context awareness. Results are ranked by semantic relevance and temporal freshness.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Use Cases - 3 Cards */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          Built for autonomous intelligence
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Multi-Agent Coordination</h3>
              <p className="text-sm text-muted-foreground">
                Coordinate distributed agents with shared semantic memory. Each agent reads from context, writes to append-only logs.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Session Continuity</h3>
              <p className="text-sm text-muted-foreground">
                Persist knowledge across sessions. Agents resume work with complete context awareness and learned preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Knowledge Evolution</h3>
              <p className="text-sm text-muted-foreground">
                Watch intelligence grow. Every interaction adds to the knowledge graph. History is preserved. Learning is measurable.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
