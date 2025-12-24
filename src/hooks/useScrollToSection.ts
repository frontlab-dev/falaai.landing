/**
 * Hook para navegação suave entre seções
 */
export function useScrollToSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return { scrollToSection };
}


