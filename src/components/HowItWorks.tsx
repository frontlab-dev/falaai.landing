import { motion } from "motion/react";
import { Grid3x3, Users2, WifiOff, Heart } from "lucide-react";
import { useAnimation } from "./AnimationContext";

const steps = [
  {
    icon: Grid3x3,
    title: "Grids personalizadas",
    description: "Fonoaudiólogas criam grids específicas para cada paciente.",
    color: "#50B1CF",
  },
  {
    icon: Users2,
    title: "Sessão colaborativa",
    description: "Trabalhe em tempo real com terapeuta e paciente conectados.",
    color: "#7468F4",
  },
  {
    icon: WifiOff,
    title: "Acesso offline",
    description: "Funciona sem internet. Comunicação nunca para.",
    color: "#172252",
  },
  {
    icon: Heart,
    title: "Inclusivo e acessível",
    description: "Interface pensada para todos, com a Lontra guiando o caminho.",
    color: "#50B1CF",
  },
];

export function HowItWorks() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-white relative" id="como-funciona" aria-labelledby="como-funciona-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 id="como-funciona-heading" className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">
            Como Funciona
          </h2>
          <p className="text-[#4A4A4A] max-w-3xl mx-auto text-xl">
            Conectando profissionais e pacientes através de tecnologia acessível
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              className="text-center"
            >
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6 shadow-lg"
                style={{ backgroundColor: step.color }}
              >
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h4 className="mb-3 text-[#172252] text-xl font-bold">{step.title}</h4>
              <p className="text-[#666666] leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}