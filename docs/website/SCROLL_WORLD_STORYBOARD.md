# Scroll World × DARYL — Storyboard (3 scènes, Architecture A)

Direction artistique (impérative, remplace le diorama par défaut) : intelligence spatiale
monumentale — graphite, obsidienne, verre fumé, structures métalliques précises, lumière
signal chaude et retenue, profondeur volumétrique, échelle calme, complexité invisible,
élégance industrielle intemporelle. Interdits : cyberpunk, néon, robots humanoïdes,
cerveaux, hologrammes, blockchain, mascottes, villes fantastiques, langage parc
d'attractions, texte incrusté, logos générés.

## Préambule de style (verbatim dans chaque prompt — base : variante amont "Photoreal architectural")

```
Ultra-photorealistic architectural photography of a vast monumental interior, cinematic
wide-angle, dark graphite and obsidian surfaces, smoked glass, precise brushed-metal
structures, a single restrained warm amber light source glowing deep within, volumetric
depth, calm monumental scale, timeless industrial elegance, editorial magazine quality,
shallow depth of field, no people, absolutely no text, no letters, no numbers, no logos.
Palette: graphite #0A0B0C, obsidian #131417, steel #3A4048, warm amber #E8B87A.
```

(Full-bleed photoréal : pas d'île flottante, pas de knockout — règle amont pour cette
variante. Sujet centré avec marge — contrainte de recadrage portrait amont.)

## SCÈNE 1 — PRÉSENCE (leg 0, 8 s)
- **Still (gpt_image_2, 3:2, 2k, high)** : `[PRÉAMBULE]` + « Subject: an immense dark
  threshold hall almost entirely in shadow; at its far end, barely perceptible, a thin
  warm amber glow outlines the edge of a distant opening; vast negative space above and
  around; the architecture is sensed more than seen. »
- **Leg 0 (start-image = still 1)** : « Single continuous cinematic camera move, no cuts.
  **Continue the same slow, steady forward glide.** The camera drifts through the dark
  threshold hall toward the faint warm glow at its far end. **In the final second, settle
  back into a slow, steady forward glide toward the narrow opening ahead.** [PRÉAMBULE].
  Smooth, graceful, slow motion, subtle parallax. No text, no captions. »
- Ressenti visé : *« Il y a quelque chose ici. »* Silence, obscurité, profondeur.

## SCÈNE 2 — RÉPONSE (leg 1, 8 s ; start-image = VRAIE dernière frame du leg 0)
- **Leg 1** : « Single continuous cinematic camera move, no cuts. **Continue the same
  slow, steady forward glide.** As the camera passes through the opening, the space
  responds and opens: smoked-glass panels catch the warm light, precise metal structures
  emerge from darkness on both sides, the amber glow widens and breathes. **In the final
  second, settle back into a slow, steady forward glide toward the vast chamber ahead.**
  [PRÉAMBULE]. Smooth, graceful, slow motion, subtle parallax. No text, no captions. »
- Ressenti visé : *« Cet environnement répond à mon mouvement. »* (Registre VIE : le
  monde s'ouvre — aucune exécution DARYL impliquée.)

## SCÈNE 3 — RECONNAISSANCE (leg 2, 8 s ; start-image = VRAIE dernière frame du leg 1)
- **Leg 2** : « Single continuous cinematic camera move, no cuts. **Continue the same
  slow, steady forward glide.** The camera emerges into an immense calm chamber whose
  full scale slowly reveals itself: countless precise structures recede into warm-lit
  depth beyond sight, one thin vertical line of amber light descending through the
  center, everything still, everything coherent, rising smoothly as the full scale of
  the space reveals below. **In the final second, settle into a slow, steady forward
  drift toward the vertical line of light.** [PRÉAMBULE]. Smooth, graceful, slow motion,
  subtle parallax. No text, no captions. »
- Ressenti visé : *« Je ne regarde pas un site. Je suis brièvement entré dans une
  intelligence. »* — jamais écrit à l'écran. La frame finale (drift vers la ligne
  verticale de lumière) est conçue pour se raccorder plus tard à la boucle DARYL (la
  Ligne du registre VIE de la Phase 1).
- Fin : fondu au noir (fade-out du moteur / fin de piste).

## Copy à l'écran (moteur, hors médias — minimale, révélation sans explication)
- S1 : aucun texte. S2 : aucun texte. S3 : aucun texte.
- Hint scroll amont (« scroll ») conservé, seul élément UI actif + contrôle « skip ».
- Aucun logo, aucun nom, aucune explication. (Le test : l'envie de continuer à scroller
  doit naître de la composition seule.)

## Cadence (moteur)
- `diveScroll` par leg : 1.6 (S1, dwell long — le silence doit durer), 1.3 (S2), 1.8 (S3,
  linger 0.4 — la révélation d'échelle se pose au moment du pic).
- `connectors: []` (Architecture A : les legs SONT le voyage), `crossfade: 0.08` (règle amont).
