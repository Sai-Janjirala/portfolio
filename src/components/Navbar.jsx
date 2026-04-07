import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { Link } from 'react-scroll';
import logo from "../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Certifications", href: "#certifications" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-text-main/10 shadow-lg" : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="home" smooth={true} duration={500} className="group relative flex items-center cursor-pointer">
                    <div className="relative h-12 flex items-center justify-center rounded-lg overflow-hidden group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-shadow duration-500">
                        <img
                            src={logo}
                            alt="SJ Logo"
                            className="h-full w-auto object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href.substring(1)}
                            smooth={true}
                            duration={500}
                            className="text-text-muted hover:text-text-main hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-300 text-sm uppercase tracking-wider cursor-pointer"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pl-4 border-l border-text-muted/20">
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text-main focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background/95 backdrop-blur-xl border-b border-text-main/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href.substring(1)}
                                    smooth={true}
                                    duration={500}
                                    onClick={() => setIsOpen(false)}
                                    className="text-text-main text-lg hover:text-primary transition-colors cursor-pointer"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-text-main/10 w-full flex justify-center">
                                <ThemeToggle />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
