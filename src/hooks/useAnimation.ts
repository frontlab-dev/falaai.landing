import { useContext } from "react";
import { AnimationContext } from "../contexts/AnimationContext";

/**
 * Hook para acessar o contexto de animações
 * @returns Objeto com animationsEnabled e toggleAnimations
 */
export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
}


