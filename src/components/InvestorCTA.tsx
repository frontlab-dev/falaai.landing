import { motion } from "motion/react";
import { Button } from "./ui/button";
import { TrendingUp, Mail } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

export function InvestorCTA() {
  const { animationsEnabled } = useAnimation();

  const handleCTAClick = () => {
    const element = document.querySelector("#contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section 
      className="py-24 bg-gradient-to-br from-[#172252] via-[#7468F4] to-[#50B1CF] relative overflow-hidden" 
      id="investidores"
      aria-labelledby="investidores-heading"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center text-white"
        >
          <TrendingUp className="w-16 h-16 mx-auto mb-8 text-white" aria-hidden="true" />
          
          <h2 id="investidores-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Oportunidade de Investimento
          </h2>
          
          <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Seja parte da revolução na comunicação assistiva. Tecnologia de impacto social com potencial de escala global.
          </p>

          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-4xl mb-2">2,7M+</p>
              <p className="text-white/80 text-sm">Brasileiros com dificuldade de fala</p>
              <p className="text-white/60 text-xs mt-2">Fonte: IBGE Censo 2022</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-4xl mb-2">R$ 1B+</p>
              <p className="text-white/80 text-sm">Mercado potencial no Brasil</p>
              <p className="text-white/60 text-xs mt-2">Valor estimado</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
              <p className="text-4xl mb-2">Global</p>
              <p className="text-white/80 text-sm">Expansão internacional planejada</p>
              <p className="text-white/60 text-xs mt-2">Mercado em crescimento</p>
            </div>
          </motion.div>

          {/* Fontes dos dados */}
          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
            className="mt-8 mb-12 text-center"
          >
            <details className="inline-block">
              <summary className="text-white/70 text-sm cursor-pointer hover:text-white/90 transition-colors list-none">
                <span className="underline">Fontes dos dados</span>
              </summary>
              <div className="mt-4 text-left bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 max-w-2xl mx-auto">
                <ul className="space-y-2 text-white/80 text-xs">
                  <li>
                    <strong>Brasileiros com dificuldade de fala:</strong> Dados do IBGE Censo Demográfico 2022 indicam aproximadamente 2,7 milhões de pessoas no Brasil com dificuldade permanente para se comunicar. 
                    <br />
                    <a 
                      href="https://www.ibge.gov.br/biblioteca/visualizacao/livros/liv102178.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white/90 underline hover:text-white transition-colors"
                    >
                      IBGE - Censo 2022
                    </a>
                  </li>
                  <li>
                    <strong>Mercado potencial:</strong> Estimativa conservadora baseada em análises do mercado global de tecnologias assistivas (estimado em aproximadamente US$ 100 bilhões), considerando que o mercado brasileiro pode representar cerca de 1% do mercado global.
                  </li>
                  <li>
                    <strong>Expansão internacional:</strong> O mercado global de tecnologia assistiva está em crescimento, com projeções de expansão contínua nos próximos anos.
                  </li>
                </ul>
              </div>
            </details>
          </motion.div>

          <motion.div
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
          >
            <Button 
              size="lg" 
              className="bg-white text-[#172252] hover:bg-[#FAFAFA] shadow-2xl hover:shadow-3xl transition-all px-10 py-7 text-xl rounded-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#7468F4]"
              onClick={handleCTAClick}
              aria-label="Entrar em contato sobre oportunidades de investimento"
            >
              <Mail className="w-6 h-6 mr-3" aria-hidden="true" />
              Quero investir
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}