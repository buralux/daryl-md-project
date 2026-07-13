import { useEffect, useRef } from "react";
import { mountSectionScrub, type IntegratedScene } from "./section-scrub";

/**
 * Couche cinématique intégrée (expérience — branche experiment/scroll-world-integrated-page).
 *
 * Structure de couches (INTEGRATION_PLAN corrigé) :
 *   z-0   #experience-stage (Phase 1 — souffle + Ligne, inchangé)
 *   z-[1] CETTE couche (scènes scrubbées DERRIÈRE le contenu, fondues par fenêtre)
 *   z-10  contenu de route réel (sémantique, lisible, navigable)
 *
 * Règles : pointer-events none · aria-hidden · ne possède jamais la hauteur de
 * page · aucun skip nécessaire (la page reste la page) · reduced-motion = aucun
 * clip (posters seuls, gérés par le moteur) · teardown complet au unmount.
 *
 * Clips actuels : substitution procédurale (voir SCROLL_WORLD_GENERATION_LOG) —
 * prouvent le MODÈLE D'INTÉGRATION, pas l'esthétique générée.
 */

const BASE = "/world-integrated";

// Carte section→scène : fenêtres ancrées sur le DOM réel de Home
// (détail complet : docs/website/SCROLL_WORLD_SECTION_SCENE_MAP.md)
const SCENES: IntegratedScene[] = [
  // MOMENT 1 — ARRIVÉE : DARYL existe déjà sous l'interface
  { start: "section-hero", end: "section-problem", clip: `${BASE}/m1.mp4`, clipMobile: `${BASE}/m1-m.mp4`, poster: `${BASE}/m1.png` },
  // MOMENT 2 — SYSTÈME : le produit devient un monde opérant
  { start: "section-dsm", end: "section-how", clip: `${BASE}/m2.mp4`, clipMobile: `${BASE}/m2-m.mp4`, poster: `${BASE}/m2.png` },
  // MOMENT 3 — CONTINUITÉ : ce qui a été fait ne disparaît pas
  { start: "section-roadmap", end: "section-manifesto", clip: `${BASE}/m3.mp4`, clipMobile: `${BASE}/m3-m.mp4`, poster: `${BASE}/m3.png` },
];

export function CinematicBackground() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const handle = mountSectionScrub(host, SCENES);
    return () => handle.destroy();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      data-testid="cinematic-background"
      className="wi-host fixed inset-0 z-[-1] pointer-events-none overflow-hidden"
    />
  );
}
