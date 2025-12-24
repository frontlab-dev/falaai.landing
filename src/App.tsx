import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Mascot } from "./components/Mascot";
import { Team } from "./components/Team";
import { Monetization } from "./components/Monetization";
import { Benefits } from "./components/Benefits";
import { InvestorCTA } from "./components/InvestorCTA";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { AnimationToggle } from "./components/AnimationToggle";
import { AccessibilityToolbar } from "./components/AccessibilityToolbar";
import { SkipToContent } from "./components/SkipToContent";
import { AccessibilityStatus } from "./components/AccessibilityStatus";
import { BackToTop } from "./components/BackToTop";
import { FAQ } from "./components/FAQ";
import { SEOHead } from "./components/SEOHead";
import { Newsletter } from "./components/Newsletter";
import { LoadingScreen } from "./components/LoadingScreen";
import { CookieConsent } from "./components/CookieConsent";
import { useState, lazy, Suspense } from "react";
import { AnimationProvider } from "./contexts/AnimationContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import { useAccessibility } from './hooks/useAccessibility';
import { HeroContainer, ContactFormContainer, HeaderContainer } from "./containers";

// Lazy load componentes pesados
const FaceNavigation = lazy(() => import("./components/FaceNavigation").then(module => ({ default: module.FaceNavigation })));
const VLibras = lazy(() => import('@djpfs/react-vlibras').then(module => ({ default: module.default })));

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const { librasEnabled } = useAccessibility();

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <>
      <SEOHead />
      <div className="min-h-screen bg-white">
        <SkipToContent />
        <AccessibilityStatus />
        <AccessibilityToolbar />
        <AnimationToggle />
        <HeaderContainer />
        
        <main id="main-content">
          <HeroContainer />
          <About />
          <HowItWorks />
          <Mascot />
          <Benefits />
          <Team />
          <Monetization />
          <FAQ />
          <InvestorCTA />
          <Newsletter />
          <ContactFormContainer />
        </main>
        
        <Footer />
        <BackToTop />
        <CookieConsent />
        <Toaster />
        {librasEnabled && (
          <Suspense fallback={null}>
            <VLibras forceOnload />
          </Suspense>
        )}
        <Suspense fallback={null}>
          <FaceNavigation />
        </Suspense>
      </div>
    </>
  );
}

export default function App() {
  return (
    <AnimationProvider>
      <AccessibilityProvider>
        <AppContent />
      </AccessibilityProvider>
    </AnimationProvider>
  );
}