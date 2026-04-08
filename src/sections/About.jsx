import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
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
        x.set(e.clientX / rect.width - 0.5);
        y.set(e.clientY / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{ perspective: 1200 }}
            className="relative w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem]"
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
                className="relative w-full h-full rounded-2xl"
            >
                {/* Warm glow behind */}
                <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl blur-2xl opacity-50 animate-pulse-slow" />

                {/* Main container */}
                <div className="relative w-full h-full bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl shadow-black/40 group">
                    
                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-primary/50 rounded-tl-md z-20" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-primary/50 rounded-tr-md z-20" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-primary/50 rounded-bl-md z-20" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-primary/50 rounded-br-md z-20" />

                    {/* Image */}
                    <motion.div
                        style={{ translateZ: "30px" }}
                        className="w-full h-full p-1.5"
                    >
                        <div className="w-full h-full rounded-xl overflow-hidden relative">
                            <img
                                src={profile}
                                alt="Sai Janjirala"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                style={{ objectPosition: "center top" }}
                            />
                            {/* Warm gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-primary/10 opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
                        </div>
                    </motion.div>

                    {/* Border glow on hover */}
                    <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/20 rounded-2xl transition-colors duration-500 pointer-events-none" />
                </div>
            </motion.div>
        </motion.div>
    );
};

const AnimatedCounter = ({ value, suffix = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    
    return (
        <span ref={ref}>
            {isInView ? (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {value}{suffix}
                </motion.span>
            ) : "0"}
        </span>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 md:py-32 relative overflow-hidden">
            {/* Background accents */}
            <div className="absolute top-1/3 left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-[-10%] w-[300px] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-3">Who I Am</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main">
                        About <span className="text-primary">Me</span>
                    </h2>
                </motion.div>

                {/* Content grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Photo - Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex justify-center lg:justify-end"
                    >
                        <InteractivePhoto />
                    </motion.div>

                    {/* Text - Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-heading font-semibold text-text-main leading-relaxed">
                                I'm a <span className="text-primary">Full-Stack Developer</span> who turns ideas into real-world products.
                            </p>

                            <p className="text-text-muted leading-relaxed">
                                I build across the entire stack — crafting <span className="text-secondary font-medium">clean, user-friendly interfaces</span> and writing <span className="text-secondary font-medium">efficient, scalable backend logic</span>. My focus is on code that's <span className="text-primary/80 font-medium">clear, structured, and maintainable</span>, with strong attention to performance, security, and usability.
                            </p>

                            <p className="text-text-muted leading-relaxed">
                                I learn by building — breaking things, fixing them, and understanding why. I value <span className="text-primary/80 font-medium">consistency over hype</span>, meet deadlines, communicate clearly, and take ownership. Always looking to learn, improve, and build software people can rely on.
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />

                        {/* Stats */}
                        <div className="flex gap-12">
                            <div>
                                <h3 className="text-3xl font-display font-bold text-primary">
                                    <AnimatedCounter value="1" suffix="+" />
                                </h3>
                                <p className="text-sm text-text-muted font-heading mt-1">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-display font-bold text-primary">
                                    <AnimatedCounter value="30" suffix="+" />
                                </h3>
                                <p className="text-sm text-text-muted font-heading mt-1">Projects Built</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
