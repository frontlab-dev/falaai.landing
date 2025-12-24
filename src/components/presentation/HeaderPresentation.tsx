import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import logo from "figma:asset/09f4aa9565ae6cdcbfe82028f2acb821ea0180ab.png";

const navLinks = [
  { name: "Sobre", href: "#sobre" },
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "Benefícios", href: "#beneficios" },
  { name: "Equipe", href: "#equipe" },
  // { name: "Depoimentos", href: "#depoimentos" },
  { name: "FAQ", href: "#faq" },
  { name: "Contato", href: "#contato" },
];

interface HeaderPresentationProps {
  animationsEnabled: boolean;
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
  onCTAClick: (href: string) => void;
  onToggleMobileMenu: () => void;
}

export function HeaderPresentation({
  animationsEnabled,
  isScrolled,
  isMobileMenuOpen,
  onNavClick,
  onCTAClick,
  onToggleMobileMenu,
}: HeaderPresentationProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2 rounded-lg px-2 py-1"
            initial={animationsEnabled ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={animationsEnabled ? { duration: 0.5 } : { duration: 0 }}
            aria-label="Fala.AI - Ir para página inicial"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img 
              src={logo} 
              alt="Fala.AI" 
              className="h-16 w-auto" 
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navegação principal">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[#1A1A1A] hover:text-[#50B1CF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2 rounded-lg px-3 py-2"
                initial={animationsEnabled ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={animationsEnabled ? { duration: 0.5, delay: index * 0.1 } : { duration: 0 }}
                onClick={(e) => onNavClick(e, link.href)}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button (Desktop) */}
          <motion.div
            className="hidden md:block"
            initial={animationsEnabled ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={animationsEnabled ? { duration: 0.5 } : { duration: 0 }}
          >
            <Button 
              className="bg-[#172252] hover:bg-[#2D3A6E] text-white rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2"
              onClick={() => onCTAClick("#contato")}
              aria-label="Ir para formulário de contato"
            >
              Quero testar
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#1A1A1A] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2 rounded-lg"
            onClick={onToggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              id="mobile-menu"
              className="md:hidden py-4 border-t border-[#F5F5F5]"
              initial={animationsEnabled ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={animationsEnabled ? { opacity: 0, height: 0 } : { opacity: 1, height: "auto" }}
              transition={animationsEnabled ? { duration: 0.3 } : { duration: 0 }}
              aria-label="Menu de navegação mobile"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-[#1A1A1A] hover:text-[#50B1CF] transition-colors cursor-pointer py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:bg-[#FAFAFA]"
                    onClick={(e) => onNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                ))}
                <Button 
                  className="bg-[#172252] hover:bg-[#2D3A6E] text-white rounded-2xl w-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#50B1CF] focus:ring-offset-2"
                  onClick={() => onCTAClick("#contato")}
                  aria-label="Ir para formulário de contato"
                >
                  Quero testar
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}


