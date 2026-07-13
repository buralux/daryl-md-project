/**
 * Les deux registres — contrat technique (Phase 0).
 *
 * Défini AVANT toute implémentation pour que les phases futures ne puissent
 * pas confondre les registres. Version narrative : docs/website/LIFE_AND_EVIDENCE_CONTRACT.md
 * Fondement créatif : DARYL-WORLD-BIBLE.md v3 §2 (approuvé).
 *
 *   LIFE      donne la présence. Ambiant, physique, ne prétend RIEN.
 *   EVIDENCE  donne la confiance. Correspond à des actions réelles, inspectable.
 *
 * Aucun élément ne peut appartenir aux deux registres.
 * Aucun élément EVIDENCE ne peut être construit en Phase 0.
 */

/** Élément du registre VIE : ambiance sans revendication. */
export interface LifeElement {
  register: "life";
  /**
   * INTERDIT au registre vie :
   *  - impliquer une activité réelle de DARYL (pas de faux logs, fausses
   *    métriques, faux "travail en cours") ;
   *  - toute télémétrie trompeuse ;
   *  - tout coût non borné (les éléments vie sont légers, throttlés,
   *    suspendus quand l'onglet est caché, inertes en reduced-motion/save-data).
   * Le déterminisme (seed) n'est permis que s'il sert un but réel, jamais
   * pour simuler une activité système.
   */
  ambient: true;
  /** Un élément vie ne porte jamais de données — seulement de la matière (lumière, souffle, profondeur). */
  claims: "nothing";
}

/** Source d'un élément du registre PREUVE. L'étiquetage est obligatoire et honnête. */
export type EvidenceSource =
  | { kind: "replayed"; shardRef: string; sealedAt: string } // enregistrement réel rejoué — jamais présenté comme "live"
  | { kind: "live"; occurredAt: string }                     // action réelle en cours — jamais présentée si elle n'a pas lieu
  | { kind: "demonstration"; label: string };                // démonstration explicitement étiquetée — jamais présentée comme réelle

/** Élément du registre PREUVE : ne peut exister sans entrée réelle derrière lui. */
export interface EvidenceElement {
  register: "evidence";
  source: EvidenceSource;
  /** Toute preuve est inspectable : l'entrée qui la fonde est ouvrable par le visiteur. */
  inspectable: true;
  /** Les preuves animées sont arrêtables là où c'est pertinent. */
  pausable: boolean;
  /** Attribution : quel acteur/état a produit l'entrée. */
  attributedTo: string;
}

export type RegisteredElement = LifeElement | EvidenceElement;

/**
 * Garde de registre — les phases futures valident chaque élément du stage
 * avec cette fonction avant montage. En Phase 0 elle n'est appelée nulle part
 * (aucun élément n'existe) ; elle fixe la règle, pas le système.
 */
export function assertRegister(el: RegisteredElement): void {
  if (el.register === "evidence") {
    if (el.source.kind === "replayed" && !el.source.shardRef) {
      throw new Error("EvidenceElement rejoué sans shardRef : interdit (contrat Life/Evidence).");
    }
    if (el.source.kind === "demonstration" && !el.source.label) {
      throw new Error("Démonstration sans étiquette explicite : interdit (contrat Life/Evidence).");
    }
  }
}
