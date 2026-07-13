# Scroll World × DARYL — Budget d'assets (3 scènes, Architecture A)

Aucune génération avant GATE 0 (CLI Higgsfield installé + auth par le propriétaire +
budget confirmé). Modèles et coûts par génération : voir la tarification Higgsfield du
propriétaire — non consultable ici, d'où les gates.

## Phase previz (modèle : `seedance_2_0_mini`, 720p — règle amont « previz on the cheap »)
| Poste | Quantité | Re-rolls budgétés | Total gens |
|---|---|---|---|
| Stills (gpt_image_2, 3:2, 2k) | 1 (scène 1 seulement — les legs suivants partent des frames rendues) | +2 | ≤ 3 |
| Legs previz (8 s, 720p) | 3 | +1/leg standard, +1 sur legs expressifs (S2, S3) — règle amont | ≤ 8 |
| Connecteurs | 0 (Architecture A) | — | 0 |
| **Total previz** | | | **≤ 11 générations** |

## Phase finale (modèle : `seedance_2_0`, 1080p) — SEULEMENT après GATE 3
| Poste | Quantité | Re-rolls | Total |
|---|---|---|---|
| Legs finaux (8 s, 1080p) | 3 | +2 au total | ≤ 5 |

## Encodes (ffmpeg local — zéro crédit, recettes pipeline.md §5-6 verbatim)
| Sortie | Recette | Taille estimée |
|---|---|---|
| 3 clips desktop | x264, crf 20, g 8, +faststart, sans audio, unsharp léger | ~3–6 MB/clip → **9–18 MB** |
| 3 clips mobile | 720p, g 4, crf 23 | ~1.5–3 MB/clip → **4.5–9 MB** |
| 3 posters | frames extraites des legs rendus (frame 0 de chaque leg) — PNG (cwebp absent) | ~0.2–0.5 MB/poster |
| **Payload page (desktop, pire cas)** | 3 clips + 3 posters | **~10–20 MB** — chargé paresseusement par le moteur (fenêtre ±1.6 vh), jamais dans le chemin critique |

## Ordre de génération (workflow amont)
1. Still S1 → GATE 1 (inspection cohésion/direction artistique)
2. Leg 0 (start = still S1) → extraire dernière frame (ffmpeg -sseof) → inspection (« glide avant propre » sinon re-roll)
3. Leg 1 (start = dernière frame leg 0) → idem
4. Leg 2 (start = dernière frame leg 1) → GATE 2 complet
5. Encodes desktop + mobile + posters → intégration engine
6. (Après validation previz + GATE 3) : re-générer les 3 legs en `seedance_2_0` 1080p, ré-encoder

## Substitution technique intérimaire (active tant que GATE 0 est bloqué)
- 1 image maîtresse procédurale (ffmpeg lavfi/geq, graphite + lumière ambre) — 0 crédit
- 1 prise continue 24 s (zoompan avancée continue) → découpe à la frame en 3 legs de 8 s
  (coutures identiques par construction) → encodes pipeline.md desktop + mobile + posters
- Étiquetée « technical stand-in » partout ; remplacée fichier-pour-fichier par les rendus
  Higgsfield quand GATE 0-2 seront levés (le moteur ne change pas).
