import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Code2, Cpu, Database } from "lucide-react";
import { SOCIALS } from "../data";

const Hero = () => {
    const roles = ["Full-Stack Developer", "UI/UX Enthusiast", "Creative Coder", "Tech Explorer"];
    const [roleIndex, setRoleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);

    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
    const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);
    const heroY = useTransform(scrollY, [0, 600], [0, 100]);

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

    const firstName = "SAI";
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

    // Floating particles
    const particles = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5,
    })), []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background ambient glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.08, 0.05],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] right-[-15%] w-[600px] h-[600px] bg-primary rounded-full blur-[150px] pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.05, 0.07, 0.05],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] bg-accent rounded-full blur-[150px] pointer-events-none"
            />

            {/* Floating particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-primary/20 pointer-events-none will-change-transform will-change-opacity"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 30 - 15, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(232,168,56,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,168,56,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Decorative SVGs around the edges */}
            <motion.div 
                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-[10%] text-primary/10 pointer-events-none hidden md:block"
            >
                <Code2 size={120} />
            </motion.div>
            
            <motion.div 
                animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-[10%] text-accent/10 pointer-events-none hidden md:block"
            >
                <Cpu size={100} />
            </motion.div>

            <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 right-[15%] text-primary/15 pointer-events-none hidden lg:block"
            >
                <Database size={60} />
            </motion.div>

            {/* Animated dashed lines on sides */}
            <div className="absolute top-0 bottom-0 left-8 w-px bg-[linear-gradient(to_bottom,transparent,rgba(232,168,56,0.2)_50%,transparent)] hidden md:block"></div>
            <div className="absolute top-0 bottom-0 right-8 w-px bg-[linear-gradient(to_bottom,transparent,rgba(212,160,86,0.2)_50%,transparent)] hidden md:block"></div>

            {/* Code Snippet Background Element */}
            <div className="absolute left-[5%] top-[15%] opacity-[0.04] text-xs font-mono whitespace-pre pointer-events-none hidden xl:block leading-relaxed">
{`function buildAwesome() {
  const stack = ['React', 'Node'];
  return stack.map(tech => 
    createMagic(tech)
  );
}

const UI = {
  dynamic: true,
  beautiful: true,
  performant: true
};`}
            </div>

            <div className="absolute right-[5%] bottom-[15%] opacity-[0.04] text-xs font-mono whitespace-pre pointer-events-none hidden xl:block text-right leading-relaxed">
{`async function fetchFuture() {
  try {
    const ideas = await brainstorm();
    execute(ideas, { 
      flawless: true 
    });
  } catch(e) {
    debug(e);
  }
}`}
            </div>

            {/* Orbital rings behind name */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[600px] h-[600px] rounded-full border border-primary/[0.03]"
                />
                <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                    className="w-200 h-200 rounded-full border border-primary/[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            </div>

            <motion.div
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                {/* Greeting */}
                <motion.p
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-text-muted text-sm md:text-base tracking-[0.3em] uppercase font-heading mb-6"
                >

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
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-8"
                />

                {/* Typewriter role */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
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
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 2.2, duration: 0.8 }}
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
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(232,168,56,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = "/resume.png";
                            link.download = "Sai_Janjirala_Resume.png";
                            link.click();
                        }}
                        className="group relative px-8 py-3 bg-primary text-background font-semibold rounded-full overflow-hidden flex items-center gap-2 transition-all duration-300"
                    >
                        <span className="relative z-10 font-heading text-sm tracking-wide">Resume</span>
                        <Download size={16} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity" />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(232,168,56,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const el = document.getElementById('contact');
                            if (el) {
                                if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80 });
                                else el.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="px-8 py-3 border border-primary/30 hover:border-primary/60 rounded-full text-text-main font-heading text-sm tracking-wide transition-all duration-300"
                    >
                        Contact Me
                    </motion.button>
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
                            whileHover={{ scale: 1.2, y: -3, color: "#e8a838" }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                            className="text-text-muted transition-all duration-300 outline-none"
                        >
                            <social.icon size={20} />
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
                onClick={scrollToAbout}
            >
                <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-text-muted text-xs tracking-[0.2em] uppercase font-heading"
                >
                    Scroll
                </motion.span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ArrowDown size={16} className="text-primary" />
                </motion.div>
                {/* Scroll line */}
                <motion.div
                    className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
                    animate={{ scaleY: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: "top" }}
                />
            </motion.div>
        </section>
    );
};

export default Hero;
