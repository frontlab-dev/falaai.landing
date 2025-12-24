import { motion, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Users, MessageSquare, Heart, TrendingUp } from "lucide-react";
import { useAnimation } from "../hooks/useAnimation";

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({ icon, value, suffix = "", label, duration = 2 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { animationsEnabled } = useAnimation();

  useEffect(() => {
    if (isInView && animationsEnabled) {
      let startTime: number | null = null;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOutQuad = (t: number) => t * (2 - t);
        setCount(Math.floor(easeOutQuad(progress) * value));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      
      requestAnimationFrame(animate);
    } else if (isInView && !animationsEnabled) {
      setCount(value);
    }
  }, [isInView, value, duration, animationsEnabled]);

  return (
    <motion.div
      ref={ref}
      initial={animationsEnabled ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
      className="text-center"
    >
      <div className="flex justify-center mb-4">
        <div className="bg-[#50B1CF]/10 p-4 rounded-2xl">
          <div className="text-[#172252]">
            {icon}
          </div>
        </div>
      </div>
      <div className="text-4xl md:text-5xl text-[#172252] mb-2">
        {isInView ? count : 0}{suffix}
      </div>
      <div className="text-[#666666] text-lg">
        {label}
      </div>
    </motion.div>
  );
}

export function Statistics() {
  const { animationsEnabled } = useAnimation();
  
  const stats: StatProps[] = [
    {
      icon: <Users className="w-8 h-8" aria-hidden="true" />,
      value: 500,
      suffix: "+",
      label: "Usuários Ativos",
    },
    {
      icon: <MessageSquare className="w-8 h-8" aria-hidden="true" />,
      value: 10000,
      suffix: "+",
      label: "Mensagens Enviadas",
    },
    {
      icon: <Heart className="w-8 h-8" aria-hidden="true" />,
      value: 98,
      suffix: "%",
      label: "Satisfação dos Usuários",
    },
    {
      icon: <TrendingUp className="w-8 h-8" aria-hidden="true" />,
      value: 150,
      suffix: "%",
      label: "Crescimento Mensal",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#FAFAFA] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={animationsEnabled ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          whileInView={animationsEnabled ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={animationsEnabled ? { duration: 0.6 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl text-[#172252] font-bold mb-4">
            Impacto em Números
          </h2>
          <p className="text-[#666666] text-lg md:text-xl max-w-3xl mx-auto">
            Nossa missão é transformar vidas através da tecnologia assistiva. Veja o impacto que estamos gerando.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <AnimatedStat key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}