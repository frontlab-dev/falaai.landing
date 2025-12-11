import { motion } from "motion/react";
import { MessageSquare, PenTool, Users2, Sparkles, WifiOff, Smile } from "lucide-react";
import { useAnimation } from "./AnimationContext";

const benefits = [
  {
    icon: MessageSquare,
    title: "Comunicação acessível",
    description: "Interface intuitiva que permite comunicação efetiva",
  },
  {
    icon: PenTool,
    title: "Grids personalizáveis",
    description: "Adaptação específica para cada necessidade",
  },
  {
    icon: Users2,
    title: "Modo colaborativo",
    description: "Sessões em tempo real entre terapeuta e paciente",
  },
  {
    icon: Sparkles,
    title: "Interface inclusiva",
    description: "Design pensado para acessibilidade total",
  },
  {
    icon: WifiOff,
    title: "Disponível offline",
    description: "Funciona sem conexão à internet",
  },
  {
    icon: Smile,
    title: "Fácil para todos",
    description: "Tecnologia amigável para qualquer idade",
  },
];

export function Benefits() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-[#FAFAFA]" id="beneficios" aria-labelledby="beneficios-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 id="beneficios-heading" className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">
            Benefícios
          </h2>
          <p className="text-[#4A4A4A] max-w-3xl mx-auto text-xl">
            Por que escolher o Fala.AI para comunicação assistiva
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              className="bg-white p-6 rounded-3xl border-2 border-[#E0E0E0] hover:shadow-xl transition-all"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#50B1CF] mb-4">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="mb-3 text-[#172252] text-xl font-bold">{benefit.title}</h3>
              <p className="text-[#666666] leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}