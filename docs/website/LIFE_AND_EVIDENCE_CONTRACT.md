# Contrat des deux registres — LIFE & EVIDENCE

Fondement : `DARYL-WORLD-BIBLE.md` v3 §2 (approuvée). Version exécutable :
`client/src/world/contracts.ts`. Ce contrat lie **toutes** les phases futures.
En Phase 0, aucun élément d'aucun registre n'existe — seul le contrat existe.

> Life gives presence. Evidence gives trust. Both are required. Neither replaces the other.

## Registre VIE (présence)

Ambiant, physique, atmosphérique : lumière, souffle, inertie, profondeur.

| Règle | Obligation |
|---|---|
| Ne prétend rien | Un élément vie ne représente JAMAIS une activité de DARYL — pas de faux logs, fausses métriques, faux « travail en cours », pas de télémétrie trompeuse |
| Léger | Throttlé, suspendu quand l'onglet est caché, budget CPU/batterie borné |
| Dégradable | Inerte sous `prefers-reduced-motion` et `save-data` (via `useExperienceCapabilities`) |
| Déterminisme | Permis seulement s'il sert un but réel ; jamais pour simuler une activité système |
| Sans données | La vie porte de la matière (lumière, mouvement), jamais de contenu chiffré/factuel |

## Registre PREUVE (confiance)

Tout ce qui se présente comme une action de DARYL.

| Règle | Obligation |
|---|---|
| Fondé | Chaque élément correspond à une entrée réelle (shard scellé rejoué, action live, ou démonstration) — jamais inventé |
| Étiqueté honnêtement | `replayed` n'est JAMAIS présenté comme live ; `demonstration` n'est JAMAIS présentée comme réelle (types `EvidenceSource`) |
| Inspectable | Le visiteur peut ouvrir l'entrée qui fonde l'élément (timestamp, hash, prédécesseur) |
| Arrêtable | Les preuves animées sont pausables là où c'est pertinent |
| Attribuable | Chaque preuve porte quel acteur/état l'a produite (LOI 2 de la Bible) |
| Silence honnête | Là où aucune preuve n'existe : immobilité et obscurité — jamais de mouvement de remplissage (LOI 3) |

## Interdits absolus (les deux registres)

1. Aucun élément n'appartient aux deux registres à la fois.
2. Aucun élément EVIDENCE n'est construit avant la Phase 2 (le moteur de preuve).
3. La frontière est vérifiée par `assertRegister()` avant montage de tout élément du stage.
4. Le registre VIE ne migre jamais vers EVIDENCE « parce que c'est joli » : une ambiance qui se met
   à impliquer une activité réelle change de registre et doit alors satisfaire toutes les
   obligations de preuve.
5. Garde anti-sur-justification (Bible v3 §5) : ne pas faire de chaque mouvement une preuve.
   L'atmosphère n'est pas de l'évidence et n'a pas à l'être.

## Application par phase

- **Phase 0 (fait)** : contrat défini (ce document + `contracts.ts`), stage vide réservé
  (`#experience-stage`), capacités observables (`useExperienceCapabilities`). Aucun élément.
- **Phase 1** : registre VIE uniquement (souffle, spine). Chaque élément déclare `register: "life"`.
- **Phase 2** : premier registre EVIDENCE (shards réels exportés, rejoués). Chaque élément passe
  `assertRegister` et expose son inspection.
- **Phase 3+** : la chaîne du visiteur = EVIDENCE `live`, locale, consentie, effaçable.
