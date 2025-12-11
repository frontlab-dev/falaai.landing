import { useEffect, useState } from "react";
import { useAnimation } from "./AnimationContext";
import { useAccessibility } from "./AccessibilityContext";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Eye } from "lucide-react";

export function AccessibilityStatus() {
  const { animationsEnabled } = useAnimation();
  const { highContrast } = useAccessibility();
  const [showStatus, setShowStatus] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      setStatusMessage("Preferência de movimento detectada");
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    setStatusMessage(animationsEnabled ? "Animações ativas" : "Animações pausadas");
    setShowStatus(true);
    const timer = setTimeout(() => setShowStatus(false), 3000);
    return () => clearTimeout(timer);
  }, [animationsEnabled]);

  useEffect(() => {
    setStatusMessage(highContrast ? "Alto contraste ativado" : "Alto contraste desativado");
    setShowStatus(true);
    const timer = setTimeout(() => setShowStatus(false), 3000);
    return () => clearTimeout(timer);
  }, [highContrast]);

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-6 right-24 z-40 bg-white border-2 border-[#418BFF] rounded-xl shadow-xl px-4 py-3 max-w-xs"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#1E8B56] flex-shrink-0" />
            <p className="text-sm text-[#1A1A1A] font-bold">
              {statusMessage}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}