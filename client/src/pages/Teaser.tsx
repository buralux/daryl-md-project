import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

// Vidéo à placer dans client/public/
const TEASER_VIDEO_SRC = "/Daryl-Evolution-Feb-21-23-12-26.mp4";

export default function Teaser() {
  const [, setLocation] = useLocation();

  const goToHome = () => setLocation("/home");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={TEASER_VIDEO_SRC}
        autoPlay
        muted
        playsInline
        onEnded={goToHome}
      />
      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-8 right-8 z-10 opacity-80 hover:opacity-100 backdrop-blur-sm"
        onClick={goToHome}
      >
        Passer
      </Button>
    </div>
  );
}
