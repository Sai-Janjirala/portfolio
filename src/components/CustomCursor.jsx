import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Use a very stiff spring for a "to the point" feel with minimal drift
    const springConfig = { damping: 40, stiffness: 400, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHoverStart = () => setIsHovered(true);
        const handleHoverEnd = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to interactive elements
        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        attachListeners();

        // Observe DOM changes to attach listeners to new elements
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-exclusion">
            {/* Main Dot - Direct Tracking for Precision */}
            <motion.div
                className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full"
                style={{
                    x: cursorX, // Direct mapping, no spring lag
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Aesthetic Ring - Slight Spring for smooth follow */}
            <motion.div
                className="absolute top-0 left-0 border border-cyan-400 rounded-sm"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovered ? 40 : 24,
                    height: isHovered ? 40 : 24,
                    rotate: isHovered ? 45 : 0,
                    opacity: 0.8,
                }}
                transition={{ duration: 0.2 }}
            >
                {/* Decorative corners for cyberpunk feel */}
                <div className="absolute -top-[1px] -left-[1px] w-1.5 h-1.5 border-t border-l border-white" />
                <div className="absolute -bottom-[1px] -right-[1px] w-1.5 h-1.5 border-b border-r border-white" />
            </motion.div>
        </div>
    );
};

export default CustomCursor;
