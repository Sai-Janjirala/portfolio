import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Contact", id: "contact" },
];

const SOCIALS_NAV = [
    { name: "GitHub", url: "https://github.com/Sai-Janjirala", icon: Github },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/sai-janjirala-5704a6394/", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter },
    { name: "Youtube", url: "https://www.youtube.com/@Saii-Janjirala", icon: Youtube },
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
        document.body.style.overflow = '';
    };

    // Toggle scroll lock when menu opens/closes
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            if (window.__lenis) window.__lenis.stop();
        } else {
            document.body.style.overflow = '';
            if (window.__lenis) window.__lenis.start();
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-0 left-0 w-full z-50"
        >
            <div className="container mx-auto px-6 py-4 flex md:justify-center">
                {/* Floating pill navbar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                    className={`flex items-center justify-between md:justify-start w-full md:w-auto gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
                        scrolled 
                            ? 'bg-surface/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/20' 
                            : 'bg-transparent'
                    }`}
                >
                    {/* Logo */}
                    <motion.button
                        onClick={() => scrollToSection('home')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-2 py-1 text-primary outline-none flex items-center justify-center mr-2 lg:mr-4"
                        aria-label="Home"
                    >
                        <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                            <path d="M50 5L90 28V72L50 95L10 72V28L50 5Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
                            <path d="M50 15L81 33V67L50 85L19 67V33L50 15Z" fill="currentColor" fillOpacity="0.15" />
                            <text x="50" y="66" textAnchor="middle" fontSize="42" fontWeight="800" fontFamily="Syne, sans-serif" fill="currentColor" letterSpacing="-2">SJ</text>
                        </svg>
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

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="md:hidden text-text-main p-2 outline-none relative z-[60]"
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

            {/* Fullscreen Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md md:hidden touch-none flex flex-col justify-center items-center h-screen w-full"
                    >
                        {/* Background subtle glow */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.15, 0.1] }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"
                        />

                        <div className="flex flex-col items-center space-y-8 w-full z-10">
                            {navLinks.map((link, i) => (
                                <div key={link.name} className="overflow-hidden">
                                    <motion.button
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ 
                                            delay: i * 0.1, 
                                            duration: 0.5, 
                                            ease: [0.33, 1, 0.68, 1] 
                                        }}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`text-4xl sm:text-5xl font-display font-bold tracking-tight outline-none transition-colors duration-300 ${
                                            activeSection === link.id ? 'text-primary' : 'text-text-main hover:text-primary/70'
                                        }`}
                                    >
                                        {link.name}
                                    </motion.button>
                                </div>
                            ))}
                        </div>

                        {/* Social Links at Bottom */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="absolute bottom-12 flex gap-6 z-10"
                        >
                            {SOCIALS_NAV.map((social) => (
                                <motion.button
                                    key={social.name}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => window.open(social.url, '_blank')}
                                    className="text-text-muted hover:text-primary transition-colors outline-none p-2"
                                >
                                    <social.icon size={24} />
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
