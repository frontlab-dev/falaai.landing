import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Send } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useAnimation } from "./AnimationContext";

export function ContactForm() {
  const { animationsEnabled } = useAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", type: "", message: "" });
  };

  return (
    <section className="py-24 bg-white" id="contato" aria-labelledby="contato-heading">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-12"
        >
          <h2 id="contato-heading" className="text-[#172252] mb-6 text-4xl md:text-5xl font-bold">
            Entre em Contato
          </h2>
          <p className="text-[#4A4A4A] text-xl">
            Preencha o formulário e nossa equipe entrará em contato
          </p>
        </motion.div>

        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationsEnabled ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl border-2 border-[#E0E0E0]"
        >
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulário de contato">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[#1A1A1A]">
                Nome <span className="text-[#D32F2F]" aria-label="campo obrigatório">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Seu nome completo"
                className="rounded-xl border-2 border-[#CCCCCC] bg-white text-[#1A1A1A] placeholder:text-[#666666] focus:border-[#50B1CF] focus:ring-2 focus:ring-[#50B1CF]"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1A1A1A]">
                E-mail <span className="text-[#D32F2F]" aria-label="campo obrigatório">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="seu@email.com"
                className="rounded-xl border-2 border-[#CCCCCC] bg-white text-[#1A1A1A] placeholder:text-[#666666] focus:border-[#50B1CF] focus:ring-2 focus:ring-[#50B1CF]"
                aria-required="true"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-[#1A1A1A]">Tipo</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger 
                  id="type" 
                  className="rounded-xl border-2 border-[#CCCCCC] bg-white text-[#1A1A1A] focus:border-[#50B1CF] focus:ring-2 focus:ring-[#50B1CF]"
                  aria-label="Selecione o tipo de contato"
                >
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="investidor">Investidor</SelectItem>
                  <SelectItem value="clinica">Clínica</SelectItem>
                  <SelectItem value="usuario">Usuário</SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-[#1A1A1A]">
                Mensagem <span className="text-[#D32F2F]" aria-label="campo obrigatório">*</span>
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                placeholder="Como podemos ajudar?"
                className="rounded-xl border-2 border-[#CCCCCC] bg-white text-[#1A1A1A] placeholder:text-[#666666] focus:border-[#50B1CF] focus:ring-2 focus:ring-[#50B1CF]"
                aria-required="true"
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-[#172252] hover:bg-[#2D3A6E] text-white rounded-2xl text-lg py-6 shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-4 focus:ring-[#50B1CF] focus:ring-offset-2"
              aria-label="Enviar mensagem de contato"
            >
              <Send className="w-5 h-5 mr-2" aria-hidden="true" />
              Enviar mensagem
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}