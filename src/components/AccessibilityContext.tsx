import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  librasEnabled: boolean;
  toggleLibras: () => void;
  faceNavigationEnabled: boolean;
  toggleFaceNavigation: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [librasEnabled, setLibrasEnabled] = useState(false);
  const [faceNavigationEnabled, setFaceNavigationEnabled] = useState(false);

  // Carregar preferências do localStorage
  useEffect(() => {
    const savedHighContrast = localStorage.getItem('fala-ai-high-contrast');
    const savedFontSize = localStorage.getItem('fala-ai-font-size');
    const savedLibrasEnabled = localStorage.getItem('fala-ai-libras-enabled');
    const savedFaceNavigation = localStorage.getItem('fala-ai-face-navigation-enabled');
    
    if (savedHighContrast === 'true') {
      setHighContrast(true);
    }
    
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    }

    if (savedLibrasEnabled === 'true') {
      setLibrasEnabled(true);
    }

    if (savedFaceNavigation === 'true') {
      setFaceNavigationEnabled(true);
    }
  }, []);

  // Aplicar alto contraste ao body
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Aplicar tamanho de fonte ao body
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
  }, [fontSize]);

  const toggleHighContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    localStorage.setItem('fala-ai-high-contrast', String(newValue));
  };

  const increaseFontSize = () => {
    if (fontSize < 150) {
      const newSize = fontSize + 10;
      setFontSize(newSize);
      localStorage.setItem('fala-ai-font-size', String(newSize));
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      const newSize = fontSize - 10;
      setFontSize(newSize);
      localStorage.setItem('fala-ai-font-size', String(newSize));
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
    localStorage.setItem('fala-ai-font-size', '100');
  };

  const toggleLibras = () => {
    const newValue = !librasEnabled;
    setLibrasEnabled(newValue);
    localStorage.setItem('fala-ai-libras-enabled', String(newValue));
  };

  const toggleFaceNavigation = () => {
    const newValue = !faceNavigationEnabled;
    setFaceNavigationEnabled(newValue);
    localStorage.setItem('fala-ai-face-navigation-enabled', String(newValue));
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        fontSize,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
        librasEnabled,
        toggleLibras,
        faceNavigationEnabled,
        toggleFaceNavigation,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}