import logoFull from "figma:asset/09f4aa9565ae6cdcbfe82028f2acb821ea0180ab.png";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#418BFF] text-white py-16" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <img 
              src={logoFull}
              alt="Fala.AI"
              className="h-24 mb-6"
            />
            <p className="text-white/90 leading-relaxed text-lg">
              Tecnologia assistiva que transforma vidas através da comunicação acessível.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xl font-bold">Contato</h4>
            <nav aria-label="Links do rodapé">
              <ul className="space-y-3 text-lg">
                <li>
                  <a 
                    href="#sobre" 
                    className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#418BFF] rounded px-1 py-0.5"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#sobre");
                    }}
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a 
                    href="#contato" 
                    className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#418BFF] rounded px-1 py-0.5"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#contato");
                    }}
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#418BFF] rounded px-1 py-0.5"
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#418BFF] rounded px-1 py-0.5"
                  >
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div>
            <h4 className="mb-6 text-xl">Contato</h4>
            <p className="text-white/90 leading-relaxed mb-4 text-lg">
              <a 
                href="mailto:contato@fala.ai" 
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#418BFF] rounded px-1 py-0.5"
              >
                contato@fala.ai
              </a>
            </p>
            <p className="text-white/90 leading-relaxed text-lg">
              Transformando comunicação em liberdade
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/90 text-lg mb-2">
            Fala.AI — Comunicação é liberdade.
          </p>
          <p className="text-white/70">
            © 2025 Fala.AI. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}