import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [activeSection, setActiveSection] = useState("home");
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const updateNavbar = useCallback((currentScrollY) => {
        setScrolled(currentScrollY > 50);

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY.current && currentScrollY > 300) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        lastScrollY.current = currentScrollY;

        // Determine active section based on viewport
        const sectionIds = navLinks.map(l => l.id);
        let found = false;
        for (let i = sectionIds.length - 1; i >= 0; i--) {
            const el = document.getElementById(sectionIds[i]);
            if (el) {
                const rect = el.getBoundingClientRect();
                if (rect.top <= 200) {
                    setActiveSection(sectionIds[i]);
                    found = true;
                    break;
                }
            }
        }
        if (!found) setActiveSection("home");
    }, []);

    useEffect(() => {
        // Try to hook into Lenis for perfectly synced scroll updates
        const lenis = window.__lenis;

        if (lenis) {
            const onLenisScroll = ({ scroll }) => {
                if (!ticking.current) {
                    ticking.current = true;
                    requestAnimationFrame(() => {
                        updateNavbar(scroll);
                        ticking.current = false;
                    });
                }
            };
            lenis.on("scroll", onLenisScroll);
            return () => lenis.off("scroll", onLenisScroll);
        }

        // Fallback to native scroll
        const handleScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(() => {
                    updateNavbar(window.scrollY);
                    ticking.current = false;
                });
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [updateNavbar]);

    // Re-attach when Lenis becomes available (may initialize after Navbar)
    useEffect(() => {
        const checkLenis = setInterval(() => {
            if (window.__lenis) {
                clearInterval(checkLenis);
                // Force a re-render to pick up lenis
                updateNavbar(window.__lenis?.scroll || 0);
            }
        }, 200);
        const timer = setTimeout(() => clearInterval(checkLenis), 3000);
        return () => {
            clearInterval(checkLenis);
            clearTimeout(timer);
        };
    }, [updateNavbar]);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -80 });
            } else {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div className="container mx-auto px-6 py-4 flex justify-center">
                {/* Floating pill navbar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
                        scrolled 
                            ? 'bg-surface/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/20' 
                            : 'bg-transparent'
                    }`}
                >
                    {/* Logo - SJ */}
                    <motion.button
                        onClick={() => scrollToSection('home')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-1.5 text-primary font-display font-bold text-lg tracking-tight mr-2 outline-none"
                    >
                        SJ
                    </motion.button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                                onClick={() => scrollToSection(link.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-4 py-1.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full outline-none ${
                                    activeSection === link.id
                                        ? 'text-background'
                                        : 'text-text-muted hover:text-text-main'
                                }`}
                            >
                                {activeSection === link.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-primary rounded-full"
                                        style={{ originY: "0px" }}
                                        transition={{ type: "spring", stiffness: 350, damping: 28, mass: 0.8 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden text-text-main p-2 outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={22} />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu size={22} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-2xl border-b border-border overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-8 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`text-lg font-medium transition-colors outline-none ${
                                        activeSection === link.id ? 'text-primary' : 'text-text-muted hover:text-text-main'
                                    }`}
                                >
                                    {link.name}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
