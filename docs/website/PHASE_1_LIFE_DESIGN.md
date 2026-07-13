# Phase 1 — Registre VIE : conception

Fondement : World Bible v3 §2 (approuvée) + contrat `world/contracts.ts`. Portée : la première
transformation perceptible — présence sans revendication d'activité. Rien d'autre.

## Ce qui existe (exactement)

Deux éléments atmosphériques dans le stage persistant (`#experience-stage`, hors Router) :

1. **`.life-field`** — champ de lumière : deux gradients radiaux d'ambre chaud (232,184,122) à
   très faible alpha (0.06 clair / 0.09 sombre), ancrés hors-cadre (haut-gauche, bas-droite).
   Respiration : `life-breath`, **14s**, opacité 0.65→1→0.65. Aucune donnée, aucune forme
   signifiante — de la profondeur et de la chaleur.
2. **`.life-line`** — première manifestation abstraite de la Ligne : filament vertical de **1px**,
   pleine hauteur, extrémités fondues (18%/82%), à `left: clamp(20px, 5vw, 64px)`.
   Sombre : ambre 0.34 ; clair : graphite 0.20. Respiration : `life-line-breath`, **10s**
   (déphasée du champ). **Non étiquetée** — ni hash chain, ni progression, ni route map.
   Un indice de continuité spatiale, rien de plus (les noms viennent plus tard).

## Trois états (attribut `data-motion` sur le stage)

| État | Quand | Comportement |
|---|---|---|
| `static` | reduced-motion, save-data, premier rendu (défaut conservateur), SSR | Présent, immobile, opacités figées à 0.8 — l'immobilité est intentionnelle |
| `ambient` | défaut | Les deux respirations, basse fréquence/amplitude |
| `transitional` | ~900ms au changement de route | La ligne monte à opacité 1 (transition 900ms), puis retombe en ambient |

La réponse de route dit « le lieu est continu » — elle n'implique jamais qu'une navigation est une
exécution DARYL (frontière VIE respectée : aucun log, aucune métrique, aucun événement).

## Choix rejetés (boucle de décision)

- **RAF/JS animation loop** — rejeté : CSS compositor-only (opacity uniquement) est plus simple,
  moins cher, sans risque de fuite.
- **WebGL/canvas** — interdit en Phase 1 et inutile pour cette amplitude.
- **Particules, texture, grain** — sans signification structurelle → interdits par la phase.
- **Ligne au centre / pleine largeur de gradient** — concurrence visuelle avec le contenu ; le bord
  gauche laisse le contenu maître de l'écran.
- **Amplitudes plus fortes** — l'émotion cible est le calme ; premier réglage 0.22 jugé trop
  discret sur écran réel potentiel, monté à 0.34 (sombre) après revue visuelle — toujours quiet.
