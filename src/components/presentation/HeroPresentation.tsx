import { motion } from "motion/react";
import { Button } from "../ui/button";
import logoOtter from "figma:asset/a5e1675c7d639d7b08f95b33882e1535d866ec7c.png";

interface HeroPresentationProps {
  animationsEnabled: boolean;
  onCTAClick: (sectionId: string) => void;
}

export function HeroPresentation({ animationsEnabled, onCTAClick }: HeroPresentationProps) {
  return (
    <section 
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-br from-[#50B1CF] to-[#7468F4] min-h-[90vh] flex items-center pt-20"
      aria-label="Seção principal - Hero"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-white mb-6 text-4xl md:text-5xl lg:text-6xl"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationsEnabled ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
            >
              Tecnologia que dá voz a quem precisa
            </motion.h1>
            
            <motion.p 
              className="text-white text-xl md:text-2xl mb-10 leading-relaxed"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            >
              Comunicação assistiva simples, inclusiva e colaborativa — para pacientes e fonoaudiólogas.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={animationsEnabled ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
            >
              <Button 
                size="lg" 
                className="bg-[#FAFAFA] text-[#172252] hover:bg-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg rounded-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#50B1CF]"
                onClick={() => onCTAClick("#contato")}
                aria-label="Ir para formulário de contato para testar o Fala.AI"
              >
                Quero testar
              </Button>
              <Button 
                size="lg" 
                className="bg-[#172252] text-white border-none hover:bg-[#2D3A6E] shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg rounded-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#7468F4]"
                onClick={() => onCTAClick("#investidores")}
                aria-label="Ir para seção de investidores"
              >
                Sou investidor
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center items-center"
            initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={animationsEnabled ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
          >
            <motion.img 
              src={logoOtter}
              alt="Mascote Lontra do Fala.AI - personagem amigável representando a marca"
              className="w-full max-w-lg drop-shadow-2xl"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              animate={animationsEnabled ? { y: [0, -20, 0] } : { y: 0 }}
              transition={animationsEnabled ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#FAFAFA"/>
        </svg>
      </div>
    </section>
  );
}


