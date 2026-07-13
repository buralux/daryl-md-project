import { type ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

/**
 * ExperienceShell — frontière de l'expérience persistante.
 *
 * Phase 0 : frontière vide (voir docs/website/PHASE_0_ARCHITECTURE.md).
 * Phase 1 : registre VIE uniquement (docs/website/PHASE_1_LIFE_DESIGN.md).
 *
 * Le stage contient deux éléments purement atmosphériques :
 *   .life-field  — champ de lumière chaude, très faible, qui respire (~14s)
 *   .life-line   — le premier indice de continuité spatiale : un filament
 *                  vertical discret, respiration décalée (~10s)
 *
 * Registre VIE (contrat: world/contracts.ts) : ces éléments ne prétendent
 * RIEN — pas d'activité d'agent, pas de télémétrie, pas de preuve. De la
 * matière (lumière, rythme), jamais des données.
 *
 * Trois états de mouvement (attribut data-motion sur le stage) :
 *   static       — reduced-motion, save-data : présent mais immobile
 *   ambient      — défaut : respiration basse fréquence, basse amplitude
 *   transitional — bref éveil (~900ms) au changement de route, puis retour
 *                  à ambient. Ne suggère pas qu'une navigation est une
 *                  "exécution DARYL" — seulement que le lieu est continu.
 *
 * Cycle de vie : listeners (visibilitychange) et timers nettoyés ; le shell
 * ne se démonte jamais entre routes, donc aucun risque de double
 * enregistrement (monté une seule fois au-dessus du Router).
 * Onglet caché : data-hidden pause toutes les animations (animation-play-state).
 */

export interface ExperienceCapabilities {
  reducedMotion: boolean;
  saveData: boolean;
}

/** Capacités observées côté client. SSR-safe : défauts conservateurs (pas de motion). */
export function useExperienceCapabilities(): ExperienceCapabilities {
  const [caps, setCaps] = useState<ExperienceCapabilities>({
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

type MotionState = "static" | "ambient" | "transitional";

export function ExperienceShell({ children }: { children: ReactNode }) {
  const caps = useExperienceCapabilities();
  const [location] = useLocation();
  const [motion, setMotion] = useState<MotionState>("static"); // conservateur au premier rendu
  const [hidden, setHidden] = useState(false);
  const prevLocation = useRef(location);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isStatic = caps.reducedMotion || caps.saveData;

  // État de base : static si contraintes, sinon ambient.
  useEffect(() => {
    setMotion(isStatic ? "static" : "ambient");
  }, [isStatic]);

  // Réponse de route : bref passage en transitional, puis retour à ambient.
  useEffect(() => {
    if (prevLocation.current === location) return;
    prevLocation.current = location;
    if (isStatic) return;
    setMotion("transitional");
    if (settleTimer.current) clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => setMotion("ambient"), 900);
    return () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [location, isStatic]);

  // Onglet caché : pause explicite des animations (budget batterie/CPU).
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <>
      {/* Stage : décoratif, hors arbre d'accessibilité, transparent au pointeur/focus. */}
      <div
        id="experience-stage"
        aria-hidden="true"
        data-testid="experience-stage"
        data-motion={motion}
        data-hidden={hidden || undefined}
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      >
        <div className="life-field" />
        <div className="life-line" />
      </div>
      {/* Contenu de route — toujours au-dessus du stage. */}
      <div className="relative z-10">{children}</div>
    </>
  );
}
