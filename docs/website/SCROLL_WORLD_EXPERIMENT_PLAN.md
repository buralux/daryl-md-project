# Scroll World × DARYL — Plan d'expérience (branche `experiment/scroll-world`)

## Question
Le vrai dépôt Scroll World (moteur + workflow) peut-il devenir la couche cinématique de
DARYL ? Réponse attendue : OUI / NON / PARTIALLY, avec preuves.

## Périmètre
- 3 scènes seulement (Présence / Réponse / Reconnaissance) — registre VIE, aucun DCP/DSM/
  module/claim produit.
- Route isolée `/world-lab` : noindex, hors sitemap, hors navigation, jamais en production.
- **Architecture A amont — Continuous Forward Take** : chaque leg démarre sur la VRAIE
  dernière frame du leg précédent ; jamais d'inversion de caméra à une couture ; contrat
  de raccord de mouvement verbatim (prompts.md amont).

## Workflow réel — statut d'installation (STEP 3, constaté le 2026-07-13)
Le "workflow" amont est un **skill agent** (SKILL.md) : son installation officielle est
`/plugin install scroll-world@scroll-world` (ou `npx skills add oso95/scroll-world`), et
son exécution EST le processus que je suis manuellement, étape par étape, depuis la copie
locale au commit `f941ef9`. (Un plugin se charge au démarrage du CLI — la session en cours
suit donc le SKILL.md du clone, ce qui est le même contenu.)

| Outil requis (SKILL Step 0) | Statut |
|---|---|
| ffmpeg / ffprobe | ✅ présents (`/opt/homebrew/bin`) |
| jq | ✅ présent |
| node | ✅ présent |
| cwebp | ❌ absent (fallback : posters PNG, ou `sips`; non bloquant) |
| Python + Pillow (knockout, optionnel) | ❌ PIL absent (sans objet en photoréal full-bleed) |
| **Higgsfield CLI** | ❌ **ABSENT** |
| **Higgsfield auth** | ❌ **BLOQUÉ** : OAuth interactif (`higgsfield auth login`) — le SKILL amont précise lui-même que l'agent ne peut pas l'exécuter |
| **Crédits Higgsfield** | ❌ inconnus / non autorisés — dépense interdite sans validation du propriétaire |

**Conséquence honnête : la GÉNÉRATION d'assets est bloquée** tant que le propriétaire n'a
pas (1) installé le CLI Higgsfield, (2) exécuté `higgsfield auth login`, (3) confirmé un
budget de crédits (voir ASSET_BUDGET, gates). Aucun crédit ne sera dépensé sans cela.

## Ce qui est évaluable MAINTENANT sans crédits (et comment rester fidèle au dépôt)
Le moteur amont est agnostique à la provenance des clips (il scrubbe des mp4 encodés selon
pipeline.md §5-6). Pour évaluer le **runtime réel** (scrub, coutures, Blob, mobile,
reduced-motion, cycle de vie) sans dépenser :
- une **prise continue de substitution** est produite localement par ffmpeg (composition
  procédurale graphite/lumière chaude → UNE seule vidéo de 24 s en avancée continue →
  découpée à la frame exacte en 3 legs → coutures mathématiquement identiques) ;
- encodée **exactement** selon pipeline.md (desktop x264 crf 20, g 8, faststart ; mobile
  720p, g 4, crf 23) ; posters = frames extraites, comme l'exige le workflow amont ;
- **étiquetée partout comme substitution technique** (GENERATION_LOG) : elle prouve le
  moteur et l'interaction, **pas** l'esthétique Higgsfield. La preuve esthétique reste
  conditionnée au dégel de la génération (gates).
Ceci n'est PAS une imitation du moteur (interdite) : c'est le vrai moteur, nourri par des
clips techniques en attendant les vrais rendus.

## Étapes
1. ✅ Acquisition + inspection intégrale + provenance (PROVENANCE.md)
2. ✅ Ce plan + STORYBOARD + ASSET_BUDGET + INTEGRATION_PLAN (gate de pré-production)
3. Prise de substitution ffmpeg + encodes pipeline.md + posters (GENERATION_LOG)
4. Adaptation du moteur réel → route `/world-lab` (ENGINE_ADAPTATIONS.md)
5. Validation autonome (local + Preview Vercel via accès Chrome autorisé) : desktop,
   mobile, reverse-scroll, coutures, mémoire, cycle de vie, fallbacks
6. Verdict OUI/NON/PARTIALLY + arrêt. Pas de merge, pas de production, pas de Phase 2.

## Gates de dépense (aucune génération avant GATE 0)
- **GATE 0** : propriétaire → CLI installé + auth + budget confirmé.
- **GATE 1** : still de la scène 1 approuvé (cohésion, direction artistique).
- **GATE 2** : chaque leg previz (`seedance_2_0_mini`) inspecté : dernière frame = glide
  avant propre, sinon re-roll (max 3/leg, règle amont).
- **GATE 3** : approbation humaine explicite avant tout rendu final (`seedance_2_0`).
