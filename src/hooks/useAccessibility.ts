import { useContext } from 'react';
import { AccessibilityContext } from '../contexts/AccessibilityContext';

/**
 * Hook para acessar o contexto de acessibilidade
 * @returns Objeto com todas as funcionalidades de acessibilidade
 */
export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}


