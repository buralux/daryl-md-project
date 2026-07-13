# Phase 0 — Baseline du dépôt (faits constatés)

Constaté sur `main` @ `1270e14` (base de la branche `world/phase-0`), le 2026-07-13.

## Framework & versions (package.json)
- React 18.3.1 + React DOM 18.3.1, TypeScript 5.6.3, Vite 7.3.0
- Router : wouter 3.3.5 (client-side, SPA)
- UI : Tailwind CSS 3.4.17 + shadcn/ui (suite Radix complète), lucide-react, framer-motion 11.18.2
- Data : @tanstack/react-query 5.60.5 (installé, peu utilisé), drizzle-orm + pg (câblés, non utilisés par le site public)
- Serveur : Express 5 (`server/`) — utilisé en dev local et pour un hosting node ; **le déploiement Vercel est statique** (dist/public)
- `.replit` + plugins Replit en dev : le projet a été bootstrappé sur Replit

## Routes (client/src/App.tsx, wouter)
`/` (Teaser vidéo) · `/home` · `/vision` · `/products` · `/products/darylab` · `/lab` · `/agents`
· `/roadmap` · `/universe` · `/dsm` · `/contact` · `/cookies` · `/privacy` · `/terms` · 404

Particularité : `/` rend le Teaser côté client, mais le HTML statique prérendu de `/` contient le
contenu de `/home` (choix SEO délibéré, commenté dans `script/prerender.ts`).

## Composants
- `components/` : Header (nav + Sheet mobile), Footer, Layout (Header/main/Footer + scroll-to-top),
  Logo (animé framer-motion), PageHead (title/meta client-side)
- `components/ui/` : ~45 composants shadcn générés ; seuls quelques-uns sont importés
  (button, sheet, card, toast/toaster, tooltip…). Les non-importés (chart→recharts,
  carousel→embla…) sont tree-shakés : **aucun coût bundle**.
- Pages : Home 479 lignes, DaryLab 804 (la plus grosse), DSM 346, autres < 200.

## Styling
- Tailwind + variables HSL dans `client/src/index.css` (light + dark), `.dark` sur `<html>`
- Fonts : Inter via Google Fonts (axe complet 100..900, requête externe), SF Mono en mono (font système)
- Thème : provider maison (`lib/theme.tsx`), défaut dark, persistance localStorage

## Animation
- framer-motion : fade-in-up à l'entrée des sections (pattern `fadeInUp` répété par page), Logo animé
- 1 keyframe CSS (`shimmer`)
- **Baseline : aucun respect de `prefers-reduced-motion`** (corrigé en Phase 0)

## Pipeline assets & build (`script/build.ts`)
1. `vite build` → `dist/public` (client)
2. `vite build --ssr src/entry-server.tsx` → `dist/ssr` (uniquement pour le prérendu)
3. `script/prerender.ts` : `renderToString` par route → HTML statique par route dans `dist/public`
4. `esbuild server/index.ts` → `dist/index.cjs` (non utilisé par Vercel)

## i18n (`lib/i18n.tsx` + `lib/translations/{en,fr}.ts`)
- EN/FR à clés plates, `t()` avec fallback = clé, persistance localStorage, défaut EN
- Lint dédié : `npm run check:i18n` (orphelins/manquants). Baseline : 249=249 clés, 0 orphelin
- **Baseline : `<html lang>` restait "en" même en FR** (corrigé en Phase 0)

## SEO (baseline)
- Prérendu par route avec title/description/og/canonical — MAIS `SITE = daryl-md-project.vercel.app`
  → **canonicals pointaient vers le domaine vercel.app, pas www.daryl.md** (corrigé)
- Meta de base `client/index.html` : ancien positionnement marketing obsolète ("intelligence layer
  for modern workflows"), title "Daryl" (corrigé)
- **Pas de sitemap.xml ni robots.txt** (ajoutés en Phase 0)
- Pas d'og:image (différé — nécessite un asset de marque, génération d'images interdite en Phase 0)

## Accessibilité (baseline) — voir PHASE_0_ACCESSIBILITY.md
- `maximum-scale=1` bloquait le zoom (corrigé) ; pas de skip-link (ajouté) ; boutons icône sans
  aria-label (corrigés) ; `<a>` imbriqué dans `<a>` au Header/Logo (corrigé) ; 404 template
  développeur cassée en dark (remplacée) ; aucun reduced-motion (corrigé)

## Performance (baseline) — voir PHASE_0_PERFORMANCE.md
- JS : 647.82 kB (194.96 kB gzip), un seul chunk. CSS : ~80 kB (13 kB gzip)
- Teaser : MP4 2.4 MB en autoplay sur `/`
- Prérendu : 14 routes, 9.7–33.4 kB HTML

## Déploiement — voir PHASE_0_DEPLOYMENT.md
- `vercel.json` : build `npm run build`, output `dist/public`, rewrite SPA `/(.*)→/index.html`
- Pas de `.vercel/` local ni de CLI Vercel : déploiement via l'intégration Git
  (github.com/buralux/daryl-md-project)
- Production derrière Cloudflare (`server: cloudflare`, `cf-ray` observés sur www.daryl.md)
- Env : `.env.example` documente `AGENT_MESH_API_BASE_URL`, `VITE_DASHBOARD_URL` (non inspectées,
  non exposées)

## Défaut préexistant découvert en validation autonome (2026-07-13) — NON corrigé en Phase 0

**Le formulaire de contact est cassé en production statique.** `client/src/pages/Contact.tsx:42`
fait `POST /api/contact`, mais le déploiement Vercel est purement statique (`dist/public`) : aucune
API n'existe. Vérifié empiriquement sur l'artefact construit : `POST /api/contact` → **404** ; le
visiteur qui soumet le formulaire obtient une erreur et son message est perdu. Défaut présent sur
`main` (préexistant, sans lien avec la Phase 0). **Différé** : la correction exige une décision
produit — fonction serverless Vercel, service de formulaire tiers, ou repli `mailto:` (l'adresse
hello@daryl.md est déjà affichée sur la page). À trancher par le propriétaire du produit.

## Checks existants (baseline, tous verts)
- `npm run check` (tsc) : ✓ · `npm run check:i18n` : ✓ · `npm run build` : ✓
- Aucun test unitaire/e2e configuré dans ce dépôt (fait, pas un reproche — noté pour les phases futures)
