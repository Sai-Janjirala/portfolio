import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const springX = useSpring(cursorX, springConfig);
    const springY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check for mobile/touch devices
        const checkMobile = () => setIsMobile(window.matchMedia('(pointer: coarse)').matches);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHoverStart = () => setIsHovered(true);
        const handleHoverEnd = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]');
            interactiveElements.forEach((el) => {
                el.addEventListener('mouseenter', handleHoverStart);
                el.addEventListener('mouseleave', handleHoverEnd);
            });
        };

        attachListeners();
        let timeoutId;
        const observer = new MutationObserver(() => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(attachListeners, 100);
        });
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('resize', checkMobile);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    if (isMobile) return null;

    return (
        <div className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference">
            {/* Dot */}
            <motion.div
                className="absolute top-0 left-0 rounded-full bg-primary"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovered ? 8 : 4,
                    height: isHovered ? 8 : 4,
                    willChange: "transform, width, height"
                }}
                transition={{ width: { duration: 0.2 }, height: { duration: 0.2 } }}
            />

            {/* Ring */}
            <motion.div
                className="absolute top-0 left-0 border rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovered ? 48 : 28,
                    height: isHovered ? 48 : 28,
                    borderColor: isHovered ? 'rgba(232, 168, 56, 0.6)' : 'rgba(232, 168, 56, 0.3)',
                    willChange: "transform, width, height, border-color"
                }}
                transition={{ width: { duration: 0.3 }, height: { duration: 0.3 } }}
            />
        </div>
    );
};

export default CustomCursor;
