# Scroll World × DARYL — Journal de génération (rien n'est caché)

## Générations Higgsfield
**Aucune.** GATE 0 non levé : CLI absent, OAuth interactif impossible pour l'agent
(règle amont), crédits non autorisés. **0 crédit dépensé.** Les prompts prêts à l'emploi
sont dans SCROLL_WORLD_STORYBOARD.md ; le budget et les gates dans SCROLL_WORLD_ASSET_BUDGET.md.

## Substitution technique (locale, ffmpeg, 0 crédit) — 2026-07-13
Objectif : nourrir le VRAI moteur pour évaluer runtime + interaction. N'évalue PAS
l'esthétique générative. Étiquetée comme telle dans le code (`WorldLab.tsx`) et ici.

| # | Étape | Outil / recette | Résultat |
|---|---|---|---|
| 1 | Image maîtresse 3200×1600 (graphite, colonnes, lueur ambre distante) | ffmpeg lavfi `geq` (gaussienne + colonnes sin + vignette) | **Rejet v1** : trop claire — la scène 1 exigeait l'obscurité (re-roll assumé) |
| 2 | Image maîtresse v2 : lueur resserrée (σx 0.17W), vignette 0.93 | idem | **Acceptée** (inspection visuelle) |
| 3 | Prise continue 24 s / 720 frames, avancée constante z 1→3.2 (Architecture A : UNE prise, coutures = points de coupe frame-exacts) | `zoompan`, x264 crf 12 (master) | OK — 720 frames vérifiées ffprobe |
| 4 | 3 legs desktop 8 s | découpe frame-exacte + recette pipeline.md §5 verbatim (crf 20, g 8, sc_threshold 0, +faststart, unsharp) | s1 1.40 MB · s2 1.70 MB · s3 1.74 MB |
| 5 | 3 legs mobile | recette pipeline.md §6 verbatim (720p, g 4, crf 23) | s1-m 0.62 MB · s2-m 0.70 MB · s3-m 0.68 MB |
| 6 | 3 posters | frames extraites de la prise (t=0/8/16 s), PNG 1600w (cwebp absent) | 0.25–0.42 MB |

**Payload total : 7.6 MB** (desktop pire cas ~5.9 MB clips+posters ; mobile ~2.7 MB).
Chargement paresseux par le moteur (fenêtre ±1.6 vh) ; jamais dans le chemin critique.

## Remplacement futur
Fichier-pour-fichier (`client/public/world-lab/s{1..3}[-m].{mp4,png}`) par les rendus
Higgsfield après GATE 0-2 — le moteur et la route ne changent pas.
