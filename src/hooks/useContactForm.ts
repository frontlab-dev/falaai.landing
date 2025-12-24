import { useState } from "react";
import { useAnimation } from "./useAnimation";
import { toast } from "sonner@2.0.3";

interface ContactFormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

/**
 * Hook com a lógica do formulário de contato
 */
export function useContactForm() {
  const { animationsEnabled } = useAnimation();
  const [formData, setFormData] = useState<ContactFormData>({
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

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    animationsEnabled,
    formData,
    handleSubmit,
    handleChange,
  };
}


