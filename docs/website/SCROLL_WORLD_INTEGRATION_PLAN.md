# Scroll World × DARYL — Plan d'intégration (branche expérimentale uniquement)

## Route
- **`/world-lab`** — n'existe que sur `experiment/scroll-world`.
- `<meta name="robots" content="noindex">` posé par la page ; route ABSENTE de
  `script/prerender.ts` (donc hors sitemap, hors HTML statique) et absente de la
  navigation (Header/Footer inchangés).
- Suppression propre = revert de la branche : 0 fichier partagé modifié hors 2 points
  d'ancrage (une ligne de route dans `App.tsx`, assets sous `client/public/world-lab/`).

## Architecture d'intégration
```
client/src/world-lab/
  scrub-engine.ts      ← copie adaptée du moteur amont (attribution MIT complète,
                          adaptations marquées [DARYL adaptation] — voir ENGINE_ADAPTATIONS)
  WorldLab.tsx         ← page React : monte le moteur dans un conteneur dédié au mount,
                          appelle destroy() au unmount ; skip control ; états
                          loading / failure ; noindex ; aucune dépendance nouvelle
client/public/world-lab/
  s1.mp4 s2.mp4 s3.mp4         (desktop, crf 20 g 8)
  s1-m.mp4 s2-m.mp4 s3-m.mp4   (mobile, 720p g 4)
  s1.png s2.png s3.png          (posters = frames extraites)
```

## Frontières préservées
- La Phase 1 (registre VIE) n'est PAS modifiée : `ExperienceShell` intact ; sur
  `/world-lab` la page rend son propre conteneur plein écran au-dessus (le stage Phase 1
  reste derrière, inoffensif).
- Routes existantes, prerender, sitemap, i18n, thème : intacts (vérifié au build).
- Le CSS moteur amont stylait `html,body` → neutralisé (voir adaptations) : aucune fuite
  globale.

## Ce que l'expérience NE fait pas
- Pas de merge vers main. Pas de déploiement production. Pas d'Evidence Register.
- Pas de nouvelle dépendance npm (le moteur est vanilla ; l'hôte est React existant).
- Pas de texte marketing dans l'expérience (révélation, pas d'explication).
