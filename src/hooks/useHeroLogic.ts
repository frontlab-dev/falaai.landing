import { useAnimation } from './useAnimation';

/**
 * Hook com a lógica do componente Hero
 */
export function useHeroLogic() {
  const { animationsEnabled } = useAnimation();

  const handleCTAClick = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return {
    animationsEnabled,
    handleCTAClick,
  };
}


