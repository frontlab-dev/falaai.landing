import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Type, Plus, Minus, RotateCcw, X, Hand, Scan } from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';
import { useAnimation } from '../hooks/useAnimation';

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { highContrast, toggleHighContrast, fontSize, increaseFontSize, decreaseFontSize, resetFontSize, librasEnabled, toggleLibras, faceNavigationEnabled, toggleFaceNavigation } = useAccessibility();
  const { animationsEnabled } = useAnimation();

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Fechar ferramentas de acessibilidade" : "Abrir ferramentas de acessibilidade"}
        aria-expanded={isOpen}
        className="fixed bottom-6 left-6 z-[90000] bg-[#172252] hover:bg-[#0F1533] text-white p-4 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2"
        title="Ferramentas de Acessibilidade"
      >
        {isOpen ? (
          <X className="w-6 h-6" aria-hidden="true" />
        ) : (
          <Eye className="w-6 h-6" aria-hidden="true" />
        )}
      </button>

      {/* Painel de ferramentas */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={animationsEnabled ? { opacity: 0, x: -20, y: 20 } : { opacity: 1 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={animationsEnabled ? { opacity: 0, x: -20, y: 20 } : { opacity: 0 }}
            transition={animationsEnabled ? { duration: 0.2 } : { duration: 0 }}
            className="fixed bottom-26 left-6 z-[90000] bg-white rounded-2xl shadow-2xl border-2 border-[#E6E6E6] p-6 max-w-sm"
            role="dialog"
            aria-label="Painel de acessibilidade"
          >
            <h3 className="text-lg font-bold text-[#172252] mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Acessibilidade
            </h3>

            {/* Alto Contraste */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#2E2E2E] flex items-center gap-2">
                  {highContrast ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  Alto Contraste
                </span>
              </label>
              <button
                onClick={toggleHighContrast}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2 ${
                  highContrast
                    ? 'bg-[#172252] text-white hover:bg-[#0F1533]'
                    : 'bg-[#F5F5F5] text-[#2E2E2E] hover:bg-[#E6E6E6]'
                }`}
                aria-pressed={highContrast}
              >
                {highContrast ? 'Desativar' : 'Ativar'}
              </button>
            </div>

            {/* Tamanho da fonte */}
            <div className="mb-6">
              <label className="text-sm font-bold text-[#2E2E2E] flex items-center gap-2 mb-3">
                <Type className="w-4 h-4" />
                Tamanho da Fonte
              </label>
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 80}
                  className="flex-1 px-4 py-3 bg-[#F5F5F5] hover:bg-[#E6E6E6] disabled:opacity-40 disabled:cursor-not-allowed text-[#2E2E2E] rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2 flex items-center justify-center gap-2"
                  aria-label="Diminuir fonte"
                >
                  <Minus className="w-4 h-4" />
                  <span className="text-sm">A</span>
                </button>
                <button
                  onClick={resetFontSize}
                  className="px-4 py-3 bg-[#F5F5F5] hover:bg-[#E6E6E6] text-[#2E2E2E] rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2"
                  aria-label="Resetar tamanho da fonte"
                  title="Resetar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize >= 150}
                  className="flex-1 px-4 py-3 bg-[#F5F5F5] hover:bg-[#E6E6E6] disabled:opacity-40 disabled:cursor-not-allowed text-[#2E2E2E] rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2 flex items-center justify-center gap-2"
                  aria-label="Aumentar fonte"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-lg">A</span>
                </button>
              </div>
              <p className="text-xs text-[#5A5A5A] text-center" aria-live="polite">
                Tamanho atual: {fontSize}%
              </p>
            </div>

            {/* Libras - VLibras */}
            <div className="mb-6">
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#2E2E2E] flex items-center gap-2">
                  <Hand className="w-4 h-4" />
                  Tradução em Libras
                </span>
              </label>
              <button
                onClick={toggleLibras}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2 ${
                  librasEnabled
                    ? 'bg-[#7468F4] text-white hover:bg-[#5E52D9]'
                    : 'bg-[#F5F5F5] text-[#2E2E2E] hover:bg-[#E6E6E6]'
                }`}
                aria-pressed={librasEnabled}
                aria-label={librasEnabled ? 'Desativar tradução em Libras' : 'Ativar tradução em Libras'}
              >
                {librasEnabled ? 'Desativar' : 'Ativar'}
              </button>
              {librasEnabled && (
                <p className="text-xs text-[#5A5A5A] mt-2 text-center">
                  Widget VLibras ativado
                </p>
              )}
            </div>

            {/* Navegação Facial */}
            <div>
              <label className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#2E2E2E] flex items-center gap-2">
                  <Scan className="w-4 h-4" />
                  Navegação Facial
                </span>
              </label>
              <button
                onClick={toggleFaceNavigation}
                className={`w-full px-4 py-3 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#3DD6D0] focus:ring-offset-2 ${
                  faceNavigationEnabled
                    ? 'bg-[#7468F4] text-white hover:bg-[#5E52D9]'
                    : 'bg-[#F5F5F5] text-[#2E2E2E] hover:bg-[#E6E6E6]'
                }`}
                aria-pressed={faceNavigationEnabled}
                aria-label={faceNavigationEnabled ? 'Desativar navegação facial' : 'Ativar navegação facial'}
              >
                {faceNavigationEnabled ? 'Desativar' : 'Ativar'}
              </button>
              {faceNavigationEnabled && (
                <p className="text-xs text-[#5A5A5A] mt-2 text-center">
                  Navegação facial ativada
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}