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
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter text-foreground">
          DSM
        </h1>

        <p className="mt-6 text-2xl md:text-3xl text-muted-foreground font-light tracking-tight">
          Daryl Sharding Memory
        </p>
      </section>

      {/* Intro Section */}
      <section className="py-24 px-6">
        <p className="max-w-3xl mx-auto text-xl text-muted-foreground leading-relaxed text-center">
          A persistent, distributed semantic memory system designed for autonomous agents and multi-session workflows.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          Core Capabilities
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Memory Sharding</h3>
              <p className="text-sm text-muted-foreground">
                Organize knowledge across four semantic domains: system, personal, projects, and shared.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Multi-Agent Coordination</h3>
              <p className="text-sm text-muted-foreground">
                Support for primary, worker, monitor, and sync agents with distributed task execution.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-slate-950 hover:bg-slate-900 transition-colors">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Session Continuity</h3>
              <p className="text-sm text-muted-foreground">
                Persistent knowledge across sessions with append-only event logging and state management.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          Architecture
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-8">Shards</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>system</strong> - DLAM config and automation</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>personal</strong> - User profile and preferences</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>projects</strong> - Tasks, code, and repositories</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>shared</strong> - Facts, entities, and procedures</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-8">Agents</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>daryl-primary</strong> - Main orchestration agent</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>daryl-worker</strong> - Async background processing</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>daryl-monitor</strong> - System health checks</span>
              </li>
              <li className="flex gap-3">
                <span className="font-mono text-white">•</span>
                <span><strong>daryl-sync</strong> - External data synchronization</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold tracking-tight mb-16 text-center">
          Status
        </h2>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 bg-slate-950">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">System Status</span>
                  <span className="text-green-400 font-semibold">Operational</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shards</span>
                  <span className="text-white font-semibold">4 / 4 Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Agents Registered</span>
                  <span className="text-white font-semibold">1 Primary</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-white font-semibold">2026-02-10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
