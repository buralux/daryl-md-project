# DARYL Web ↔️ DSM Local Integration

**Status**: Roadmap for future integration  
**Date**: 2026-02-10

---

## Overview

The DARYL platform consists of two interconnected systems:

### 1. **daryl.md** (Production Website)
- Public-facing website
- Location: `c:\Users\bural\daryl-web-local`
- Repository: `buralux/daryl-md-project`
- Tech: React + Express + Vite

### 2. **DSM** (Local Semantic Memory)
- Internal knowledge system
- Location: `c:\Users\bural\MEMORY`
- Repository: `buralux/daryl-sharding-memory`
- Tech: PowerShell + JSON + Drizzle ORM

---

## Integration Opportunities

### 🔄 Current State: Separate

```
daryl-web-local/          DSM/
├── client/       (UI)    ├── dlam_orchestrator.ps1
├── server/       (API)   ├── shard_manager.ps1
└── shared/       (types) ├── facts.json
                          ├── entities.json
                          └── events.jsonl
```

### 🎯 Future: Connected

```
shared-backend/
├── daryl-md-project/     (public site)
│   ├── client/           (React UI)
│   ├── server/           (Express)
│   └── api/              (contact form)
│
└── models/               (connects to DSM)
    ├── agent-api.ts      (DLAM orchestration)
    ├── knowledge.ts      (facts + entities)
    ├── events.ts         (event logging)
    └── procedures.ts     (reusable workflows)
```

---

## Implementation Phases

### Phase 0: Current (Q1 2026)
- ✅ Local website development
- ✅ DSM semantic memory system
- ⚠️ Completely separate

### Phase 1: Integration Layer (Q2 2026)
- [ ] API bridge between web and DSM
- [ ] Read-only facts/entities on website
- [ ] DLAM orchestration from web API
- [ ] Contact form → Events log

### Phase 2: Dynamic Content (Q3 2026)
- [ ] Blog from `shared/` shard
- [ ] Product specs from `facts.json`
- [ ] Agent info from `entities.json`
- [ ] Real-time updates via WebSocket

### Phase 3: Advanced (Q4 2026)
- [ ] User session tracking
- [ ] Personalization via DSM
- [ ] Multi-agent coordination visible on site
- [ ] Public agent showcase

---

## Technical Integration Points

### 1. Contact Form → Events Log

**Current Flow:**
```
Contact Form (web) → Express API → In-memory storage
```

**Future Flow:**
```
Contact Form (web) 
  → Express API 
  → DSM/events.jsonl (append)
  → DLAM orchestrator pickup
  → Agent response workflow
```

### 2. Public Knowledge Base

**Expose from DSM:**
```typescript
// server/routes.ts
GET /api/facts       → shards/shared/facts.json
GET /api/entities    → shards/shared/entities.json
GET /api/procedures  → shards/shared/procedures.json
GET /api/events      → shards/shared/events.jsonl (recent)
```

**Use on Website:**
```typescript
// client/pages/Universe.tsx or new /knowledge page
const facts = useQuery('facts', () => fetch('/api/facts'))
const entities = useQuery('entities', () => fetch('/api/entities'))
// Display as Knowledge Graph or Timeline
```

### 3. Agent Capabilities Display

**From DSM entities.json to web:**
```json
{
  "agents": [
    {
      "id": "daryl-primary",
      "capabilities": ["memory", "coordination", "execution"],
      "status": "active"
    }
  ]
}
```

**Display on `/agents` page with real-time status:**
```tsx
// client/pages/Agents.tsx
const agents = useQuery('agents', () => fetch('/api/agents/status'))
```

### 4. System Health Dashboard

**Real-time monitoring:**
```typescript
// server/routes.ts
GET /api/system/health → Query DSM shards status
GET /api/system/events → Recent event logs
```

**Optional admin page:**
```typescript
// client/pages/SystemStatus.tsx (protected)
Dashboard showing:
- Shard status (system, personal, projects, shared)
- Agent status (primary, worker, monitor, sync)
- Recent events
- Memory usage
```

---

## Data Flow Architecture

### Scenario: Contact Form Submission

```
1. User submits contact form
   ↓
2. client/Contact.tsx sends POST /api/contact
   ↓
3. server/routes.ts receives data
   ↓
4. Validate with shared/schema.ts (Zod)
   ↓
5. Write to DSM:
   - shards/shared/events.jsonl (append)
   - OR trigger DLAM orchestrator
   ↓
6. Response to user (thank you message)
   ↓
7. Agent picks up from events
   ↓
8. Agent processes + responds
```

---

## File Mappings

### DSM Knowledge → Website Display

| DSM File | Website Use |
|----------|------------|
| `facts.json` | Knowledge graph, timeline |
| `entities.json` | Agent profiles, resources |
| `events.jsonl` | Activity feed, real-time updates |
| `procedures.json` | Workflow documentation |
| `profile.md` | Agent capabilities page |
| `DLAM_MEMORY_SYSTEM.md` | Technical documentation |

### Website Configuration → DSM Input

| Website File | DSM Integration |
|-------------|-----------------|
| `client/lib/translations/` | Fact translations |
| `client/pages/Products.tsx` | Product metadata |
| `server/routes.ts (contact)` | Event logging |
| `.env` variables | DSM config |

---

## API Endpoints (Future)

### Read-Only (public)
```
GET  /api/facts        - Semantic knowledge base
GET  /api/entities     - Named entities + profiles
GET  /api/procedures   - Reusable workflows
GET  /api/agents/status - Agent availability
GET  /api/system/health - System status
```

### Append-Only (tracked)
```
POST /api/contact      - Contact form submission
POST /api/events       - Direct event logging (if needed)
```

### Protected (future auth)
```
GET  /api/admin/dashboard - System monitoring
GET  /api/admin/events     - Full event history
POST /api/admin/sync       - Manual DSM sync
```

---

## Environment Variables

**Current** (`daryl-web-local/.env`):
```
NODE_ENV=development
PORT=5000
```

**Future** (add for DSM integration):
```
DSM_PATH=../MEMORY
DSM_ENABLED=true
DSM_SOCKET=\\.\pipe\dsm-ipc (Windows IPC)
EVENTS_LOG=shards/shared/events.jsonl
SYNC_INTERVAL=30000 (ms)
```

---

## WebSocket Considerations

For real-time updates between web and DSM:

```typescript
// server/index.ts
import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ server: httpServer })

wss.on('connection', (ws) => {
  // Subscribe to DSM events
  // Push events to client in real-time
  
  // Could use:
  // - File watching (chokidar)
  // - IPC (Windows named pipes)
  // - Polling events.jsonl
})
```

---

## Security Considerations

### What NOT to expose publicly:
```
❌ Full events.jsonl (privacy)
❌ System shard (credentials?)
❌ Personal shard (user data)
❌ Raw agent states
```

### What TO expose:
```
✅ Public procedures
✅ Published facts
✅ Agent capabilities (no internals)
✅ System health (aggregate only)
✅ Recent non-sensitive events
```

### Authentication for admin:
```
- Stack Auth (mentioned in DSM profile)
- JWT tokens
- Secure session management
```

---

## Development Workflow

### For local dev (now):
```powershell
# Terminal 1: Website
cd c:\Users\bural\daryl-web-local
npm run dev

# Terminal 2: DSM services (optional observation)
cd c:\Users\bural\MEMORY
. .\shard_manager.ps1
Get-ShardStatus
```

### For integration (later):
```powershell
# Unified startup script
.\start-integrated-system.ps1
  ├── Start DSM services
  ├── Initialize shards
  ├── Start web server
  └── Setup WebSocket bridge
```

---

## Next Steps

1. ✅ Local website ready
2. ✅ DSM system ready
3. ⏭️ **Analyze** both systems in production
4. ⏭️ **Design** integration API
5. ⏭️ **Implement** bridge layer
6. ⏭️ **Test** data flow end-to-end
7. ⏭️ **Deploy** connected system
8. ⏭️ **Monitor** real-time events

---

## Collaboration Points

### With DLAM/Rabbit R1:
- DSM tracks session history
- Website provides user input
- Agent processes via orchestrator
- Results feed back to site

### With multi-agent system:
- daryl-primary: Coordinates orchestration
- daryl-worker: Background processing of web events
- daryl-monitor: System health endpoint
- daryl-sync: Git sync of website changes

---

**Architecture**: Converged  
**Timeline**: Q2-Q4 2026  
**Complexity**: Medium-High  
**Priority**: High for advanced features

---

*For detailed DSM docs, see: `c:\Users\bural\MEMORY\DLAM_MEMORY_SYSTEM.md`*  
*For website docs, see: `c:\Users\bural\daryl-web-local\DEV_GUIDE.md`*
