import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => {
                        setIsComplete(true);
                        setTimeout(() => onComplete(), 600);
                    }, 400);
                    return 100;
                }
                // Accelerating progress
                const increment = prev < 30 ? 3 : prev < 60 ? 4 : prev < 90 ? 5 : 2;
                return Math.min(prev + increment, 100);
            });
        }, 40);
        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[99999] bg-[#0a0a0b] flex flex-col items-center justify-center"
                    exit={{ 
                        clipPath: 'inset(0 0 100% 0)',
                        transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] }
                    }}
                >
                    {/* SVG Initials */}
                    <motion.div className="relative mb-12">
                        <svg width="120" height="80" viewBox="0 0 120 80" className="overflow-visible">
                            {/* S */}
                            <motion.text
                                x="20"
                                y="60"
                                fill="none"
                                stroke="#e8a838"
                                strokeWidth="1.5"
                                fontSize="56"
                                fontFamily="Syne, sans-serif"
                                fontWeight="700"
                                initial={{ strokeDasharray: 200, strokeDashoffset: 200, fillOpacity: 0 }}
                                animate={{ 
                                    strokeDashoffset: 0, 
                                    fillOpacity: 1,
                                    fill: '#e8a838'
                                }}
                                transition={{ 
                                    strokeDashoffset: { duration: 1.5, ease: "easeInOut" },
                                    fillOpacity: { delay: 1.2, duration: 0.5 },
                                    fill: { delay: 1.2, duration: 0.5 }
                                }}
                            >
                                S
                            </motion.text>
                            {/* J */}
                            <motion.text
                                x="65"
                                y="60"
                                fill="none"
                                stroke="#e8a838"
                                strokeWidth="1.5"
                                fontSize="56"
                                fontFamily="Syne, sans-serif"
                                fontWeight="700"
                                initial={{ strokeDasharray: 200, strokeDashoffset: 200, fillOpacity: 0 }}
                                animate={{ 
                                    strokeDashoffset: 0,
                                    fillOpacity: 1,
                                    fill: '#e8a838'
                                }}
                                transition={{ 
                                    strokeDashoffset: { delay: 0.3, duration: 1.5, ease: "easeInOut" },
                                    fillOpacity: { delay: 1.5, duration: 0.5 },
                                    fill: { delay: 1.5, duration: 0.5 }
                                }}
                            >
                                J
                            </motion.text>
                        </svg>

                        {/* Decorative line under initials */}
                        <motion.div
                            className="h-px bg-gradient-to-r from-transparent via-primary to-transparent mt-4"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                        />
                    </motion.div>

                    {/* Progress */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-48 h-[2px] bg-border rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <motion.span
                            className="text-text-muted text-sm font-heading tracking-[0.3em]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {progress}%
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
