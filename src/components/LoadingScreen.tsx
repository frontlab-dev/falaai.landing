import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import logo from "figma:asset/09f4aa9565ae6cdcbfe82028f2acb821ea0180ab.png";
import { useAnimation } from "./AnimationContext";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const { animationsEnabled } = useAnimation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simula o progresso de carregamento
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={animationsEnabled ? { opacity: 0 } : { opacity: 1 }}
        transition={animationsEnabled ? { duration: 0.5 } : { duration: 0 }}
        className="fixed inset-0 z-[100] bg-gradient-to-br from-[#418BFF] to-[#007F86] flex flex-col items-center justify-center"
      >
        <motion.div
          initial={animationsEnabled ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={animationsEnabled ? { duration: 0.5 } : { duration: 0 }}
          className="text-center"
        >
          <motion.img
            src={logo}
            alt="Fala.AI"
            className="h-32 w-auto mb-8 mx-auto"
            animate={animationsEnabled ? { 
              y: [0, -10, 0],
              scale: [1, 1.05, 1]
            } : {}}
            transition={animationsEnabled ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0 }}
          />

          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animationsEnabled ? { delay: 0.3, duration: 0.5 } : { duration: 0 }}
            className="space-y-4"
          >
            <h2 className="text-3xl text-white font-bold">
              Fala.AI
            </h2>
            <p className="text-white/80 text-lg">
              Tecnologia que dá voz a quem precisa
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animationsEnabled ? { delay: 0.5, duration: 0.5 } : { duration: 0 }}
            className="mt-12 w-64 mx-auto"
          >
            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="text-white/60 text-sm mt-2">
              {progress}%
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <motion.div
            animate={animationsEnabled ? {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            } : {}}
            transition={animationsEnabled ? {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            } : { duration: 0 }}
            className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"
          />
          <motion.div
            animate={animationsEnabled ? {
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2]
            } : {}}
            transition={animationsEnabled ? {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            } : { duration: 0 }}
            className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}