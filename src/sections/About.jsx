import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import profile from "../assets/profile.jpg";

const InteractivePhoto = () => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;
        x.set(mouseXVal / width - 0.5);
        y.set(mouseYVal / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ perspective: 1200 }}
            className="relative w-80 h-80 md:w-[400px] md:h-[400px] xl:w-[450px] xl:h-[450px] flex items-center justify-center"
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full rounded-3xl transition-all duration-200"
            >
                {/* Back Glow - Powerful and Dynamic */}
                <div
                    className="absolute inset-4 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-3xl blur-2xl opacity-60 animate-pulse transform translate-z-[-40px]"
                />

                {/* Main Glass Container */}
                <div className="relative w-full h-full bg-surface/80 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl group">

                    {/* Viewfinder Corners (Cyberpunk Aesthetic) */}
                    <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg z-20 opacity-80" />
                    <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-400 rounded-tr-lg z-20 opacity-80" />
                    <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-purple-400 rounded-bl-lg z-20 opacity-80" />
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400 rounded-br-lg z-20 opacity-80" />

                    {/* Image with enhanced Depth */}
                    <motion.div
                        style={{ translateZ: "40px" }}
                        className="w-full h-full relative p-2"
                    >
                        <div className="w-full h-full rounded-2xl overflow-hidden relative">
                            <img
                                src={profile}
                                alt="About Me"
                                className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
                                style={{ objectPosition: "center top" }}
                            />

                            {/* Scanline Effect Overlay */}
                            <div
                                className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                                style={{
                                    backgroundImage: "linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.5) 50%)",
                                    backgroundSize: "100% 4px"
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                        </div>
                    </motion.div>

                    {/* Animated Border Gradient */}
                    <div className="absolute inset-0 border border-white/5 rounded-3xl pointer-events-none group-hover:border-cyan-500/40 transition-colors duration-500" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const About = () => {
    return (
        <section id="about" className="py-20 bg-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-[-10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-8 md:px-16 lg:px-28 xl:px-36 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-text-main text-center">
                        About <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Me</span>
                    </h2>

                    {/* Photo - Centered on top */}
                    <div className="flex justify-center mb-10">
                        <InteractivePhoto />
                    </div>

                    {/* Content Below */}
                    <div className="w-full max-w-3xl">
                        <div className="glass-card p-6 md:p-8 rounded-2xl border border-text-main/10 bg-surface/50 backdrop-blur-sm shadow-xl">
                            {/* Main Profession Highlight */}
                            <p className="text-lg md:text-xl font-semibold text-text-main mb-4 text-center">
                                I'm a <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold">Full-Stack Developer</span> who turns ideas into real-world products.
                            </p>

                            <p className="text-text-muted leading-relaxed mb-3">
                                I build across the entire stack — crafting <span className="text-cyan-400 font-medium">clean, user-friendly interfaces</span> and writing <span className="text-cyan-400 font-medium">efficient, scalable backend logic</span>. My focus is on code that's <span className="text-purple-400 font-medium">clear, structured, and maintainable</span>, with strong attention to <span className="text-cyan-400 font-medium">performance, security, and usability</span>.
                            </p>
                            <p className="text-text-muted leading-relaxed">
                                I learn by building — breaking things, fixing them, and understanding why. I value <span className="text-purple-400 font-medium">consistency over hype</span>, meet deadlines, communicate clearly, and take ownership. Always looking to <span className="text-cyan-400 font-medium">learn, improve, and build software people can rely on</span>.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-8 justify-center">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-text-main">1+</h3>
                                <p className="text-sm text-text-muted">Years Experience</p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-text-main">30+</h3>
                                <p className="text-sm text-text-muted">Projects Completed</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
