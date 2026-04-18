import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        // Shorter delay before completing so LCP isn't blocked
        const timer = setTimeout(() => {
            setIsComplete(true);
            setTimeout(() => onComplete(), 700);
        }, 150);
        
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[99999] pointer-events-none flex flex-col"
                    exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.6 } }}
                >
                    {/* Top Shutter */}
                    <motion.div 
                        className="w-full h-1/2 bg-[#0a0a0b] origin-top border-b border-[#e8a838]/30 flex items-end justify-center pb-3"
                        initial={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                    >
                        <motion.span 
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="text-[#e8a838] font-display font-medium text-2xl sm:text-4xl tracking-[0.4em] uppercase"
                        >
                            SAI
                        </motion.span>
                    </motion.div>
                    
                    {/* Bottom Shutter */}
                    <motion.div 
                        className="w-full h-1/2 bg-[#0a0a0b] origin-bottom flex items-start justify-center pt-3"
                        initial={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1], delay: 0.1 }}
                    >
                         <motion.span 
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="text-text-muted font-display font-light text-2xl sm:text-4xl tracking-[0.4em] uppercase"
                        >
                            JANJIRALA
                        </motion.span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
