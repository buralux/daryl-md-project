import type { Express } from "express";
import { log } from "../index";

const AGENT_MESH_URL =
  process.env.AGENT_MESH_API_BASE_URL ?? "http://localhost:8000";

const MESH_TIMEOUT = 30_000;

async function meshFetch(path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), MESH_TIMEOUT);
  const url = `${AGENT_MESH_URL}${path}`;
  log(`meshFetch: ${init?.method ?? "GET"} ${url}`);
  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } finally {
    clearTimeout(timer);
  }
}

function extractSummary(content: unknown): string {
  try {
    if (typeof content === "string") {
      const parsed = JSON.parse(content);
      const text =
        parsed?.summary ||
        parsed?.answer?.summary ||
        parsed?.full ||
        JSON.stringify(parsed);
      return String(text).slice(0, 200);
    }
    if (typeof content === "object" && content !== null) {
      const obj = content as Record<string, unknown>;
      const text = obj.summary || obj.full || JSON.stringify(obj);
      return String(text).slice(0, 200);
    }
    return String(content).slice(0, 200);
  } catch {
    return String(content).slice(0, 200);
  }
}

function extractRiskLevel(content: unknown): string | null {
  const text =
    typeof content === "string" ? content : JSON.stringify(content ?? "");
  const match = text.match(/\b(HIGH|MEDIUM|LOW)\b/i);
  return match ? match[1].toUpperCase() : null;
}

const TASK_CAPS: Record<string, string[]> = {
  general: ["analysis_claude", "analysis_gpt4", "analysis_glm"],
  contract: ["analysis_claude", "analysis_gpt4", "analysis_glm"],
  debate: ["analysis_claude", "analysis_gpt4", "analysis_glm"],
  research: ["analysis_claude", "analysis_gpt4", "analysis_glm"],
};

export function registerAnalyzeRoutes(app: Express) {
  app.post("/api/analyze", async (req, res) => {
    const { content, type } = req.body as {
      content?: string;
      type?: string;
    };

    if (!content || content.length < 10) {
      return res
        .status(422)
        .json({ error: "content must be at least 10 characters" });
    }

    const analysisType = type && TASK_CAPS[type] ? type : "general";

    try {
      const missionRes = await meshFetch("/missions", {
        method: "POST",
        body: JSON.stringify({
          title: `DaryLab ${analysisType} analysis`,
          description: content,
          metadata: { created_by: "darylab", analysis_type: analysisType },
        }),
      });

      if (!missionRes.ok) {
        const errBody = await missionRes.text();
        log(`agent-mesh /missions error ${missionRes.status}: ${errBody}`);
        return res.status(502).json({ error: "Failed to create mission" });
      }

      const mission = (await missionRes.json()) as { mission_id: string };
      const caps = TASK_CAPS[analysisType];

      const taskIds: string[] = [];
      const prompt = `You are an expert analyst. Analyze the following content.

Rules:
- Be concise and factual
- Focus only on what matters
- Do NOT give tutorials or how-to guides

Respond STRICTLY in this JSON format (no markdown, no explanation outside JSON):
{
  "risk_level": "HIGH|MEDIUM|LOW",
  "summary": "one sentence max",
  "top_risks": ["risk 1", "risk 2", "risk 3"]
}

Content to analyze:
${content}`;

      await Promise.all(
        caps.map(async (cap) => {
          const taskRes = await meshFetch("/tasks", {
            method: "POST",
            body: JSON.stringify({
              mission_id: mission.mission_id,
              task_type: "analysis",
              payload: {
                objective: prompt,
                required_capabilities: [cap],
                constraints: { max_output_tokens: 600, output_format: "json" },
              },
            }),
          });
          if (taskRes.ok) {
            const task = (await taskRes.json()) as { task_id: string };
            taskIds.push(task.task_id);
          }
        })
      );

      return res.status(201).json({ missionId: mission.mission_id, taskIds });
    } catch (err: any) {
      if (err.name === "AbortError") {
        log(`analyze timeout: agent-mesh did not respond within ${MESH_TIMEOUT}ms`);
        return res.status(503).json({ error: "agent-mesh timeout" });
      }
      log(`analyze error: ${err.message}`);
      return res.status(503).json({ error: `agent-mesh error: ${err.message}` });
    }
  });

  app.get("/api/analyze/:missionId", async (req, res) => {
    const { missionId } = req.params;

    try {
      const bridgeRes = await meshFetch(
        `/bridge/context?scope=mission:${missionId}&consumer_agent_id=darylab`
      );

      if (!bridgeRes.ok) {
        return res.json({
          status: "pending",
          results: [],
          consensus: null,
          eventCount: 0,
        });
      }

      const bridge = (await bridgeRes.json()) as {
        proven_memory?: { facts?: any[] };
        raw_event_count?: number;
      };

      const facts = bridge.proven_memory?.facts ?? [];
      const submissions = facts.filter((f: any) => f.type === "submission");

      const deduplicated = new Map<string, any>();
      for (const f of submissions) {
        deduplicated.set(f.agent_id, f);
      }

      const results = Array.from(deduplicated.values()).map((f) => ({
        agentId: f.agent_id ?? "unknown",
        sigVerified: true,
        summary: String(f.text ?? "").slice(0, 200),
        riskLevel: extractRiskLevel(f.text),
      }));

      const riskLevels = results
        .map((r) => r.riskLevel)
        .filter((r): r is string => r !== null);

      let consensus: string | null = null;
      if (riskLevels.length > 0) {
        const counts: Record<string, number> = {};
        for (const lvl of riskLevels) {
          counts[lvl] = (counts[lvl] || 0) + 1;
        }
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        if (sorted[0][1] > 1) {
          consensus = `${sorted[0][1]}/${results.length} ${sorted[0][0]}`;
        }
      }

      const expectedAgents = 2;
      let status: string;
      if (results.length === 0) status = "pending";
      else if (results.length < expectedAgents) status = "partial";
      else status = "complete";

      return res.json({
        status,
        results,
        consensus,
        eventCount: bridge.raw_event_count ?? 0,
      });
    } catch (err: any) {
      if (err.name === "AbortError") {
        return res.status(503).json({ error: "agent-mesh unavailable" });
      }
      log(`analyze poll error: ${err.message}`);
      return res.status(503).json({ error: "agent-mesh unavailable" });
    }
  });
}
