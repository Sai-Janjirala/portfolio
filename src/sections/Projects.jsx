import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import { PROJECTS } from '../data';

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

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
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                whileHover={{ y: -8 }}
                className="group relative h-full bg-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 cursor-pointer"
                onClick={() => project.link && window.open(project.link, '_blank')}
            >
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        style={{ translateZ: "30px" }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover overlay with links */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.github, '_blank', 'noopener,noreferrer');
                            }}
                            className="p-3 bg-background/80 backdrop-blur-sm text-primary rounded-full hover:bg-primary hover:text-background transition-all shadow-lg border border-border/50 outline-none"
                        >
                            <Github size={18} />
                        </motion.button>
                        {project.link && (
                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(project.link, '_blank', 'noopener,noreferrer');
                                }}
                                className="p-3 bg-background/80 backdrop-blur-sm text-primary rounded-full hover:bg-primary hover:text-background transition-all shadow-lg border border-border/50 outline-none"
                            >
                                <ExternalLink size={18} />
                            </motion.button>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                    <motion.div style={{ translateZ: "20px" }} className="mb-4">
                        <h3 className="text-lg font-heading font-bold mb-2 text-text-main group-hover:text-primary transition-colors capitalize">
                            {project.title}
                        </h3>
                        <p className="text-text-muted text-sm line-clamp-2 leading-relaxed">
                            {project.description}
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border/30">
                        {project.tech.map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 + i * 0.05, duration: 0.3 }}
                                className="text-xs px-2.5 py-1 rounded-full bg-surface-light/80 text-text-muted border border-border/30 flex items-center gap-1 group-hover:border-primary/20 transition-colors"
                            >
                                <Code2 size={10} className="text-primary/70" />
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Number badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.3, type: "spring", stiffness: 400 }}
                    className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border/50 flex items-center justify-center"
                >
                    <span className="text-xs font-heading font-bold text-primary">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </motion.div>

                {/* Bottom glow on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/50 to-transparent transition-all duration-500" />
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const [showAll, setShowAll] = useState(false);
    const displayedProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    return (
        <section id="projects" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
            <motion.div
                style={{ y: bgY }}
                className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] translate-y-1/2 pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.1em" }}
                        whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-primary text-sm uppercase font-heading mb-3"
                    >
                        My Work
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-4"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-text-muted text-lg"
                    >
                        Innovation through code.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {PROJECTS.length > 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mt-16 flex justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(232,168,56,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-3 bg-surface border border-primary/30 hover:border-primary/60 rounded-full text-text-main font-heading text-sm tracking-wide transition-all duration-300"
                        >
                            {showAll ? 'Show Less' : 'View All Projects'}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Projects;
