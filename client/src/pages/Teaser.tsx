import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

// Vidéo à placer dans client/public/
const TEASER_VIDEO_SRC = "/Daryl-Evolution-Feb-21-23-12-26.mp4";

export default function Teaser() {
  const [, setLocation] = useLocation();

  const goToHome = () => setLocation("/home");

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
        />
      </div>
      <div className="flex-shrink-0 flex justify-end py-4 px-6 bg-background/80 backdrop-blur-sm border-t border-border/50">
        <Button
          variant="secondary"
          size="sm"
          className="opacity-90 hover:opacity-100"
          onClick={goToHome}
        >
          Passer
        </Button>
      </div>
    </div>
  );
}
