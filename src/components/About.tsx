import { motion } from "motion/react";
import { Users, Shield } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

export function About() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-[#FAFAFA]" id="sobre" aria-labelledby="sobre-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 id="sobre-heading" className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">
            Sobre o Fala.AI
          </h2>
          <p className="text-[#4A4A4A] max-w-3xl mx-auto text-xl leading-relaxed">
            Somos uma startup de impacto social dedicada a criar tecnologia assistiva que transforma vidas. 
            Nossa missão é dar voz e autonomia a pessoas com dificuldades de fala.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.article
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
            className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all border-2 border-[#E0E0E0] focus-within:ring-2 focus-within:ring-[#50B1CF]"
            aria-labelledby="admin-heading"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#50B1CF] mb-6" aria-hidden="true">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 id="admin-heading" className="mb-4 text-[#172252] text-2xl font-bold">
              Admin (Fonoaudióloga)
            </h3>
            <ul className="space-y-3 text-[#4A4A4A] text-lg" role="list">
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Gerencia grids personalizadas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Personaliza sessões individualizadas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Acessa relatórios de progresso</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Sessões colaborativas em tempo real</span>
              </li>
            </ul>
          </motion.article>

          <motion.article
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all border-2 border-[#E0E0E0] focus-within:ring-2 focus-within:ring-[#50B1CF]"
            aria-labelledby="paciente-heading"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#7468F4] mb-6" aria-hidden="true">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 id="paciente-heading" className="mb-4 text-[#7468F4] text-2xl font-bold">
              Paciente
            </h3>
            <ul className="space-y-3 text-[#4A4A4A] text-lg" role="list">
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Interface intuitiva e acessível</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Funciona completamente offline</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Modo colaborativo via socket</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-[#038A42]" aria-hidden="true">✓</span>
                <span>Fácil de usar para todos</span>
              </li>
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}