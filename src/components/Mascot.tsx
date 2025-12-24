import { motion } from "motion/react";
import mascotIcon from "figma:asset/09f4aa9565ae6cdcbfe82028f2acb821ea0180ab.png";
import { useAnimation } from "../hooks/useAnimation";

export function Mascot() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative gradient circles */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#418BFF]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#3DD6D0]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center order-2 md:order-1"
            initial={animationsEnabled ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          >
            <motion.div
              className="relative"
              animate={animationsEnabled ? { y: [0, -15, 0] } : { y: 0 }}
              transition={animationsEnabled ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            >
              <img 
                src={mascotIcon}
                alt="Mascote Lontra do Fala.AI"
                className="w-full max-w-md"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={animationsEnabled ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
            className="order-1 md:order-2 text-center md:text-left"
          >
            <h2 className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">Conheça a Lontra</h2>
            <p className="text-[#4A4A4A] text-xl leading-relaxed mb-6">
              A Lontra é mais que uma mascote — ela é a companheira que guia, acolhe e facilita 
              a experiência do usuário em cada etapa da comunicação.
            </p>
            <p className="text-[#666666] text-lg leading-relaxed mb-8">
              Com poses amigáveis e expressões que transmitem afeto, ela torna o Fala.AI 
              uma experiência mais humana e acessível para todos.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <span className="px-6 py-3 border-2 border-[#50B1CF] text-[#172252] rounded-full hover:bg-[#50B1CF]/5 transition-colors">
                Amigável
              </span>
              <span className="px-6 py-3 border-2 border-[#7468F4] text-[#172252] rounded-full hover:bg-[#7468F4]/5 transition-colors">
                Educacional
              </span>
              <span className="px-6 py-3 border-2 border-[#FF8C42] text-[#172252] rounded-full hover:bg-[#FF8C42]/5 transition-colors">
                Inclusiva
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}