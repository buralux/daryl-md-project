# Phase 0 — Architecture de la frontière d'expérience persistante

Objectif : préparer l'endroit où vivra la future couche-monde **sans la construire**.
Fondement créatif : `DARYL-WORLD-BIBLE.md` v3 (approuvée). Rien de visuel n'a changé en Phase 0.

## Ce qui a été créé

### `client/src/world/ExperienceShell.tsx`
Monté une seule fois dans `App.tsx`, **au-dessus du Router** :

```
QueryClientProvider
└─ ThemeProvider
   └─ LanguageProvider
      └─ MotionConfig reducedMotion="user"     ← nouveau (Phase 0)
         └─ TooltipProvider
            └─ Toaster
            └─ ExperienceShell                 ← nouveau (Phase 0) — persistant
               ├─ #experience-stage            ← fixed, aria-hidden, pointer-events:none, z-0 (vide)
               └─ div.relative.z-10
                  └─ Router (wouter)           ← contenu de route, inchangé
```

Conséquence : un changement de route démonte la page, **pas le shell ni le stage**. C'est la
condition technique de la « traversée, jamais téléportation » des phases futures — posée, pas
exploitée.

### `client/src/world/contracts.ts`
Le contrat des deux registres (voir LIFE_AND_EVIDENCE_CONTRACT.md) en TypeScript :
`LifeElement`, `EvidenceElement`, `EvidenceSource` (replayed | live | demonstration),
`assertRegister()`. Aucun appelant en Phase 0 — c'est la règle, pas le système.

### `useExperienceCapabilities()` (dans ExperienceShell.tsx)
Capacités observées côté client : `reducedMotion` (media query, réactive), `saveData`
(navigator.connection). Défauts conservateurs au premier rendu (reducedMotion=true) → SSR-safe :
le prérendu Node n'appelle jamais matchMedia.

## Propriété des couches (contrat que les phases futures DOIVENT respecter)

| Couche | Propriétaire | Règles |
|---|---|---|
| Shell persistant | `world/ExperienceShell` | Ne se démonte jamais entre routes ; n'ajoute aucun coût quand le stage est vide |
| Contenu de route | `pages/*` via Router → `Layout` → `main#main` | Source de vérité SEO/accessibilité/no-JS ; complet sans le stage |
| Contenu statique/SEO | `script/prerender.ts` (HTML par route) | Reste faisant autorité ; le stage s'hydrate PAR-DESSUS de vrais documents |
| Couche motion | framer-motion sous `MotionConfig reducedMotion="user"` | Toute animation respecte l'OS ; enhancement uniquement |
| Fallback accessibilité | DOM sémantique + skip-link + aria | Le stage est aria-hidden et n'intercepte jamais focus/pointeur |
| Fallback reduced-motion | MotionConfig + règle CSS globale (index.css) | Édition à part entière, pas une excuse |
| Frontière de chargement | Stage : lazy, hors chemin critique | Le stage ne bloque jamais le contenu |
| Frontière analytics | Cloudflare Insights existant, rien d'autre | Le stage n'ajoute aucune télémétrie sans décision explicite |
| Cycle de nettoyage | Effets du stage → cleanup obligatoire | Pas de fuites entre routes (le shell vit longtemps) |

## Ce qui n'a volontairement PAS été fait
- Aucun visuel dans le stage (pas de Ligne, pas de souffle, pas de caméra) — Phase 1+
- Pas de WebGL (aucune preuve technique ne le justifiait en Phase 0)
- Pas de code-splitting des routes : `React.lazy` casserait le prérendu synchrone
  (`renderToString` émettrait les fallbacks Suspense — les crawlers verraient des spinners).
  À résoudre en Phase 1 si besoin (ex : prérendu par entrées multiples). Documenté, différé.
- `createRoot` (et non `hydrateRoot`) conservé : l'hydratation stricte serait en mismatch délibéré
  sur `/` (HTML de /home, client Teaser) et avec l'état localStorage (langue/thème). Trade-off
  existant documenté, à revisiter en Phase 1.
