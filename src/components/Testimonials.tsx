import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";
import { Card, CardContent } from "./ui/card";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating: number;
}

export function Testimonials() {
  const { animationsEnabled } = useAnimation();

  const testimonials: Testimonial[] = [
    {
      name: "Maria Silva",
      role: "Fonoaudióloga",
      content: "O Fala.AI revolucionou a forma como acompanho meus pacientes. A plataforma é intuitiva e os resultados são incríveis. Consigo personalizar cada terapia de forma única.",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Pai de paciente",
      content: "Meu filho teve um AVC e perdeu a fala. Com o Fala.AI, ele conseguiu se comunicar novamente. É emocionante ver o sorriso dele cada vez que consegue expressar o que sente.",
      rating: 5,
    },
    {
      name: "Ana Paula Costa",
      role: "Terapeuta Ocupacional",
      content: "Trabalho com crianças autistas e o Fala.AI se tornou uma ferramenta essencial. A interface visual e as pranchas personalizáveis facilitam muito a comunicação.",
      rating: 5,
    },
    {
      name: "Dr. Carlos Mendes",
      role: "Neurologista",
      content: "Como médico, recomendo o Fala.AI para meus pacientes com afasia. A tecnologia é acessível e o suporte da equipe de fonoaudiologia é excepcional.",
      rating: 5,
    },
    {
      name: "Beatriz Lima",
      role: "Usuária",
      content: "Tenho paralisia cerebral e sempre tive dificuldade para me comunicar. O Fala.AI me deu independência e autonomia. Hoje consigo expressar tudo que quero!",
      rating: 5,
    },
    {
      name: "Prof. Ricardo Alves",
      role: "Educador Especial",
      content: "Uso o Fala.AI em sala de aula com alunos não-verbais. A diferença é visível! Os alunos ficam mais engajados e conseguem participar ativamente das atividades.",
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-20 bg-white" aria-labelledby="depoimentos-heading">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[#172252] font-bold mb-4">
            Depoimentos
          </h2>
          <p className="text-[#666666] text-lg md:text-xl max-w-3xl mx-auto">
            Veja como o Fala.AI está mudando vidas e transformando a comunicação assistiva em todo o Brasil.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={index}
              initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={animationsEnabled ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              className="bg-white p-8 rounded-3xl border-2 border-[#E0E0E0] hover:shadow-2xl hover:border-[#50B1CF] transition-all"
            >
              <div className="mb-6">
                <div className="flex gap-1 mb-4" aria-label={`Avaliação: ${testimonial.rating} de 5 estrelas`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#50B1CF] text-[#50B1CF]" aria-hidden="true" />
                  ))}
                </div>
                  
                <p className="text-[#4A4A4A] mb-6 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#50B1CF] to-[#7468F4] flex items-center justify-center">
                    <span className="text-white text-xl">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-[#1A1A1A]">
                      {testimonial.name}
                    </div>
                    <div className="text-[#666666] text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}