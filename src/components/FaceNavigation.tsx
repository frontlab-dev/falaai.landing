import { useEffect, useRef, useState, useCallback } from 'react';
import { useAccessibility } from './AccessibilityContext';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, CameraOff, Scan, AlertCircle, Info, Shield, MousePointer } from 'lucide-react';
import * as faceapi from 'face-api.js';

type Status = 'idle' | 'loading-models' | 'loading-camera' | 'active' | 'error' | 'permission-denied' | 'not-supported';

export function FaceNavigation() {
  const { faceNavigationEnabled, toggleFaceNavigation } = useAccessibility();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();
  const isRunningRef = useRef(false);
  
  // Baseline para calibração inicial (posição central do rosto)
  const baselineXRef = useRef<number | null>(null);
  const baselineYRef = useRef<number | null>(null);
  
  // Posição atual do mouse virtual
  const currentMouseXRef = useRef<number>(window.innerWidth / 2);
  const currentMouseYRef = useRef<number>(window.innerHeight / 2);
  
  // Estado para cursor virtual visual
  const [cursorPosition, setCursorPosition] = useState({ 
    x: window.innerWidth / 2, 
    y: window.innerHeight / 2 
  });
  const [clickProgress, setClickProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  
  // Detecção de movimento parado para clique
  const lastFacePositionRef = useRef<{ x: number; y: number } | null>(null);
  const stillTimeRef = useRef<number>(0);
  const clickCooldownRef = useRef(false);
  const frameCountRef = useRef(0);
  const scrollIntervalRef = useRef<number | null>(null);
  const edgeThreshold = 20; // pixels da borda para considerar "na borda"
  
  // Sensibilidade e configurações
  const sensitivity = 3.0; // Multiplicador de movimento
  const stillThreshold = 8; // pixels de tolerância para considerar "parado"
  const stillTimeForClick = 1500; // ms parado para clicar
  const smoothingFactor = 0.1; // Suavização do movimento
  const scrollSpeed = 15; // pixels por frame de scroll (aumentado para scroll mais rápido)

  // Função para verificar se há scroll disponível
  const canScroll = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
    const maxScrollX = document.documentElement.scrollWidth - window.innerWidth;
    
    switch (direction) {
      case 'up':
        return scrollY > 0;
      case 'down':
        return scrollY < maxScrollY;
      case 'left':
        return scrollX > 0;
      case 'right':
        return scrollX < maxScrollX;
      default:
        return false;
    }
  }, []);

  // Direção atual do scroll
  const currentScrollDirectionRef = useRef<'up' | 'down' | 'left' | 'right' | null>(null);

  // Função para fazer scroll automático
  const startAutoScroll = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    // Se já está fazendo scroll na mesma direção, não fazer nada
    if (currentScrollDirectionRef.current === direction && scrollIntervalRef.current) {
      return;
    }
    
    // Parar scroll anterior se existir
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    
    currentScrollDirectionRef.current = direction;
    
    scrollIntervalRef.current = window.setInterval(() => {
      if (!canScroll(direction)) {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
          scrollIntervalRef.current = null;
          currentScrollDirectionRef.current = null;
        }
        return;
      }
      
      switch (direction) {
        case 'up':
          window.scrollBy({ top: -scrollSpeed, behavior: 'auto' });
          break;
        case 'down':
          window.scrollBy({ top: scrollSpeed, behavior: 'auto' });
          break;
        case 'left':
          window.scrollBy({ left: -scrollSpeed, behavior: 'auto' });
          break;
        case 'right':
          window.scrollBy({ left: scrollSpeed, behavior: 'auto' });
          break;
      }
    }, 16); // ~60fps
  }, [canScroll]);

  // Função para parar scroll automático
  const stopAutoScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
      currentScrollDirectionRef.current = null;
    }
  }, []);

  // Função para mover o cursor do mouse
  const moveMouse = useCallback((deltaX: number, deltaY: number) => {
    // Aplicar suavização
    const smoothDeltaX = deltaX * smoothingFactor;
    const smoothDeltaY = deltaY * smoothingFactor;
    
    // Calcular posição desejada
    let desiredX = currentMouseXRef.current + smoothDeltaX * sensitivity;
    let desiredY = currentMouseYRef.current + smoothDeltaY * sensitivity;
    
    // Verificar posição atual
    const currentX = currentMouseXRef.current;
    const currentY = currentMouseYRef.current;
    
    // Verificar se já está nas bordas ANTES de calcular nova posição
    const isAtLeftEdge = currentX <= edgeThreshold;
    const isAtRightEdge = currentX >= window.innerWidth - edgeThreshold;
    const isAtTopEdge = currentY <= edgeThreshold;
    const isAtBottomEdge = currentY >= window.innerHeight - edgeThreshold;
    
    // TRAVAR nas bordas - se está na borda, não permitir movimento na direção da borda
    // Borda esquerda: não permitir movimento para esquerda (X diminui)
    if (isAtLeftEdge && desiredX < currentX) {
      desiredX = currentX; // Travar na posição atual
    }
    // Borda direita: não permitir movimento para direita (X aumenta)
    if (isAtRightEdge && desiredX > currentX) {
      desiredX = currentX; // Travar na posição atual
    }
    // Borda superior: não permitir movimento para cima (Y diminui)
    if (isAtTopEdge && desiredY < currentY) {
      desiredY = currentY; // Travar na posição atual
    }
    // Borda inferior: não permitir movimento para baixo (Y aumenta)
    if (isAtBottomEdge && desiredY > currentY) {
      desiredY = currentY; // Travar na posição atual
    }
    
    // Aplicar limites finais (garantir que não ultrapasse os limites da tela)
    let newX = Math.max(0, Math.min(window.innerWidth, desiredX));
    let newY = Math.max(0, Math.min(window.innerHeight, desiredY));
    
    // Verificar novamente se está nas bordas após aplicar limites
    const finalIsAtLeftEdge = newX <= edgeThreshold;
    const finalIsAtRightEdge = newX >= window.innerWidth - edgeThreshold;
    const finalIsAtTopEdge = newY <= edgeThreshold;
    const finalIsAtBottomEdge = newY >= window.innerHeight - edgeThreshold;
    
    // Atualizar posições
    currentMouseXRef.current = newX;
    currentMouseYRef.current = newY;
    
    // Gerenciar scroll automático baseado nas bordas finais
    const scrollDirections: Array<'up' | 'down' | 'left' | 'right'> = [];
    
    if (finalIsAtTopEdge && canScroll('up')) {
      scrollDirections.push('up');
    }
    if (finalIsAtBottomEdge && canScroll('down')) {
      scrollDirections.push('down');
    }
    if (finalIsAtLeftEdge && canScroll('left')) {
      scrollDirections.push('left');
    }
    if (finalIsAtRightEdge && canScroll('right')) {
      scrollDirections.push('right');
    }
    
    // Se não está em nenhuma borda ou não pode fazer scroll, parar
    if (scrollDirections.length === 0) {
      stopAutoScroll();
    } else {
      // Iniciar scroll na primeira direção (prioridade: vertical > horizontal)
      const priorityDirection = scrollDirections.find(d => d === 'up' || d === 'down') || scrollDirections[0];
      startAutoScroll(priorityDirection);
    }
    
    // SEMPRE atualizar posição visual do cursor
    setCursorPosition({ x: newX, y: newY });
    
    // Encontrar elemento sob o cursor
    const element = document.elementFromPoint(newX, newY);
    
    if (element) {
      // Criar evento de mouse move
      const mouseMoveEvent = new MouseEvent('mousemove', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: newX,
        clientY: newY,
      });
      
      element.dispatchEvent(mouseMoveEvent);
    }
  }, [canScroll, startAutoScroll, stopAutoScroll]);

  // Função para fazer clique
  const performClick = useCallback(() => {
    const element = document.elementFromPoint(currentMouseXRef.current, currentMouseYRef.current);
    
    if (element && !clickCooldownRef.current) {
      clickCooldownRef.current = true;
      
      // Criar eventos de clique
      const mouseDownEvent = new MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: currentMouseXRef.current,
        clientY: currentMouseYRef.current,
        button: 0,
      });
      
      const mouseUpEvent = new MouseEvent('mouseup', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: currentMouseXRef.current,
        clientY: currentMouseYRef.current,
        button: 0,
      });
      
      const clickEvent = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: currentMouseXRef.current,
        clientY: currentMouseYRef.current,
        button: 0,
      });
      
      element.dispatchEvent(mouseDownEvent);
      element.dispatchEvent(mouseUpEvent);
      element.dispatchEvent(clickEvent);
      
      setMessage('🖱️ Clique realizado!');
      setClickProgress(0);
      
      setTimeout(() => {
        clickCooldownRef.current = false;
        if (isRunningRef.current) {
          setMessage('✓ Mova a cabeça para navegar');
        }
      }, 1000);
    }
  }, []);

  // Carregar modelos do face-api.js
  const loadModels = useCallback(async () => {
    try {
      setStatus('loading-models');
      setMessage('Carregando modelos de detecção facial...');
      
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      
      return true;
    } catch (error) {
      console.error('Erro ao carregar modelos:', error);
      setStatus('error');
      setMessage('Erro ao carregar modelos de detecção facial');
      return false;
    }
  }, []);

  // Iniciar câmera
  const startCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus('not-supported');
      setMessage('Seu navegador não suporta acesso à câmera');
      return false;
    }

    try {
      setStatus('loading-camera');
      setMessage('Solicitando acesso à câmera...');

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        await videoRef.current.play();
        return true;
      }
      return false;
    } catch (error: any) {
      if (error.name === 'NotAllowedError') {
        setStatus('permission-denied');
        setMessage('Permissão de câmera negada');
      } else {
        setStatus('error');
        setMessage('Erro ao acessar câmera');
      }
      return false;
    }
  }, []);

  // Loop de detecção facial
  const startDetection = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    isRunningRef.current = true;
    baselineXRef.current = null;
    baselineYRef.current = null;
    lastFacePositionRef.current = null;
    stillTimeRef.current = 0;
    frameCountRef.current = 0;
    
    // Inicializar posição do mouse no centro da tela
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    currentMouseXRef.current = centerX;
    currentMouseYRef.current = centerY;
    setCursorPosition({ x: centerX, y: centerY });
    setShowCursor(true);

    const detect = async () => {
      if (!isRunningRef.current) return;
      
      if (!video.videoWidth || video.readyState < 2) {
        animationFrameRef.current = requestAnimationFrame(detect);
        return;
      }

      try {
        frameCountRef.current++;
        
        // Detectar rosto usando TinyFaceDetector
        const detection = await faceapi.detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({ 
            inputSize: 320, 
            scoreThreshold: 0.5 
          })
        );

        if (detection) {
          // Pegar centro do rosto
          const faceX = detection.box.x + detection.box.width / 2;
          const faceY = detection.box.y + detection.box.height / 2;

          // Calibrar posição inicial (aguardar alguns frames para estabilizar)
          if (baselineXRef.current === null || baselineYRef.current === null) {
            if (frameCountRef.current > 10) {
              baselineXRef.current = faceX;
              baselineYRef.current = faceY;
              lastFacePositionRef.current = { x: faceX, y: faceY };
              setMessage('✓ Rosto detectado! Mova a cabeça para navegar');
            }
            animationFrameRef.current = requestAnimationFrame(detect);
            return;
          }

          // Calcular offset relativo ao baseline (invertido para X porque câmera está espelhada)
          const offsetX = baselineXRef.current - faceX; // Invertido: rosto à direita = offset negativo = mouse à direita
          const offsetY = faceY - baselineYRef.current; // Normal: rosto para baixo = offset positivo = mouse para baixo
          
          // Verificar se está parado (comparar com última posição)
          const currentPos = { x: faceX, y: faceY };
          const distance = lastFacePositionRef.current 
            ? Math.sqrt(
                Math.pow(currentPos.x - lastFacePositionRef.current.x, 2) + 
                Math.pow(currentPos.y - lastFacePositionRef.current.y, 2)
              )
            : 0;

          if (distance < stillThreshold && Math.abs(offsetX) < stillThreshold && Math.abs(offsetY) < stillThreshold) {
            // Cabeça está parada
            stillTimeRef.current += 16; // ~60fps
            
            // Atualizar progresso visual do clique
            const progress = Math.min(100, (stillTimeRef.current / stillTimeForClick) * 100);
            setClickProgress(progress);
            
            if (stillTimeRef.current >= stillTimeForClick) {
              performClick();
              stillTimeRef.current = 0;
              setClickProgress(0);
            } else {
              const remaining = Math.ceil((stillTimeForClick - stillTimeRef.current) / 1000);
              setMessage(`⏱️ Mantenha parado por ${remaining}s para clicar`);
            }
          } else {
            // Cabeça está se movendo
            stillTimeRef.current = 0;
            setClickProgress(0);
            lastFacePositionRef.current = currentPos;
            
            // Mover mouse baseado no offset do rosto
            if (Math.abs(offsetX) > 2 || Math.abs(offsetY) > 2) {
              moveMouse(offsetX, offsetY);
              setMessage('✓ Movendo cursor...');
            }
            
            // Atualizar baseline gradualmente (só se movimento for pequeno, para permitir movimento contínuo)
            if (Math.abs(offsetX) < 30 && Math.abs(offsetY) < 30) {
              baselineXRef.current = baselineXRef.current * 0.95 + faceX * 0.05;
              baselineYRef.current = baselineYRef.current * 0.95 + faceY * 0.05;
            }
          }
        } else {
          // Rosto não detectado
          stillTimeRef.current = 0;
          setClickProgress(0);
          setMessage('👤 Procurando rosto...');
        }
      } catch (error) {
        console.error('Erro na detecção:', error);
      }

      if (isRunningRef.current) {
        animationFrameRef.current = requestAnimationFrame(detect);
      }
    };

    detect();
  }, [moveMouse, performClick]);

  // Parar tudo
  const stop = useCallback(() => {
    isRunningRef.current = false;
    
    // Parar scroll automático
    stopAutoScroll();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setStatus('idle');
    setMessage('');
    setShowCursor(false);
    baselineXRef.current = null;
    baselineYRef.current = null;
    lastFacePositionRef.current = null;
    stillTimeRef.current = 0;
    setClickProgress(0);
    frameCountRef.current = 0;
  }, [stopAutoScroll]);

  // Iniciar navegação facial
  const start = useCallback(async () => {
    const modelsLoaded = await loadModels();
    if (!modelsLoaded) return;

    const cameraStarted = await startCamera();
    if (!cameraStarted) return;

    setStatus('active');
    setMessage('Procurando rosto...');
    startDetection();
  }, [loadModels, startCamera, startDetection]);

  // Efeito principal
  useEffect(() => {
    if (faceNavigationEnabled) {
      start();
    } else {
      stop();
    }

    return () => stop();
  }, [faceNavigationEnabled, start, stop]);

  // Atualizar posição do cursor quando a janela redimensiona
  useEffect(() => {
    const handleResize = () => {
      if (status === 'active') {
        currentMouseXRef.current = Math.min(currentMouseXRef.current, window.innerWidth);
        currentMouseYRef.current = Math.min(currentMouseYRef.current, window.innerHeight);
        setCursorPosition({ 
          x: currentMouseXRef.current, 
          y: currentMouseYRef.current 
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [status]);

  if (!faceNavigationEnabled) return null;

  return (
    <>
      {/* Cursor Virtual Visual */}
      {status === 'active' && (
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: 'translate(-50%, -50%)',
            zIndex: 2147483647, // z-index máximo
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
          }}
          transition={{ 
            duration: 0.2,
          }}
        >
          {/* Círculo externo com progresso de clique */}
          <div className="relative">
            {/* Anel de progresso do clique */}
            {clickProgress > 0 && (
              <svg
                className="absolute -top-8 -left-8 w-16 h-16 transform -rotate-90"
                viewBox="0 0 64 64"
              >
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="rgba(80, 177, 207, 0.3)"
                  strokeWidth="3"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="#50B1CF"
                  strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - clickProgress / 100)}`}
                  strokeLinecap="round"
                  className="transition-all duration-100"
                />
              </svg>
            )}
            
            {/* Cursor principal */}
            <div className="relative">
              {/* Sombra/pulso */}
              <motion.div
                className="absolute inset-0 bg-[#50B1CF] rounded-full blur-lg opacity-40"
                animate={{
                  scale: clickProgress > 0 ? [1, 1.3, 1] : [1, 1.1, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
              
              {/* Cursor */}
              <div className="relative w-8 h-8 bg-[#50B1CF] rounded-full border-[3px] border-white shadow-xl">
                {/* Ponto central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
                </div>
              </div>
            </div>
            
            {/* Indicador de clique quando completo */}
            {clickProgress >= 100 && (
              <motion.div
                className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <div className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg font-semibold">
                  ✓ Clique!
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
      
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-20 right-6 z-[80000] bg-white rounded-2xl shadow-2xl border-2 border-[#50B1CF] p-4 max-w-xs"
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-2 mb-3">
            {status === 'active' ? (
              <Camera className="w-5 h-5 text-[#50B1CF]" />
            ) : status.startsWith('loading') ? (
              <Scan className="w-5 h-5 text-[#7468F4] animate-pulse" />
            ) : (
              <CameraOff className="w-5 h-5 text-gray-400" />
            )}
            <h3 className="font-bold text-[#172252]">Navegação Facial</h3>
          </div>

          {/* Vídeo */}
          <div className="relative mb-3 rounded-lg overflow-hidden bg-gray-900 min-h-[120px]">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-auto transform -scale-x-100"
              style={{ maxHeight: '180px' }}
            />

            {/* Overlay de loading */}
            {status.startsWith('loading') && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                <div className="text-center text-white">
                  <Shield className="w-10 h-10 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs">{message}</p>
                </div>
              </div>
            )}
          </div>

          {/* Status */}
          {message && (
            <div className={`text-xs p-2 rounded-lg mb-2 ${
              status === 'error' || status === 'permission-denied' || status === 'not-supported'
                ? 'bg-red-50 text-red-700'
                : status === 'active'
                ? 'bg-green-50 text-green-700'
                : 'bg-blue-50 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          {/* Instruções quando ativo */}
          {status === 'active' && (
            <div className="text-xs text-gray-600 space-y-1">
              <p className="flex items-center gap-1">
                <MousePointer className="w-3 h-3 text-[#7468F4]" />
                Mova a cabeça para mover o cursor
              </p>
              <p className="flex items-center gap-1">
                <span className="text-green-500">↑</span> Cima = cursor sobe
              </p>
              <p className="flex items-center gap-1">
                <span className="text-blue-500">↓</span> Baixo = cursor desce
              </p>
              <p className="flex items-center gap-1">
                <span className="text-purple-500">←</span> Esquerda = cursor esquerda
              </p>
              <p className="flex items-center gap-1">
                <span className="text-orange-500">→</span> Direita = cursor direita
              </p>
              <p className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-200">
                <span className="text-red-500">⏱️</span> Mantenha parado 1.5s para clicar
              </p>
            </div>
          )}

          {/* Botão tentar novamente */}
          {(status === 'error' || status === 'permission-denied' || status === 'not-supported') && (
            <div className="mt-3 space-y-2">
              {status === 'permission-denied' && (
                <div className="text-xs bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                  <Info className="w-4 h-4 inline mr-1 text-yellow-600" />
                  Clique no cadeado na barra de endereço e permita a câmera.
                </div>
              )}
              <button
                onClick={start}
                className="w-full bg-[#50B1CF] hover:bg-[#3a8fa8] text-white py-2 px-4 rounded-lg text-sm"
              >
                Tentar Novamente
              </button>
              <button
                onClick={toggleFaceNavigation}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm"
              >
                Fechar
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
