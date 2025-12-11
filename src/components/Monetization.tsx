import { motion } from "motion/react";
import { CreditCard, Building2, ShoppingBag, Handshake } from "lucide-react";
import { useAnimation } from "./AnimationContext";

const models = [
  {
    icon: CreditCard,
    title: "Assinatura",
    description: "Modelo freemium com recursos básicos gratuitos e planos premium.",
    color: "#418BFF",
  },
  {
    icon: Building2,
    title: "Escolas e Clínicas",
    description: "Licenças corporativas para instituições com suporte dedicado.",
    color: "#0D5FD9",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Plataforma para compartilhar e monetizar grids criativas.",
    color: "#007F86",
  },
  {
    icon: Handshake,
    title: "Parcerias",
    description: "Colaborações estratégicas para expandir alcance social.",
    color: "#005F66",
  },
];

export function Monetization() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">Modelo de Negócio</h2>
          <p className="text-[#4A4A4A] max-w-3xl mx-auto text-xl">
            Sustentabilidade financeira com foco em impacto social
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              className="bg-white p-6 rounded-3xl border-2 border-[#E0E0E0] hover:shadow-xl transition-all"
            >
              <div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
                style={{ backgroundColor: model.color }}
              >
                <model.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-[#172252] text-xl font-bold">{model.title}</h3>
              <p className="text-[#666666] leading-relaxed">{model.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}