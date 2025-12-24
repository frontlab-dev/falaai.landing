import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Cookie, X } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

export function CookieConsent() {
  const { animationsEnabled } = useAnimation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já aceitou os cookies
    const hasConsent = localStorage.getItem("fala-ai-cookie-consent");
    if (!hasConsent) {
      // Mostra o banner após 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("fala-ai-cookie-consent", "accepted");
    handleClose();
  };

  const handleReject = () => {
    localStorage.setItem("fala-ai-cookie-consent", "rejected");
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={animationsEnabled ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
        animate={isClosing ? (animationsEnabled ? { y: 100, opacity: 0 } : { y: 0, opacity: 0 }) : { y: 0, opacity: 1 }}
        exit={animationsEnabled ? { y: 100, opacity: 0 } : { opacity: 0 }}
        transition={animationsEnabled ? { duration: 0.3 } : { duration: 0 }}
        className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[60] bg-white rounded-2xl shadow-2xl border-2 border-[#E6E6E6]"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-[#418BFF]/10 p-3 rounded-xl flex-shrink-0">
              <Cookie className="w-6 h-6 text-[#0D5FD9]" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h3 id="cookie-consent-title" className="text-lg text-[#1A1A1A] font-bold mb-2">
                Cookies e Privacidade
              </h3>
              <p id="cookie-consent-description" className="text-[#5A5A5A] text-sm leading-relaxed">
                Utilizamos cookies essenciais para garantir a melhor experiência em nosso site e respeitar suas preferências de acessibilidade. Não coletamos dados pessoais sem seu consentimento.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-[#5A5A5A] hover:text-[#1A1A1A] transition-colors cursor-pointer p-1 flex-shrink-0"
              aria-label="Fechar banner de cookies"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              className="flex-1 bg-[#0D5FD9] hover:bg-[#0A4BAD] text-white rounded-xl"
            >
              Aceitar
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              className="flex-1 border-2 border-[#E6E6E6] hover:border-[#0D5FD9] text-[#2E2E2E] rounded-xl"
            >
              Recusar
            </Button>
          </div>

          <p className="text-xs text-[#5A5A5A] mt-4 text-center">
            Ao continuar navegando, você concorda com nossa{" "}
            <a href="#" className="text-[#0D5FD9] hover:underline cursor-pointer">
              Política de Privacidade
            </a>
          </p>
        </div>

        {/* Decorative border gradient */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#418BFF]/20 to-[#007F86]/20 -z-10 blur-xl"></div>
      </motion.div>
    </AnimatePresence>
  );
}