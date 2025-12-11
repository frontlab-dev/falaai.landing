import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { HowItWorks } from "./components/HowItWorks";
import { Mascot } from "./components/Mascot";
import { Team } from "./components/Team";
import { Monetization } from "./components/Monetization";
import { Benefits } from "./components/Benefits";
import { InvestorCTA } from "./components/InvestorCTA";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { AnimationProvider } from "./components/AnimationContext";
import { AccessibilityProvider } from "./components/AccessibilityContext";
import { AnimationToggle } from "./components/AnimationToggle";
import { AccessibilityToolbar } from "./components/AccessibilityToolbar";
import { SkipToContent } from "./components/SkipToContent";
import { AccessibilityStatus } from "./components/AccessibilityStatus";
import { BackToTop } from "./components/BackToTop";
import { Statistics } from "./components/Statistics";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { PressPartners } from "./components/PressPartners";
import { SEOHead } from "./components/SEOHead";
import { Newsletter } from "./components/Newsletter";
import { LoadingScreen } from "./components/LoadingScreen";
import { CookieConsent } from "./components/CookieConsent";
import { FaceNavigation } from "./components/FaceNavigation";
import { useState } from "react";
import VLibras from '@djpfs/react-vlibras';
import { useAccessibility } from './components/AccessibilityContext';

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
        <FaceNavigation />
        <AnimationToggle />
        <Header />
        
        <main id="main-content">
          <Hero />
          <About />
          <Statistics />
          <HowItWorks />
          <Mascot />
          <Benefits />
          <Testimonials />
          <Team />
          <Monetization />
          <FAQ />
          <PressPartners />
          <InvestorCTA />
          <Newsletter />
          <ContactForm />
        </main>
        
        <Footer />
        <BackToTop />
        <CookieConsent />
        <Toaster />
        {librasEnabled && <VLibras forceOnload />}
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