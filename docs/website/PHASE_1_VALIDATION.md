# Phase 1 — Validation autonome (faits, 2026-07-13)

Environnement principal : artefact construit exact (`dist/public`) servi par `vite preview`
(localhost:4173) + navigateur intégré. Preview Vercel : déployée (env=Preview) mais
**l'accès visuel est bloqué par Vercel Deployment Protection** (login requis) — même artefact
validé localement ; cette distinction est assumée dans tout ce document.

## Vérifié (objectif)

| Scénario | Résultat |
|---|---|
| Continuité de la couche pendant navigation | Marqueur DOM posé sur le stage : **survit** aux changements de route (le nœud n'est jamais recréé) |
| 10 navigations rapides successives | 1 seul stage, 1 seul `.life-field`, 1 seul `.life-line`, `data-motion` retombé à `ambient`, pas d'accumulation DOM (358 nœuds sur /home) |
| États | `ambient` par défaut → `transitional` pendant ~900ms au changement de route → retour `ambient` (observé en séquence) |
| Pause onglet caché | Listener fonctionnel : `visibilitychange` → `data-hidden` → `animation-play-state: paused` (observé). Particularité d'outillage : le pane intégré ne dispatch pas l'événement à son propre changement d'onglet (dispatch manuel vérifié) ; les navigateurs réels le font. |
| Thèmes | Sombre : ligne ambre rgba(232,184,122,0.34) ; clair : ligne graphite rgba(24,26,30,0.20) — bascule vérifiée par styles calculés + captures |
| Lisibilité du contenu | Captures light/dark : contenu intact, aucun texte au-dessus du stage, aucune régression de contraste |
| Pointeur/focus/a11y | `pointer-events: none`, `aria-hidden`, jamais focusable (styles calculés) |
| Console | 0 erreur sur le balayage complet |
| Overflow | Aucun (stage `overflow-hidden`, routes balayées à 1280×800 et 375×812) |
| Zoom ~200% (approximation font-size) | Pas d'overflow horizontal |
| Checks | tsc ✓, i18n ✓ (261=261), build + prerender 14 routes + sitemap + robots ✓ |

## Non vérifié ici (honnêteté du protocole)
- **Preview Vercel visuellement** (auth requise — propriétaire seulement).
- **Émulation OS reduced-motion**, VoiceOver/NVDA, appareils physiques, batterie réelle.
- **« 5 minutes sans fatigue visuelle »** et la justesse perçue de l'amplitude (0.34/0.20) :
  jugement humain — c'est LA décision créative ouverte de cette phase.
- Lighthouse sur CDN réel.

## Défauts trouvés et corrigés pendant la validation
- Amplitude initiale de la ligne (0.22 sombre) jugée trop discrète en revue visuelle → 0.34
  (toujours quiet). Aucun autre défaut matériel trouvé.
