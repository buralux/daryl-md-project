# Phase 0 — Accessibilité : avant / après (faits constatés)

## Défauts constatés et corrigés

| # | Défaut (baseline, constaté) | Correction (world/phase-0) | Vérifié |
|---|---|---|---|
| 1 | `client/index.html` : `maximum-scale=1` dans le viewport — **zoom navigateur bloqué** (échec WCAG 1.4.4) | `maximum-scale` retiré | meta constatée dans le HTML prérendu |
| 2 | Aucun lien d'évitement | Skip-link « Skip to content / Aller au contenu » dans Header, `sr-only` → visible au focus, cible `main#main` | Test focus : visible et focusé, cible présente |
| 3 | `<main>` sans id ciblable | `id="main"` sur le main de Layout | présent dans le prérendu |
| 4 | Boutons icône sans nom accessible : menu mobile (Menu), bascule thème (Sun/Moon), bascule langue | `aria-label` i18n EN/FR sur les trois (`a11y.openMenu`, `a11y.toggleTheme`, `a11y.switchLanguage`) | labels constatés dans le DOM |
| 5 | `<a>` imbriqué dans `<a>` (Header enveloppait Logo, qui rend son propre lien wouter) — HTML invalide + erreur console React `validateDOMNesting` | Header rend `<Logo href="/home" data-testid="link-logo" />` sans wrapper | `document.querySelectorAll('a a').length === 0` |
| 6 | 404 = template développeur (« Did you forget to add the page to the router? »), fond `bg-gray-50` codé en dur (cassé en dark), non i18n, sans navigation | 404 en marque : Layout + Header/Footer, EN/FR, dark correct, bouton retour accueil | rendu constaté sur route inexistante |
| 7 | `<html lang="en">` figé même en FR | `document.documentElement.lang` synchronisé par LanguageProvider | constaté après bascule |
| 8 | Aucun respect de `prefers-reduced-motion` (framer-motion + CSS) | `MotionConfig reducedMotion="user"` au niveau App (toutes les animations framer-motion) + règle CSS globale pour les animations/transitions CSS | code + règle en place (émulation OS : revue manuelle, voir plus bas) |
| 9 | Teaser `/` : vidéo autoplay pur mouvement, imposée aussi aux utilisateurs reduced-motion ; libellé « Passer » codé en dur en français pour tous ; pas de gestion d'erreur vidéo | reduced-motion → redirection immédiate vers `/home` (replace) ; `onError` → `/home` ; libellé i18n `teaser.skip` ; `aria-hidden` sur la vidéo décorative | code constaté ; comportement reduced-motion : revue manuelle |
| 10 | Liens nus sans style de focus visible (les composants shadcn ont un ring, pas les `<a>` bruts) | `a:focus-visible` global (outline ring) dans index.css | règle constatée |

## État après Phase 0 (constaté)
- Zoom libre, skip-link fonctionnel, landmarks (`header`, `nav`, `main#main`, `footer`)
- Tous les contrôles icône nommés, EN/FR
- 0 `<a>` imbriqué, 0 erreur console sur /home et 404 (après correction)
- reduced-motion honoré aux deux niveaux (JS framer-motion + CSS)

## Restes connus (différés, documentés)
- **Émulation OS de `prefers-reduced-motion` et test lecteur d'écran réel (VoiceOver/NVDA) : revue
  manuelle requise** — non émulables de façon fiable dans l'outillage utilisé ici.
- Contraste : palette existante non re-mesurée systématiquement (aucun changement de couleurs en
  Phase 0) ; un audit contraste complet appartient à la phase qui touchera la palette.
- Focus management à la navigation SPA (annonce de changement de page aux lecteurs d'écran) :
  non traité — candidat Phase 1 (le shell persistant est l'endroit naturel pour le faire).
- `aria-live` pour les toasts : composant shadcn standard, non audité en Phase 0.
