import { useHeaderLogic } from "../hooks/useHeaderLogic";
import { HeaderPresentation } from "../components/presentation/HeaderPresentation";

/**
 * Container component para Header
 * Gerencia a lógica do header e passa props para o componente de apresentação
 */
export function HeaderContainer() {
  const {
    animationsEnabled,
    isScrolled,
    isMobileMenuOpen,
    handleNavClick,
    handleCTAClick,
    toggleMobileMenu,
  } = useHeaderLogic();

  return (
    <HeaderPresentation
      animationsEnabled={animationsEnabled}
      isScrolled={isScrolled}
      isMobileMenuOpen={isMobileMenuOpen}
      onNavClick={handleNavClick}
      onCTAClick={handleCTAClick}
      onToggleMobileMenu={toggleMobileMenu}
    />
  );
}


