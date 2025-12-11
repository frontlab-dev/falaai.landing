export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#172252] focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#50B1CF] focus:ring-offset-2"
    >
      Pular para o conteúdo principal
    </a>
  );
}