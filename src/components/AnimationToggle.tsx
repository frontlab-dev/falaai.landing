import { Pause, Play } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

export function AnimationToggle() {
  const { animationsEnabled, toggleAnimations } = useAnimation();

  return (
    <button
      onClick={toggleAnimations}
      aria-label={animationsEnabled ? "Pausar animações" : "Retomar animações"}
      className="fixed bottom-6 right-6 z-50 bg-[#418BFF] hover:bg-[#007F86] text-white p-4 rounded-full shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2"
      title={animationsEnabled ? "Pausar animações" : "Retomar animações"}
    >
      {animationsEnabled ? (
        <Pause className="w-6 h-6" aria-hidden="true" />
      ) : (
        <Play className="w-6 h-6" aria-hidden="true" />
      )}
      <span className="sr-only">
        {animationsEnabled ? "Pausar animações" : "Retomar animações"}
      </span>
    </button>
  );
}
