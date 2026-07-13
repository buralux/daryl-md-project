# Phase 1 — Implémentation (ce qui existe réellement)

## Fichiers modifiés
- `client/src/world/ExperienceShell.tsx` — le shell Phase 0 gagne : capacités
  (`useExperienceCapabilities` : reduced-motion réactif + save-data), machine d'états
  `static|ambient|transitional` (`data-motion`), réponse de route via `useLocation` (wouter,
  hook par défaut hors Router), pause onglet caché (`visibilitychange` → `data-hidden`),
  timers/listeners nettoyés. Rendu : `.life-field` + `.life-line` dans le stage.
- `client/src/index.css` — bloc « PHASE 1 — REGISTRE VIE » : variables thème
  (`--life-glow`, `--life-line` + alphas clair/sombre), les deux éléments, deux keyframes,
  règles d'état, pause `data-hidden`.

## Dépendances ajoutées
**Aucune.** CSS pur pour l'animation (compositor : opacity uniquement, pas de blur/filter),
React déjà présent pour l'orchestration d'état.

## Cycle de vie (exigences du protocole)
- Le shell est monté une fois, au-dessus du Router → pas de double enregistrement possible.
- `visibilitychange` : ajouté/retiré dans un même effet ; `settleTimer` cleared en cleanup.
- Onglet caché : `data-hidden` → `animation-play-state: paused` (zéro travail d'animation).
- Reduced-motion : double ceinture — `MotionConfig reducedMotion="user"` (Phase 0) +
  la règle CSS globale + l'état `static` explicite.
- SSR/prerender : le markup du stage est rendu statiquement ; défauts conservateurs
  (`static`) au premier rendu — pas d'appel matchMedia côté Node.
- Aucune interception pointeur/focus (`pointer-events: none`), hors arbre a11y (`aria-hidden`).
- Sans JS : le HTML prérendu contient le stage ; les animations CSS jouent, ne prétendent rien,
  et l'ensemble du contenu reste lisible (le contenu ne dépend jamais du stage).

## Coût mesuré (build)
| Artéfact | Avant (main 0ab0cc7) | Après | Δ |
|---|---|---|---|
| JS | 616.55 kB (gzip 186.59) | 617.57 kB (gzip 186.88) | **+1.02 kB / +0.29 gzip** |
| CSS | 80.11 kB (gzip 13.17) | 81.50 kB (gzip 13.60) | **+1.39 kB / +0.43 gzip** |
| Requêtes | inchangé (aucun asset ajouté) | | 0 |
