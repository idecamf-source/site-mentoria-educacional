import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    href?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function GlowButton({
    className,
    children,
    href,
    onClick,
    ...props
}: GlowButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);

        if (href) {
            // Create a transition effect before navigating
            // We can use a small delay to let the click animation play
            setTimeout(() => {
                window.open(href, "_blank");
            }, 300);
        }
    };

    return (
        <div className="relative group">
            {/* Animated Glow Background */}
            <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
            />

            {/* Main Button */}
            <motion.button
                className={cn(
                    "relative flex items-center justify-center gap-2 bg-black text-white rounded-lg leading-none overflow-hidden",
                    "px-8 py-4 font-bold text-lg", // Default sizing
                    className
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClick}
                {...props}
            >
                <span className="relative z-10 flex items-center gap-2">
                    {children}
                </span>

                {/* Shine Effect */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%]"
                    variants={{
                        hover: { translateX: "100%" }
                    }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
            </motion.button>
        </div>
    );
}
