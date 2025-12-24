import { motion } from "motion/react";
import { Crown, Package, DollarSign, Code2, Linkedin } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";
import helenImage from "../assets/helen-barbosa.webp";
import anaImage from "../assets/ana-beatriz.webp";
import joaoImage from "../assets/joao-victor.webp";
import israelImage from "../assets/israel-sampaio.webp";

const teamMembers = [
  {
    name: "Helen Barbosa",
    role: "CEO - Chief Executive Officer",
    icon: Crown,
    description: "Liderança estratégica, visão geral do negócio e impacto social. Responsável por direcionamento e relações externas.",
    color: "#50B1CF",
    textColor: "#172252",
    linkedin: "https://www.linkedin.com/in/helenbarbosaa",
    image: helenImage,
  },
  {
    name: "Ana Beatriz",
    role: "CPO - Chief Product Officer",
    icon: Package,
    description: "Experiência do usuário, pesquisa, UX e acessibilidade. Responsável pela estruturação de interfaces, fluxos do produto e design inclusivo.",
    color: "#7468F4",
    textColor: "#7468F4",
    linkedin: "https://www.linkedin.com/in/ana-beatriz-costa-758694181/",
    image: anaImage,
  },
  {
    name: "João Victor",
    role: "CFO - Chief Financial Officer",
    icon: DollarSign,
    description: "Planejamento financeiro, sustentabilidade, custos e projeções. Estratégia de monetização e modelo de negócio.",
    color: "#FF8C42",
    textColor: "#172252",
    linkedin: "https://www.linkedin.com/in/jo%C3%A3o-victor-rocha-a5b7691bb/",
    image: joaoImage,
  },
  {
    name: "Israel Sampaio",
    role: "CTO - Chief Technology Officer",
    icon: Code2,
    description: "Arquitetura técnica, desenvolvimento frontend e acessibilidade. Responsável pela estrutura técnica, aplicativo, sockets colaborativos e inovações tecnológicas.",
    color: "#172252",
    textColor: "#172252",
    linkedin: "https://www.linkedin.com/in/israelsampaio",
    image: israelImage,
  },
];

interface TeamMemberCardProps {
  member: typeof teamMembers[0];
  index: number;
  animationsEnabled: boolean;
}

function TeamMemberCard({ member, index, animationsEnabled }: TeamMemberCardProps) {
  return (
    <motion.div
      initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
      className="bg-white p-6 rounded-3xl border-2 border-[#E0E0E0] hover:shadow-2xl hover:border-[#50B1CF] transition-all"
    >
      <div className="relative mb-6">
        <div 
          className="overflow-hidden"
          style={{ 
            margin: 'calc(var(--spacing) * 6 * -1)',
            marginBottom: 0,
            height: '360px'
          }}
        >
          <img
            src={member.image}
            alt={`Foto de perfil de ${member.name}`}
            className="w-full h-full object-cover"
            style={{
              borderRadius: 'var(--radius-3xl) var(--radius-3xl) 0 0',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-1 -right-1 bg-[#0077B5] text-white p-2 rounded-full hover:bg-[#005885] transition-colors"
            aria-label={`LinkedIn de ${member.name}`}
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>
      <h3 className="mb-2 text-[#1A1A1A] text-xl font-bold">{member.name}</h3>
      <p className="text-sm mb-4">
        {member.role}
      </p>
      <p className="text-[#666666] leading-relaxed mb-4">
        {member.description}
      </p>
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[#0077B5] hover:text-[#005885] transition-colors text-sm font-medium"
        >
          <Linkedin className="w-4 h-4" />
          Ver perfil no LinkedIn
        </a>
      )}
    </motion.div>
  );
}

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
            <TeamMemberCard
              key={index}
              member={member}
              index={index}
              animationsEnabled={animationsEnabled}
            />
          ))}
        </div>
      </div>
    </section>
  );
}