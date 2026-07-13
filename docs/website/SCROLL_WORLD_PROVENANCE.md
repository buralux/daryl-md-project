# Scroll World — Provenance & licence (expérience isolée)

## Amont
- **Dépôt** : https://github.com/oso95/scroll-world
- **Commit exact utilisé** : `f941ef93eec785f08634d5f42fb2cbd652dd06c6`
  (2026-07-09, "Support Codex and the skills CLI alongside Claude Code", branche `main`)
- **Copie de travail** : `~/Documents/DARYL/scroll-world-upstream` (clone jumeau, HORS du
  dépôt daryl-md-project — jamais imbriqué)
- **Licence** : **MIT, Copyright (c) 2026 cyw** (`LICENSE` amont ; confirmée par
  `.claude-plugin/plugin.json` → `"license": "MIT"`, auteur `cyw <cyw@cywang.me>`)

## Ce que la licence MIT permet / exige
- Permis : utiliser, copier, modifier, fusionner, publier, distribuer — y compris en
  commercial.
- **Exigé : conserver la notice de copyright et la notice de permission dans toute copie
  ou portion substantielle.** → Tout fichier amont copié ou adapté dans ce dépôt porte un
  en-tête d'attribution (URL, commit, copyright, MIT) et la notice complète est reproduite
  dans le fichier adapté principal.

## Inventaire amont (7 fichiers, 1 450 lignes)
| Fichier | Rôle | Décision d'intégration |
|---|---|---|
| `skills/scroll-world/SKILL.md` (535 l.) | Le workflow lui-même (instructions agent) : interview → stills → legs → seams → encodes → engine → QA | **Suivi comme processus** (c'est un skill : son "installation" = l'agent l'exécute). Non copié dans le dépôt. |
| `references/scrub-engine.js` (442 l.) | Moteur runtime : scroll→currentTime, Blob, posters, crossfade seams, reduced-motion, mobile | **Copié et adapté** → `client/src/world-lab/scrub-engine.ts` (en-tête d'attribution + notice MIT complète ; adaptations documentées dans SCROLL_WORLD_ENGINE_ADAPTATIONS.md) |
| `references/pipeline.md` (170 l.) | Scripts bash : génération Higgsfield + extraction de frames + encodes ffmpeg (crf 20/g 8 desktop, 720p/g 4 mobile) | **Commandes d'encodage reprises telles quelles** (ffmpeg) ; commandes Higgsfield reprises dans le plan, bloquées par l'outillage (voir EXPERIMENT_PLAN) |
| `references/prompts.md` (141 l.) | Gabarits de prompts ; préambule de style ; **variante "Photoreal architectural"** ; contrat de raccord de mouvement (Architecture A) | **Gabarits réutilisés** dans le storyboard (adaptés à la direction artistique DARYL) |
| `references/index-template.html` (73 l.) | Page hôte vanilla | **Non repris** (l'hôte est une route React isolée) — décision documentée |
| `references/knockout.py` (89 l.) | Détourage optionnel (dioramas flottants) | **Non repris** (sans objet : direction photoréale full-bleed) |
| `.claude-plugin/*`, `README.md`, `LICENSE` | Manifestes plugin, installation, licence | Lus ; installation documentée dans EXPERIMENT_PLAN |

## Attribution
- `client/src/world-lab/scrub-engine.ts` : en-tête avec © 2026 cyw, MIT, URL + commit
  amont, et la notice MIT intégrale ; chaque modification marquée `[DARYL adaptation]`.
- Ce document tient lieu de registre de provenance pour l'ensemble de l'expérience.
