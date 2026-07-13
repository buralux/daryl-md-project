# Carte section→scène — homepage réelle (experiment/scroll-world-integrated-page)

Architecture : `client/src/world-integrated/section-scrub.ts` (dérivé du moteur amont MIT —
scrub/Blob/coalescing/mobile/reduced-motion repris ; le suivi de défilement est réancré sur
les SECTIONS RÉELLES ; aucune hauteur de page synthétique ; aucun dot/hint/skip).
Couches : `#experience-stage` (Phase 1, z-0) < `.wi-host` (cinématique, z-[-1] dans le
contexte du contenu) < contenu sémantique. `pointer-events:none`, `aria-hidden`.

Fenêtre d'une scène : `ws = max(0, top(start) − vh)` → `we = bottom(end) − vh/2`,
recalculée au resize et après le rendu React (relayouts à 250/900/2000 ms).
Progression `p = (scrollY − ws)/(we − ws)` → temps vidéo (lerp amont 0.18, seek coalescing).
Opacité : fondu d'entrée `p/0.18` (supprimé si `ws=0` — le héros est présent dès le
chargement), fondu de sortie `(1−p)/0.22`. Entre les fenêtres : la page respire (Phase 1).

| Moment | start (data-testid) | end (data-testid) | Clip (t 0→8 s) | Poster | Mobile | Contraste texte | Reduced-motion |
|---|---|---|---|---|---|---|---|
| 1 — ARRIVÉE (DARYL existe déjà sous l'interface) | `section-hero` | `section-problem` | m1.mp4 (z 1→1.7, glissement avant) | m1.png | m1-m.mp4 (720p g4) | héros centré : pic lumineux excentré (x≈30%), plafond de luminance ~50% — texte #F1F2F4 dominant (vérifié capture) | posters seuls, fondus conservés |
| 2 — SYSTÈME (le produit devient un monde) | `section-dsm` | `section-how` | m2.mp4 (z 1.7→2.4) | m2.png | m2-m.mp4 | contenu en cartes `bg-card` : lisibilité vérifiée capture | idem |
| 3 — CONTINUITÉ (rien ne disparaît) | `section-roadmap` | `section-manifesto` | m3.mp4 (z 2.4→3.0, structures monumentales) | m3.png | m3-m.mp4 | idem | idem |

Hors fenêtres (problem→usecases→developers ; après manifesto/footer) : couche invisible —
la page se termine normalement, sans fondu final ni fin forcée (vérifié : scènes à 0 au footer).

Thème clair : `.wi-host` opacité 0 (le monde sombre se retire ; le site clair reste maître).
Clips actuels = substitution procédurale « background-duty » (plafond de luminance abaissé,
pic hors colonne de texte) — prouvent le MODÈLE, pas l'esthétique générée (gates Higgsfield
inchangés, 0 crédit).

## Mesures (build + runtime, artefact construit)
- JS : 617.57 → **621.38 kB** (gzip 186.88 → **188.28**, +1.4 kB) — moteur intégré + composant.
- Payload médias : **5.8 MB** total (desktop 3.8 MB clips + 0.55 MB posters ; mobile 1.7 MB) —
  chargé PARESSEUSEMENT par fenêtre (vérifié : 1 clip au chargement, 3 seulement après
  traversée complète) ; jamais dans le chemin critique ; page height = contenu réel.
- Console : 0 erreur. Prerender/sitemap : inchangés (14 routes, world-integrated absent).
- Scènes exclusives par fenêtre (0/0/1 aux profondeurs testées), scrub bidirectionnel hérité
  du moteur validé, teardown complet au changement de route.
