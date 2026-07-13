# Scroll World — Adaptations du moteur (amont → `client/src/world-lab/scrub-engine.ts`)

Amont : `references/scrub-engine.js` @ `f941ef9` (MIT © 2026 cyw — notice conservée dans
le fichier adapté). Le cœur fonctionnel (chaîne de segments, scrub scroll→currentTime,
lissage 0.18, linger, crossfade seams, Blob toujours-seekable, coalescing des seeks,
priming iOS, détection mobile + encodes -m, chemin reduced-motion stills-only) est repris
**inchangé**. Chaque écart ci-dessous est marqué `[DARYL adaptation]` dans le code.

| # | Comportement amont | Risque constaté (source) | Adaptation | Validation |
|---|---|---|---|---|
| 1 | `mountScrollWorld()` ne retourne rien — aucun démontage | SPA : quitter la route laisse rAF + listeners + DOM + vidéos vivants | Retourne `{destroy()}` : cancel rAF, retrait de TOUS les listeners (registre), pause+libération des `<video>`, révocation des Blob URLs, retrait du DOM créé et du `<style>` | mount→navigate→unmount : 0 nœud `.sw-*` résiduel, 0 rAF actif |
| 2 | `requestAnimationFrame(raf)` infini, jamais annulé, tourne onglet caché | CPU/batterie en continu, même page cachée ou moteur "démonté" | Flag `destroyed` termine la boucle ; `document.hidden` court-circuite le travail de seek | compteur de seeks à 0 onglet caché |
| 3 | 6 listeners `window` anonymes jamais retirés (scroll, resize, orientationchange, load, pointerdown, touchstart) | Fuites + handlers fantômes après la route | Registre `winListeners` + retrait dans `destroy()` | re-mount ×10 sans accumulation |
| 4 | `URL.createObjectURL` jamais révoqué ; clips jamais déchargés | Mémoire : chaque clip Blob reste pour toujours | URLs suivies, révoquées au destroy ; `video.src` retiré + `load()` | mesure mémoire avant/après destroy |
| 5 | Aucune garde de double montage (seul le CSS est gardé) | React StrictMode/HMR : DOM+listeners+rAF doublés | Garde `_swMounted` sur le conteneur (retourne le handle existant) | StrictMode dev : 1 seul montage effectif |
| 6 | CSS injecté style **`html,body{margin;background;overflow-x}`** | Fuite globale : écraserait le thème du site hôte | Règle supprimée ; la route hôte possède son fond ; reste du CSS namespacé `.sw-*` + `@layer` (amont) conservé | autres routes visuellement intactes après visite |
| 7 | Échec de clip : catch silencieux, poster conservé | L'hôte ne peut pas informer honnêtement le visiteur | `CustomEvent('sw-clip-error')` sur le conteneur → note UI véridique (« motion unavailable — still frames shown ») | test avec clip 404 |
| 8 | Pas de contrôle de sortie | Piège au scroll pour clavier/AT | Bouton `skip` fixe, focusable, dans l'hôte React | navigation clavier |
| 9 | Topbar/brand/nav/copy/CTA/particules (meubles de landing page) | L'expérience doit révéler, pas expliquer (brief) ; particules = coût/frame + esthétique jouet | DOM et CSS de ces blocs non repris ; dots de navigation conservés (+ `aria-label` ajouté) ; hint « scroll » conservé | — décision créative documentée |
| 10 | Thème par défaut crème/violet (`#F5EDE0`) | Direction artistique DARYL | Tokens par défaut graphite/ambre (mêmes variables `--sw-*` amont, surchargeables) | captures |

Non modifié (documenté) : pas de déchargement des clips distants (3 clips / ~6 MB — sans
objet à cette échelle, l'amont ne le fait pas non plus) ; `object-position` et le recadrage
portrait amont conservés ; le chemin reduced-motion amont (les clips ne sont JAMAIS
téléchargés, stills en cross-dissolve) conservé tel quel — c'est aussi le fallback statique.
