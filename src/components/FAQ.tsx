import { motion } from "motion/react";
import { useAnimation } from "../hooks/useAnimation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  const { animationsEnabled } = useAnimation();

  const faqs: FAQItem[] = [
    {
      question: "O que é o Fala.AI?",
      answer: "O Fala.AI é uma plataforma de comunicação assistiva desenvolvida para pessoas com dificuldades de fala. Oferecemos pranchas de comunicação personalizáveis, síntese de voz de alta qualidade e acompanhamento profissional integrado com fonoaudiólogos.",
    },
    {
      question: "Para quem o Fala.AI é indicado?",
      answer: "O Fala.AI é ideal para pessoas com afasia, autismo, paralisia cerebral, AVC, esclerose lateral amiotrófica (ELA), síndrome de Down, apraxia e outras condições que afetam a comunicação verbal. Também é uma ferramenta valiosa para fonoaudiólogos, terapeutas e educadores.",
    },
    {
      question: "Como funciona a personalização das pranchas?",
      answer: "Você pode criar pranchas totalmente personalizadas com fotos, símbolos e categorias específicas para cada usuário. A plataforma permite ajustar o layout, cores, tamanho dos botões e organização conforme as necessidades individuais. Fonoaudiólogos podem gerenciar e atualizar as pranchas remotamente.",
    },
    {
      question: "O aplicativo funciona offline?",
      answer: "Sim! As pranchas de comunicação funcionam completamente offline após o primeiro download. A síntese de voz também está disponível offline. Apenas funcionalidades de sincronização com profissionais e atualizações de conteúdo requerem conexão com a internet.",
    },
    {
      question: "Quanto custa o Fala.AI?",
      answer: "Oferecemos um plano gratuito com funcionalidades básicas e pranchas limitadas. Os planos Premium e Profissional incluem pranchas ilimitadas, síntese de voz avançada, acompanhamento profissional e recursos de análise. Também temos descontos especiais para instituições de ensino e ONGs.",
    },
    {
      question: "O app está disponível para iOS e Android?",
      answer: "Sim! O Fala.AI está disponível tanto para dispositivos Android quanto iOS. Também oferecemos uma versão web que pode ser acessada de qualquer navegador moderno.",
    },
    {
      question: "Como funciona o acompanhamento com fonoaudiólogos?",
      answer: "Profissionais podem criar um perfil na plataforma e vincular pacientes. Eles têm acesso a um painel de controle onde podem monitorar o uso, personalizar pranchas, definir metas terapêuticas e acompanhar o progresso através de relatórios detalhados e análises de comunicação.",
    },
    {
      question: "Os dados dos usuários estão seguros?",
      answer: "Sim. Levamos a privacidade muito a sério. Todos os dados são criptografados e armazenados de forma segura. Seguimos as melhores práticas de segurança e estamos em conformidade com a LGPD (Lei Geral de Proteção de Dados). Nunca compartilhamos informações pessoais com terceiros sem consentimento explícito.",
    },
    {
      question: "Posso testar antes de assinar?",
      answer: "Absolutamente! Oferecemos uma versão gratuita com funcionalidades básicas para você testar sem compromisso. Além disso, os planos pagos têm 14 dias de garantia - se não ficar satisfeito, devolvemos seu dinheiro integralmente.",
    },
    {
      question: "Como posso investir no Fala.AI?",
      answer: "Estamos em fase de captação de investimentos! Se você é um investidor interessado em tecnologia assistiva e impacto social, entre em contato através da seção 'Investidores' nesta página ou envie um e-mail para investidores@fala.ai. Teremos prazer em apresentar nosso pitch deck e projeções.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-white to-[#FAFAFA]" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#50B1CF]/10 p-4 rounded-full">
              <HelpCircle className="w-12 h-12 text-[#172252]" aria-hidden="true" />
            </div>
          </div>
          <h2 id="faq-heading" className="text-4xl md:text-5xl text-[#172252] font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-[#4A4A4A] text-lg md:text-xl">
            Tire suas dúvidas sobre o Fala.AI
          </p>
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white border-2 border-[#E0E0E0] rounded-2xl px-6 hover:border-[#50B1CF] transition-colors"
              >
                <AccordionTrigger 
                  className="text-left text-[#1A1A1A] hover:text-[#50B1CF] py-6 focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2 rounded-lg"
                  aria-label={faq.question}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#666666] leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
          className="mt-12 text-center"
        >
          <p className="text-[#666666] mb-4">
            Não encontrou a resposta que procura?
          </p>
          <a
            href="#contato"
            className="text-[#2A8FA8] hover:underline cursor-pointer inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2 rounded-lg px-3 py-2"
            onClick={(e) => {
              e.preventDefault();
              const element = document.querySelector("#contato");
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            aria-label="Ir para formulário de contato"
          >
            Entre em contato conosco
            <span aria-hidden="true">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}