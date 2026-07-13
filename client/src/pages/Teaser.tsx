import { useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/lib/i18n";

// Vidéo à placer dans client/public/
const TEASER_VIDEO_SRC = "/Daryl-Evolution-Feb-21-23-12-26.mp4";

export default function Teaser() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  const goToHome = () => setLocation("/home");

  // Le teaser est purement du mouvement : si l'utilisateur préfère
  // "reduced motion", on ne lance pas la vidéo — on va directement à /home.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLocation("/home", { replace: true });
    }
  }, [setLocation]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex-1 relative min-h-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={TEASER_VIDEO_SRC}
          autoPlay
          muted
          playsInline
          onEnded={goToHome}
          onError={goToHome}
          aria-hidden="true"
        />
      </div>
      <div className="flex-shrink-0 flex justify-end py-4 px-6 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <Button
          variant="secondary"
          size="sm"
          className="opacity-90 hover:opacity-100"
          onClick={goToHome}
          data-testid="button-teaser-skip"
        >
          {t("teaser.skip")}
        </Button>
      </div>
    </div>
  );
}
