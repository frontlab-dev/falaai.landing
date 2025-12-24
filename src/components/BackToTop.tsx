import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAnimation } from "../hooks/useAnimation";

export function BackToTop() {
  const { animationsEnabled } = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={animationsEnabled ? { duration: 0.2 } : { duration: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-[100000] bg-[#7468F4] hover:bg-[#172252] text-white p-4 rounded-full shadow-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#50B1CF] focus:ring-offset-2"
          aria-label="Voltar ao topo da página"
          title="Voltar ao topo"
        >
          <ArrowUp className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}