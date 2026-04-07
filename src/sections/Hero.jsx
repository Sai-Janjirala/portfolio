import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Link } from 'react-scroll';
import { SOCIALS } from "../data";
import profile from "../assets/profile.jpg";

const Hero = () => {
    const roles = ["Frontend Developer", "UI/UX Enthusiast", "Creative Coder", "Tech Explorer"];
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Background Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-8 md:px-16 lg:px-28 xl:px-36 grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="order-2 md:order-1 text-left"
                >
                    <h2 className="text-xl md:text-2xl font-medium text-cyan-400 mb-4">Hello, I'm</h2>
                    <h1 className="text-5xl md:text-7xl font-bold text-text-main mb-6 tracking-tight">
                        Sai Janjirala
                    </h1>

                    <div className="text-2xl md:text-4xl font-bold text-text-muted mb-8 h-[50px] flex items-center">
                        <span>I am a&nbsp;</span>
                        <span className="text-purple-400 relative">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={roleIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-max"
                                >
                                    {roles[roleIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </div>

                    <p className="text-text-muted text-lg md:text-xl max-w-lg mb-8 leading-relaxed">
                        Turning ideas into real life products is my calling. I build accessible, pixel-perfect, and performant web experiences.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <button
                            onClick={() => {
                                const link = document.createElement('a');
                                link.href = "/resume.png";
                                link.download = "Sai_Janjirala_Resume.png";
                                link.click();
                            }}
                            className="group relative px-8 py-3 bg-text-main text-background font-semibold rounded-full overflow-hidden flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                        >
                            <span className="relative z-10">Resume</span>
                            <Download size={20} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>

                        <Link
                            to="contact"
                            smooth={true}
                            duration={500}
                            className="px-8 py-3 border border-text-main/20 hover:bg-text-main/5 rounded-full text-text-main font-medium transition-colors cursor-pointer"
                        >
                            Contact Me
                        </Link>
                    </div>


                    <div className="flex gap-6 mt-12 text-text-muted">
                        {SOCIALS.map((social) => (
                            <button
                                key={social.name}
                                onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                                className="hover:text-text-main transition-colors hover:scale-110 transform cursor-pointer outline-none"
                            >
                                <social.icon size={24} />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Hero Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="order-1 md:order-2 flex justify-center"
                >
                    <div className="relative w-72 h-72 md:w-96 md:h-96">
                        {/* Glow Behind */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-cyan-500 rounded-full blur-[50px] opacity-40 animate-pulse" />

                        {/* Image Container with Premium Effect */}
                        <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-transparent bg-gradient-to-br from-cyan-400 to-purple-500 p-[3px] shadow-[0_0_30px_rgba(139,92,246,0.3)] group hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-500">
                            <div className="w-full h-full rounded-full overflow-hidden bg-black relative">
                                <img
                                    src={profile}
                                    alt="Profile"
                                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                                    style={{ objectPosition: "center -26px" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
