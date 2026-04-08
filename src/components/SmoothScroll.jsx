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
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Make lenis accessible for scroll-to functionality
        window.__lenis = lenis;

        return () => {
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
