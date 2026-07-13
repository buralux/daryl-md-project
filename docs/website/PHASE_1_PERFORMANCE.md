# Phase 1 — Performance (mesures)

## Bundle (npm run build, même machine)
- JS : 616.55 → **617.57 kB** (gzip 186.59 → **186.88**) : +1.02 kB brut / +0.29 gzip
- CSS : 80.11 → **81.50 kB** (gzip 13.17 → **13.60**) : +1.39 kB brut / +0.43 gzip
- Requêtes réseau : **+0** (aucun asset, aucune dépendance)
- HTML prérendu : +~0.3 kB/route (markup du stage)

## Coût d'animation
- 2 animations CSS, **opacity uniquement** (compositor-friendly, pas de layout/paint),
  fréquences 10s/14s. Pas de blur, pas de filter, pas de box-shadow animé.
- **Aucune boucle JS** (pas de rAF, pas d'interval d'animation). Le seul timer est le
  settle de 900ms au changement de route (cleared en cleanup).
- Onglet caché : `data-hidden` → `animation-play-state: paused` (vérifié : playState "paused").
- Layout shift : aucun — le stage est `fixed inset-0` hors flux, le contenu n'a pas bougé
  (aucun changement de dimensions constaté sur les routes balayées).
- Réactivité input : aucune interception (`pointer-events: none`), aucun handler global ajouté
  hormis `visibilitychange`.

## Mobile
- Mêmes couches (1px + gradients), aucun asset supplémentaire ; amplitude identique.
- Reduced-motion/save-data → état `static` : zéro travail d'animation.

## Non fait / manuel
- Lighthouse/Web Vitals chiffrés sur l'URL de preview réelle (accès preview protégé par
  l'authentification Vercel — voir PHASE_1_VALIDATION.md).
- Mesure batterie sur appareil physique.
