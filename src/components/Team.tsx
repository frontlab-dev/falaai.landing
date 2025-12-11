import { motion } from "motion/react";
import { Crown, Package, DollarSign, Code2 } from "lucide-react";
import { useAnimation } from "./AnimationContext";

const teamMembers = [
  {
    name: "Helen Barbosa",
    role: "CEO",
    icon: Crown,
    description: "Liderança estratégica, visão geral do negócio e impacto social. Responsável por direcionamento e relações externas.",
    color: "#50B1CF",
    textColor: "#172252",
  },
  {
    name: "Ana Beatriz",
    role: "CPO - Chief Product Officer",
    icon: Package,
    description: "Experiência do usuário, pesquisa, UX e acessibilidade. Estruturação das grids e fluxo do produto.",
    color: "#7468F4",
    textColor: "#7468F4",
  },
  {
    name: "João Victor",
    role: "CFO - Chief Financial Officer",
    icon: DollarSign,
    description: "Planejamento financeiro, sustentabilidade, custos e projeções. Estratégia de monetização e modelo de negócio.",
    color: "#FF8C42",
    textColor: "#172252",
  },
  {
    name: "Israel Sampaio",
    role: "CTO - Chief Technology Officer",
    icon: Code2,
    description: "10+ anos em desenvolvimento. Especialista em React, acessibilidade e arquitetura. Responsável pela estrutura técnica, app, sockets colaborativos e inovações.",
    color: "#172252",
    textColor: "#172252",
  },
];

export function Team() {
  const { animationsEnabled } = useAnimation();

  return (
    <section className="py-20 bg-[#FAFAFA]" id="equipe" aria-labelledby="equipe-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 id="equipe-heading" className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">
            Quem Somos
          </h2>
          <p className="text-[#4A4A4A] max-w-3xl mx-auto text-xl">
            Time multidisciplinar dedicado a criar impacto social através da tecnologia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              className="bg-white p-6 rounded-3xl border-2 border-[#E0E0E0] hover:shadow-2xl hover:border-[#50B1CF] transition-all"
            >
              <div 
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
                style={{ backgroundColor: member.color }}
              >
                <member.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="mb-2 text-[#1A1A1A] text-xl font-bold">{member.name}</h3>
              <p className="text-sm mb-4" style={{ color: member.textColor }}>
                {member.role}
              </p>
              <p className="text-[#666666] leading-relaxed">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}