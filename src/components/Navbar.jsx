import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState("home");

    const navLinks = [
        { name: "Home", id: "home" },
        { name: "About", id: "about" },
        { name: "Skills", id: "skills" },
        { name: "Projects", id: "projects" },
        { name: "Certifications", id: "certifications" },
        { name: "Contact", id: "contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 50);
            
            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                setHidden(true);
            } else {
                setHidden(false);
            }
            setLastScrollY(currentScrollY);

            // Determine active section
            const sections = navLinks.map(l => l.id);
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

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
            initial={{ y: -100 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-center">
                {/* Floating pill navbar */}
                <div className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
                    scrolled 
                        ? 'bg-surface/80 backdrop-blur-xl border border-border/50 shadow-lg shadow-black/20' 
                        : 'bg-transparent'
                }`}>
                    {/* Logo - SJ */}
                    <button
                        onClick={() => scrollToSection('home')}
                        className="px-4 py-1.5 text-primary font-display font-bold text-lg tracking-tight mr-2 outline-none"
                    >
                        SJ
                    </button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.id)}
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
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{link.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-text-main p-2 outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-2xl border-b border-border"
                    >
                        <div className="flex flex-col items-center py-8 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
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
