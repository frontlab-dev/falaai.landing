import { useHeroLogic } from "../hooks/useHeroLogic";
import { HeroPresentation } from "../components/presentation/HeroPresentation";

/**
 * Container component para Hero
 * Gerencia a lógica e passa props para o componente de apresentação
 */
export function HeroContainer() {
  const { animationsEnabled, handleCTAClick } = useHeroLogic();

  return (
    <HeroPresentation 
      animationsEnabled={animationsEnabled}
      onCTAClick={handleCTAClick}
    />
  );
}


