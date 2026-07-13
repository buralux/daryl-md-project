import { type ReactNode, useEffect, useState } from "react";

/**
 * ExperienceShell — la frontière de l'expérience persistante (Phase 0).
 *
 * Rôle : définir OÙ vivra la future couche-monde, pas la construire.
 * Ce composant est monté UNE FOIS, au-dessus du Router : il survit aux
 * changements de route. Il ne rend aujourd'hui aucun visuel.
 *
 * Propriété des couches (contrat de layout, voir docs/website/PHASE_0_ARCHITECTURE.md) :
 *
 *   ┌─ ExperienceShell (persistant, hors Router) ──────────────────┐
 *   │  ┌─ stage (fixed, aria-hidden, pointer-events:none, z-0) ─┐  │  ← future couche-monde
 *   │  │  (vide en Phase 0 — réservé aux registres Life/Evidence)│  │    (enhancement uniquement)
 *   │  └─────────────────────────────────────────────────────────┘  │
 *   │  ┌─ contenu de route (Router → Layout → main#main) ───────┐  │  ← contenu réel, DOM
 *   │  │  source de vérité SEO / accessibilité / no-JS          │  │    sémantique, prérendu
 *   │  └─────────────────────────────────────────────────────────┘  │
 *   └───────────────────────────────────────────────────────────────┘
 *
 * Règles que les phases futures DOIVENT respecter :
 *  - Le contenu de route reste lisible et complet sans le stage (fallback
 *    statique = édition à part entière, jamais une excuse).
 *  - Le stage est aria-hidden et n'intercepte jamais le pointeur ni le focus.
 *  - Le stage ne bloque jamais le chargement du contenu (chargement paresseux,
 *    hors chemin critique).
 *  - reduced-motion / save-data / absence de capacités ⇒ stage inerte (§ capabilities).
 *  - Tout effet monté par le stage est nettoyé dans son cleanup (pas de fuites
 *    entre routes — le shell ne se démonte pas, ses enfants si).
 *  - Analytics : aucune télémétrie ajoutée par le stage sans décision explicite
 *    (frontière analytics = Cloudflare Insights existant, rien d'autre).
 */

export interface ExperienceCapabilities {
  /** L'utilisateur préfère un mouvement réduit (media query, réactive). */
  reducedMotion: boolean;
  /** L'utilisateur a activé l'économie de données. */
  saveData: boolean;
}

/** Capacités observées côté client. SSR-safe : valeurs conservatrices par défaut. */
export function useExperienceCapabilities(): ExperienceCapabilities {
  const [caps, setCaps] = useState<ExperienceCapabilities>({
    // Défauts conservateurs (SSR / premier rendu) : pas de motion tant qu'on ne sait pas.
    reducedMotion: true,
    saveData: false,
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as { connection?: { saveData?: boolean } }).connection;
    const update = () =>
      setCaps({
        reducedMotion: mq.matches,
        saveData: connection?.saveData === true,
      });
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return caps;
}

export function ExperienceShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/*
        Le "stage" : emplacement réservé de la future couche-monde.
        Vide en Phase 0 (aucun coût, aucun visuel). Position fixe derrière le
        contenu, invisible pour l'accessibilité, transparent au pointeur.
      */}
      <div
        id="experience-stage"
        aria-hidden="true"
        data-testid="experience-stage"
        className="fixed inset-0 z-0 pointer-events-none"
      />
      {/* Contenu de route — toujours au-dessus du stage. */}
      <div className="relative z-10">{children}</div>
    </>
  );
}
