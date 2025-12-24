import { motion } from "motion/react";
import { useAnimation } from "../hooks/useAnimation";
import { Award, Newspaper } from "lucide-react";

export function PressPartners() {
  const { animationsEnabled } = useAnimation();

  const partners = [
    { name: "UFBA", description: "Universidade Federal da Bahia" },
    { name: "SENAI", description: "Hub de Inovação" },
    { name: "Google Startup", description: "Program Partner" },
    { name: "AWS Activate", description: "Startup Program" },
  ];

  const press = [
    {
      outlet: "TechCrunch Brasil",
      headline: "Startup baiana revoluciona comunicação assistiva",
    },
    {
      outlet: "Folha de S.Paulo",
      headline: "Tecnologia dá voz a pessoas com dificuldades de fala",
    },
    {
      outlet: "Estadão",
      headline: "Fala.AI: a startup que transforma vidas através da comunicação",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-[#E6E6E6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Partners Section */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#007F86]/10 p-4 rounded-full">
              <Award className="w-12 h-12 text-[#007F86]" aria-hidden="true" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#172252] font-bold mb-4">
            Parceiros & Apoiadores
          </h2>
          <p className="text-[#666666] text-lg md:text-xl max-w-3xl mx-auto">
            Orgulhosamente apoiados por instituições que acreditam em inovação e impacto social
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
              whileInView={animationsEnabled ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={animationsEnabled ? { duration: 0.4, delay: index * 0.1 } : { duration: 0 }}
              className="flex flex-col items-center justify-center p-6 bg-[#FAFAFA] rounded-2xl border-2 border-[#E0E0E0] hover:border-[#50B1CF] transition-colors"
            >
              <div className="text-2xl text-[#1A1A1A] mb-2 text-center">
                {partner.name}
              </div>
              <div className="text-sm text-[#666666] text-center">
                {partner.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press Section */}
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#50B1CF]/10 p-4 rounded-full">
              <Newspaper className="w-12 h-12 text-[#172252]" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-3xl md:text-4xl text-[#172252] font-bold mb-4">
            Na Mídia
          </h3>
          <p className="text-[#666666] text-lg">
            Veja o que estão falando sobre nós
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {press.map((item, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={animationsEnabled ? { duration: 0.5, delay: index * 0.15 } : { duration: 0 }}
              className="p-6 bg-gradient-to-br from-[#FAFAFA] to-white rounded-2xl border-2 border-[#E0E0E0] hover:shadow-lg transition-shadow"
            >
              <div className="text-[#172252] mb-3">
                {item.outlet}
              </div>
              <p className="text-[#4A4A4A] leading-relaxed">
                &quot;{item.headline}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}