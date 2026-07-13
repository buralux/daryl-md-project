import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { mountScrollWorld, type ScrollWorldHandle } from "./scrub-engine";

/**
 * /world-lab — EXPÉRIENCE ISOLÉE (branche experiment/scroll-world uniquement).
 * Évalue le vrai moteur Scroll World (voir docs/website/SCROLL_WORLD_*.md).
 * noindex ; hors sitemap ; hors navigation ; supprimable proprement.
 *
 * Clips actuels : PRISE DE SUBSTITUTION TECHNIQUE (procédurale, ffmpeg — voir
 * SCROLL_WORLD_GENERATION_LOG.md). Ils valident le moteur et l'interaction,
 * pas l'esthétique Higgsfield (génération bloquée en attente de GATE 0).
 */

const BASE = "/world-lab";

export default function WorldLab() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [clipError, setClipError] = useState(false);

  useEffect(() => {
    // noindex — route d'expérimentation, jamais indexée.
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex, nofollow";
    document.head.appendChild(robots);
    document.title = "world-lab";

    const host = hostRef.current;
    if (!host) return;

    const onClipError = () => setClipError(true);
    host.addEventListener("sw-clip-error", onClipError);

    const handle: ScrollWorldHandle = mountScrollWorld(host, {
      hint: "scroll",
      atmosphere: true,
      crossfade: 0.08, // Architecture A amont : les legs sont le voyage, pas de connecteurs
      sections: [
        { id: "presence",    label: "",  still: `${BASE}/s1.png`, clip: `${BASE}/s1.mp4`, clipMobile: `${BASE}/s1-m.mp4`, accent: "#E8B87A", scroll: 1.6 },
        { id: "response",    label: "",  still: `${BASE}/s2.png`, clip: `${BASE}/s2.mp4`, clipMobile: `${BASE}/s2-m.mp4`, accent: "#E8B87A", scroll: 1.3 },
        { id: "recognition", label: "",  still: `${BASE}/s3.png`, clip: `${BASE}/s3.mp4`, clipMobile: `${BASE}/s3-m.mp4`, accent: "#E8B87A", scroll: 1.8, linger: 0.4 },
      ],
      connectors: [],
    });

    return () => {
      host.removeEventListener("sw-clip-error", onClipError);
      handle.destroy();
      document.head.removeChild(robots);
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="relative bg-[#0A0B0C] text-[#F1F2F4]">
      {/* Hôte du moteur : le moteur construit son propre DOM dedans. */}
      <div ref={hostRef} data-testid="world-lab-host" />

      {/* Skip — accessible clavier, toujours visible, sort de l'expérience. */}
      <Link
        href="/home"
        data-testid="link-worldlab-skip"
        className="fixed top-5 right-6 z-[200] text-xs uppercase tracking-widest text-[#8A8F98] hover:text-[#F1F2F4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8B87A] px-3 py-2"
      >
        skip
      </Link>

      {/* État d'échec média — honnête : les posters restent, on le dit. */}
      {clipError && (
        <p
          data-testid="text-worldlab-fallback"
          className="fixed bottom-5 left-6 z-[200] text-xs text-[#8A8F98]"
        >
          motion unavailable — still frames shown
        </p>
      )}
    </div>
  );
}
