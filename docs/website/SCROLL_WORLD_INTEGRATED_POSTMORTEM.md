# Postmortem — pourquoi le prototype plein écran (/world-lab) a échoué l'intention produit

Constat factuel (le prototype est conservé pour référence sur `experiment/scroll-world@f32a94b`).

1. **Il remplaçait le site au lieu de le rendre vivant.** /world-lab était une destination :
   un document de défilement synthétique (`.sw-track`, 4.7 vh de haut) dont la hauteur ne
   correspondait à AUCUN contenu réel. Le vrai récit DARYL (hero, problème, preuve, DSM,
   how, use cases…) n'existait pas dans l'expérience.
2. **Une porte cinématique, pas une page.** Il fallait « skip » pour atteindre le site —
   l'inverse exact de « le monde soutient le contenu ». Le contrôle skip, requis par la
   sécurité de l'expérience, était le symptôme du problème de conception.
3. **Abstrait au point de ne rien dire de DARYL.** Sans le contenu réel, les trois scènes
   (présence/réponse/reconnaissance) devenaient une lumière dans le noir — esthétiquement
   cohérente, mais qui « pourrait appartenir à n'importe quelle entreprise d'IA ».
4. **« SCROLL » comme message principal** : le seul texte à l'écran était l'affordance —
   preuve que l'expérience n'avait pas de contenu à montrer.
5. Ce qui reste VALIDE de cette étape (réutilisé ici) : le moteur amont réel et ses
   mathématiques de scrub exactes ; nos correctifs de cycle de vie (teardown, rAF, Blob,
   listeners) ; les recettes d'encodage pipeline.md ; le chemin reduced-motion amont ;
   la sélection de variantes mobiles ; les gates Higgsfield et la provenance MIT.

Leçon : Scroll World n'est pas une PAGE à construire, c'est un MOTEUR DE TEMPS à brancher
sur la page existante. Le défilement réel du vrai contenu est la timeline ; le monde vit
DERRIÈRE lui.
