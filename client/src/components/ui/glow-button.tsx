import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

// Componente de partícula individual
function Particle({ index }: { index: number }) {
    // Posição aleatória ao redor do botão
    const randomX = Math.random() * 100;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 1 + Math.random() * 1;
    const randomSize = 4 + Math.random() * 6;
    
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: randomSize,
                height: randomSize,
                left: `${randomX}%`,
                bottom: 0,
                background: `radial-gradient(circle, rgba(251, 191, 36, 1) 0%, rgba(245, 158, 11, 0.8) 50%, rgba(217, 119, 6, 0) 100%)`,
                boxShadow: "0 0 6px 2px rgba(251, 191, 36, 0.6)",
            }}
            initial={{ 
                opacity: 0, 
                y: 0,
                scale: 0
            }}
            animate={{ 
                opacity: [0, 1, 1, 0],
                y: -80 - Math.random() * 40,
                x: (Math.random() - 0.5) * 60,
                scale: [0, 1, 1, 0.5]
            }}
            transition={{
                duration: randomDuration,
                delay: randomDelay,
                ease: "easeOut",
            }}
        />
    );
}

export function GlowButton({
    className,
    children,
    href,
    onClick,
    ...props
}: GlowButtonProps) {
    const [isHovered, setIsHovered] = React.useState(false);
    const [particles, setParticles] = React.useState<number[]>([]);
    const particleIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);

        if (href) {
            setTimeout(() => {
                window.open(href, "_blank");
            }, 300);
        }
    };

    // Gerar partículas continuamente enquanto hover
    React.useEffect(() => {
        if (isHovered) {
            // Gerar partículas iniciais
            setParticles(Array.from({ length: 12 }, (_, i) => Date.now() + i));
            
            // Continuar gerando partículas
            particleIntervalRef.current = setInterval(() => {
                setParticles(prev => {
                    const newParticles = [...prev, Date.now()];
                    // Manter apenas as últimas 20 partículas
                    return newParticles.slice(-20);
                });
            }, 150);
        } else {
            if (particleIntervalRef.current) {
                clearInterval(particleIntervalRef.current);
            }
            // Limpar partículas gradualmente
            setTimeout(() => setParticles([]), 500);
        }

        return () => {
            if (particleIntervalRef.current) {
                clearInterval(particleIntervalRef.current);
            }
        };
    }, [isHovered]);

    return (
        <div 
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Container de Partículas */}
            <div className="absolute inset-0 -inset-x-4 -top-20 overflow-visible pointer-events-none z-20">
                <AnimatePresence>
                    {particles.map((id, index) => (
                        <Particle key={id} index={index} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Animated Glow Background - Dourado */}
            <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
                animate={isHovered ? { 
                    opacity: 1, 
                    scale: 1.05,
                } : { 
                    opacity: 0.75, 
                    scale: 1 
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Main Button - Azul Marinho */}
            <motion.button
                className={cn(
                    "relative flex items-center justify-center gap-2 bg-[#1a3a52] text-white rounded-lg leading-none overflow-hidden",
                    "px-8 py-4 font-bold text-lg",
                    className
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick as any}
                type="button"
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>

                {/* Shine Effect - Dourado */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"
                    animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 0.5
                    }}
                />
            </motion.button>
        </div>
    );
}
