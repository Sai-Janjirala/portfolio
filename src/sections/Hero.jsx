import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { SOCIALS } from "../data";

const Hero = () => {
    const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Creative Coder", "Tech Explorer"];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        const currentRole = roles[roleIndex];

        if (isTyping) {
            if (displayText.length < currentRole.length) {
                const timeout = setTimeout(() => {
                    setDisplayText(currentRole.slice(0, displayText.length + 1));
                }, 80);
                return () => clearTimeout(timeout);
            } else {
                const timeout = setTimeout(() => setIsTyping(false), 2000);
                return () => clearTimeout(timeout);
            }
        } else {
            if (displayText.length > 0) {
                const timeout = setTimeout(() => {
                    setDisplayText(displayText.slice(0, -1));
                }, 40);
                return () => clearTimeout(timeout);
            } else {
                setRoleIndex((prev) => (prev + 1) % roles.length);
                setIsTyping(true);
            }
        }
    }, [displayText, isTyping, roleIndex]);

    const firstName = "S";
    const lastName = "JANJIRALA";

    const letterVariants = {
        hidden: { opacity: 0, y: 80, rotateX: -90 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: 0.5 + i * 0.08,
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        }),
    };

    const scrollToAbout = () => {
        const el = document.getElementById('about');
        if (el) {
            if (window.__lenis) {
                window.__lenis.scrollTo(el, { offset: -80 });
            } else {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background ambient glows */}
            <div className="absolute top-[-20%] right-[-15%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(232,168,56,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,168,56,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-6">
                {/* Greeting */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-text-muted text-sm md:text-base tracking-[0.3em] uppercase font-heading mb-6"
                >
                    Hello, I'm
                </motion.p>

                {/* Name - First */}
                <div className="overflow-hidden mb-2">
                    <div className="flex justify-center" style={{ perspective: '800px' }}>
                        {firstName.split("").map((letter, i) => (
                            <motion.span
                                key={`first-${i}`}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display font-extrabold text-text-main leading-none tracking-tight inline-block"
                                style={{ transformOrigin: 'bottom center' }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Name - Last */}
                <div className="overflow-hidden mb-8">
                    <div className="flex justify-center" style={{ perspective: '800px' }}>
                        {lastName.split("").map((letter, i) => (
                            <motion.span
                                key={`last-${i}`}
                                custom={i + firstName.length}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-[0.2em] inline-block"
                                style={{
                                    transformOrigin: 'bottom center',
                                    color: 'transparent',
                                    WebkitTextStroke: '1px #e8a838',
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Decorative line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
                />

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                    className="text-lg md:text-xl font-heading text-text-muted mb-10 h-8 flex items-center"
                >
                    <span className="text-primary mr-2">{'<'}</span>
                    <span className="text-secondary">{displayText}</span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                        className="text-primary ml-0.5"
                    >
                        |
                    </motion.span>
                    <span className="text-primary ml-2">{'/>'}</span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.2, duration: 0.6 }}
                    className="text-text-muted text-base md:text-lg max-w-lg mb-10 leading-relaxed font-light"
                >
                    Turning ideas into real-life products. I build accessible, pixel-perfect, and performant web experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.6 }}
                    className="flex flex-wrap gap-4 justify-center mb-12"
                >
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = "/resume.png";
                            link.download = "Sai_Janjirala_Resume.png";
                            link.click();
                        }}
                        className="group relative px-8 py-3 bg-primary text-background font-semibold rounded-full overflow-hidden flex items-center gap-2 hover:shadow-[0_0_30px_rgba(232,168,56,0.3)] transition-all duration-300"
                    >
                        <span className="relative z-10 font-heading text-sm tracking-wide">Resume</span>
                        <Download size={16} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                    </button>

                    <button
                        onClick={() => {
                            const el = document.getElementById('contact');
                            if (el) {
                                if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
                                else el.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-8 py-3 border border-primary/30 hover:border-primary/60 rounded-full text-text-main font-heading text-sm tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,168,56,0.1)]"
                    >
                        Contact Me
                    </button>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.6, duration: 0.6 }}
                    className="flex gap-5"
                >
                    {SOCIALS.map((social, i) => (
                        <motion.button
                            key={social.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2.6 + i * 0.1, duration: 0.4 }}
                            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                            className="text-text-muted hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-1 outline-none"
                        >
                            <social.icon size={20} />
                        </motion.button>
                    ))}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={scrollToAbout}
            >
                <span className="text-text-muted text-xs tracking-[0.2em] uppercase font-heading">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={16} className="text-primary" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
