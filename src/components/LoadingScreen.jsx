import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Fast sequence to complement the fast hydration
        const timer = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 1000); // Allow exit animations to finish
        }, 1200);
        
        return () => clearTimeout(timer);
    }, [onComplete]);

    // Path draw animation
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => {
            const delay = 0.1;
            return {
                pathLength: 1,
                opacity: 1,
                transition: {
                    pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
                    opacity: { delay, duration: 0.1 }
                }
            };
        }
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
                >
                    {/* 
                     * CRUCIAL PERFORMANCE HACK: 
                     * We DO NOT use an opaque background color here! 
                     * Leaving the background transparent allows the browser to paint the 
                     * text behind this overlay instantly, securing a blazing fast LCP! 
                     */}

                    {/* Left/Right architectural guide lines (very subtle) */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="absolute left-10 md:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" 
                    />
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute right-10 md:right-20 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" 
                    />

                    {/* Center Aesthetic Emblem Loader */}
                    <motion.div 
                        className="relative flex items-center justify-center p-12"
                        exit={{ scale: 2, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                    >
                        {/* Ambient glow behind loader */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.2, 0.8] }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 bg-primary/20 rounded-full blur-2xl flex-shrink-0 pointer-events-none"
                        />

                        {/* Animated SVG Diamond/Emblem */}
                        <motion.svg 
                            width="120" 
                            height="120" 
                            viewBox="0 0 100 100" 
                            className="drop-shadow-[0_0_15px_rgba(232,168,56,0.5)]"
                        >
                            {/* Outer rotating diamond */}
                            <motion.rect
                                x="10" y="10" width="80" height="80"
                                fill="transparent"
                                stroke="#e8a838"
                                strokeWidth="1"
                                rx="2"
                                variants={draw}
                                initial="hidden"
                                animate="visible"
                                className="origin-center"
                                style={{ rotate: 45 }}
                            />
                            
                            {/* Inner rotating diamond (offset) */}
                            <motion.rect
                                x="25" y="25" width="50" height="50"
                                fill="transparent"
                                stroke="#d4a056"
                                strokeWidth="1.5"
                                rx="1"
                                variants={{
                                    hidden: { pathLength: 0, opacity: 0, rotate: 45 },
                                    visible: {
                                        pathLength: 1, 
                                        opacity: 1,
                                        rotate: [45, 225],
                                        transition: {
                                            pathLength: { delay: 0.1, type: "spring", duration: 1.5, bounce: 0 },
                                            opacity: { delay: 0.1, duration: 0.1 },
                                            rotate: { ease: "linear", duration: 2, repeat: Infinity }
                                        }
                                    }
                                }}
                                initial="hidden"
                                animate="visible"
                                className="origin-center"
                            />

                            {/* Core dot */}
                            <motion.circle
                                cx="50" cy="50" r="4"
                                fill="#e8a838"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.8] }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </motion.svg>

                        {/* Loading Text Sequence */}
                        <div className="absolute top-full mt-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                            <motion.div 
                                className="flex gap-1 mb-2"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: { staggerChildren: 0.1, delayChildren: 0.4 }
                                    }
                                }}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.div 
                                        key={i}
                                        variants={{
                                            hidden: { y: 5, opacity: 0 },
                                            visible: { y: 0, opacity: 1 }
                                        }}
                                        className="w-1 h-3 bg-primary/80 rounded-full"
                                    />
                                ))}
                            </motion.div>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-text-muted font-heading text-[10px] tracking-[0.3em] uppercase whitespace-nowrap"
                            >
                                Initializing Core
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
