import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            autoRaf: true, // Use Lenis's internal RAF loop
        });

        lenisRef.current = lenis;

        // Make lenis accessible globally FIRST
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
