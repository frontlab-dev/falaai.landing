import { useContactForm } from "../hooks/useContactForm";
import { ContactFormPresentation } from "../components/presentation/ContactFormPresentation";

/**
 * Container component para ContactForm
 * Gerencia a lógica do formulário e passa props para o componente de apresentação
 */
export function ContactFormContainer() {
  const { animationsEnabled, formData, handleSubmit, handleChange } = useContactForm();

  return (
    <ContactFormPresentation
      animationsEnabled={animationsEnabled}
      formData={formData}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
}


