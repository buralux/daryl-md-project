# Phase 0 — Performance : avant / après (mesures de build, faits)

Mesures = sorties de `npm run build` sur la même machine, même commit de base.

## Bundles

| Artéfact | Baseline (main @ 1270e14) | Après Phase 0 | Δ |
|---|---|---|---|
| JS client (1 chunk) | 647.82 kB (gzip 194.96 kB) | 649.68 kB (gzip 195.01 kB) | **+1.86 kB brut / +0.05 kB gzip** (MotionConfig + shell + 404 + skip-link) |
| CSS | ~80.1 kB (gzip ~13.2 kB) | 80.11 kB (gzip 13.17 kB) | ≈ 0 |
| HTML prérendu | 14 routes, 9.7–33.4 kB | 14 routes, 10.2–33.9 kB | +0.3–0.5 kB/route (skip-link + metas corrigées) |
| Nouveaux fichiers statiques | — | sitemap.xml (11 URLs) + robots.txt | négligeable |

Le delta JS est le coût réel des correctifs. Aucune régression.

## Faits de performance constatés (non « recommandations »)

1. **Un seul chunk JS de ~650 kB** porte les 14 pages + framer-motion + Radix.
   Le code-splitting par route (`React.lazy`) **casserait le prérendu actuel** :
   `renderToString` synchrone émettrait les fallbacks Suspense et les crawlers verraient des
   spinners au lieu du contenu. → **Différé volontairement** ; à résoudre en Phase 1
   (options : entrées de build multiples, `onAllReady` streaming, ou prerender par page avec
   imports résolus). Décision Phase 0 : ne pas casser un pipeline SEO qui fonctionne.
2. **Teaser `/` : MP4 de 2.4 MB en autoplay.** Phase 0 l'a rendu inoffensif pour reduced-motion
   (redirection) et résilient (onError→/home), mais le poids reste pour les autres visiteurs.
   Le remplacement du seuil d'entrée est une décision créative de Phase 1 (Bible v3 §5 Phase 0-1),
   pas un correctif mécanique — différé avec ce statut.
3. **Google Fonts Inter axe 100..900** : requête externe render-impacting, axe complet chargé.
   Self-hosting/subsetting = changement d'asset → différé (documenté, faible risque).
4. **Prérendu** : le HTML statique par route existe et reste le chemin critique réel — le contenu
   est visible sans JS. C'est l'atout performance/SEO n°1 du dépôt ; Phase 0 l'a préservé et
   vérifié à chaque changement.
5. Le `#experience-stage` vide n'ajoute **aucun** coût mesurable (un div fixed vide).

## Validation runtime
- Dev server : /home et 404 rendus sans erreur console (après correctif du `<a>` imbriqué).
- Layouts desktop (1280×800) et mobile (375×812) constatés visuellement intacts.
- Lighthouse/Web Vitals chiffrés sur l'URL de preview Vercel : **revue manuelle recommandée**
  (non exécutés ici — l'environnement local ne reflète ni CDN ni réseau réels).
