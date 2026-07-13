# Phase 1 — Accessibilité

## Principes appliqués (exigences du protocole, toutes vérifiées sur l'artefact construit)
- Le stage est **décoratif** : `aria-hidden="true"`, `pointer-events: none`, jamais focusable —
  exclu de l'arbre d'accessibilité, n'intercepte ni pointeur ni focus (vérifié par styles calculés).
- **Aucune information essentielle portée par le mouvement** : le stage ne porte aucune
  information du tout (registre VIE — il ne prétend rien).
- **Reduced-motion** : triple garde — état `static` explicite (`data-motion`), règle CSS globale
  Phase 0 (`animation-duration: 0.01ms`), `MotionConfig reducedMotion="user"`. La version
  immobile est dessinée pour être intentionnelle (opacités figées, présence conservée).
- **Contraste/lisibilité** : le stage vit sous le contenu (z-0 < z-10) à alphas ≤ 0.34 sur 1px et
  ≤ 0.09 en champ — aucun texte ne repose sur le stage ; captures light/dark revues, contenu
  intact. Aucune couleur de texte modifiée en Phase 1.
- **Sans JS / échec de la couche** : le contenu prérendu reste complet et lisible ; le stage
  n'est jamais requis. En cas d'échec du JS, la page reste le site sémantique de Phase 0.
- **Zoom** : approximation 200% (font-size racine 32px) sans overflow horizontal.

## Éléments Phase 0 revalidés après Phase 1 (artefact construit)
Skip-link, `main#main`, aria-labels des contrôles, 404, `<html lang>` FR/EN : inchangés et
fonctionnels ; 0 erreur console sur le balayage.

## Revue manuelle requise (non émulable ici)
- VoiceOver/NVDA réels ; émulation OS de `prefers-reduced-motion` ; appareils physiques.
