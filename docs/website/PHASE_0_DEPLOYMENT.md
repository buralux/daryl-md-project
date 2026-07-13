# Phase 0 — Déploiement : configuration constatée & procédure de protection

## Configuration constatée

- **`vercel.json`** : `buildCommand: npm run build` · `outputDirectory: dist/public` ·
  rewrite SPA `/(.*) → /index.html`. Déploiement **statique** (l'`dist/index.cjs` Express n'est
  pas utilisé par Vercel).
- **Liaison** : pas de répertoire `.vercel/` local, pas de CLI Vercel installée →
  les déploiements passent par l'**intégration Git Vercel** sur
  `github.com/buralux/daryl-md-project` : push d'une branche = **Preview Deployment** ;
  merge/push sur `main` = **Production**.
- **Production** : `www.daryl.md` répond derrière **Cloudflare** (`server: cloudflare`, `cf-ray`
  constatés) qui proxy/CDN le déploiement Vercel. Phase 0 ne touche ni DNS ni Cloudflare.
- **Note SEO/déploiement** : le prérendu écrivait les canonicals vers
  `https://daryl-md-project.vercel.app` (défaut historique du script). Corrigé :
  `SITE_URL` env → défaut `https://www.daryl.md`. Les previews peuvent surcharger
  `SITE_URL` si besoin, sans impact production.
- **Env vars** : `.env.example` documente `AGENT_MESH_API_BASE_URL` et `VITE_DASHBOARD_URL`.
  Non requises par les changements Phase 0 ; non inspectées côté Vercel ; jamais exposées.

## Protection de la production (état de fait Phase 0)

- Travail exclusivement sur la branche **`world/phase-0`**, créée depuis `main@1270e14`.
- `main` local : **aucun commit ajouté**. Aucun push sur `main`. Aucune commande de déploiement
  production exécutée (aucune CLI Vercel présente).
- Le push de `world/phase-0` vers GitHub déclenche **uniquement** un Preview Deployment Vercel
  (URL de la forme `daryl-md-project-git-world-phase-0-<scope>.vercel.app`) — jamais la production.
- DNS / domaine / Cloudflare : intouchés.

## Rollback (disponible à tout instant)

1. **Rien à annuler côté production** : la production n'a pas changé pendant la Phase 0.
2. Si, après approbation humaine, `world/phase-0` est mergée puis regrettée :
   - **Vercel** : Dashboard → Deployments → déploiement précédent → *Promote to Production*
     (instantané, sans rebuild) ; ou
   - **Git** : `git revert -m 1 <merge-commit>` sur `main` → nouveau déploiement de l'état antérieur.
3. La branche peut être supprimée sans trace : `git branch -D world/phase-0` +
   suppression de la branche distante — le Preview Vercel expire de lui-même.

## Procédure de validation preview (à exécuter après push)

1. Push `world/phase-0` → ouvrir l'URL de preview fournie par Vercel (bot GitHub / dashboard).
2. Vérifier sur la preview : `/home`, `/dsm`, `/`, 404, `robots.txt`, `sitemap.xml`,
   `view-source:` d'une route prérendue (contenu visible sans JS).
3. Vérifier les canonicals : ils pointent vers `https://www.daryl.md/...` **par conception**
   (le HTML de preview déclare la prod canonique — comportement voulu, pas un bug).
4. Mobile + desktop + reduced-motion (émulation OS) + clavier sur la preview.
5. Confirmer dans le dashboard Vercel que le déploiement est bien étiqueté *Preview*, pas *Production*.
