import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner@2.0.3";
import { Mail, CheckCircle2 } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

export function Newsletter() {
  const { animationsEnabled } = useAnimation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor, insira seu e-mail");
      return;
    }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    setIsSubmitting(true);

    // Simula envio
    setTimeout(() => {
      toast.success("Obrigado por se inscrever! Em breve entraremos em contato.", {
        duration: 5000,
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-[#FAFAFA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#50B1CF]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7468F4]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#50B1CF] p-4 rounded-full shadow-lg">
              <Mail className="w-12 h-12 text-white" aria-hidden="true" />
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl text-[#172252] font-bold mb-4">
            Seja um dos primeiros a testar
          </h2>
          
          <p className="text-[#4A4A4A] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Inscreva-se para receber acesso antecipado, novidades e atualizações sobre o Fala.AI
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="Digite seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white border-2 border-[#CCCCCC] text-[#1A1A1A] placeholder:text-[#666666] px-6 py-6 rounded-2xl text-lg focus:ring-2 focus:ring-[#50B1CF] focus:border-[#50B1CF] shadow-sm"
              disabled={isSubmitting}
              aria-label="E-mail para newsletter"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#172252] text-white hover:bg-[#2D3A6E] px-8 py-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 focus:ring-4 focus:ring-[#50B1CF] focus:ring-offset-2"
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" aria-hidden="true" />
                  Quero Participar
                </>
              )}
            </Button>
          </motion.form>

          <motion.p
            initial={animationsEnabled ? { opacity: 0 } : { opacity: 1 }}
            whileInView={animationsEnabled ? { opacity: 1 } : { opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={animationsEnabled ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
            className="text-[#666666] text-sm mt-4"
          >
            🔒 Seus dados estão seguros. Não enviamos spam.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}