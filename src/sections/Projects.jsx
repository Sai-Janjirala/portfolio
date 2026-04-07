import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Code2 } from 'lucide-react';
import { PROJECTS } from '../data';

const ProjectCard = ({ project, index }) => {
    const ref = useRef(null);

    // Motion values for tilt effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXVal = e.clientX - rect.left;
        const mouseYVal = e.clientY - rect.top;

        const xPct = mouseXVal / width - 0.5;
        const yPct = mouseYVal / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
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
                className="group relative h-full bg-surface/40 backdrop-blur-md border border-text-main/10 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                onClick={() => window.open(project.link, '_blank')}
            >
                {/* Image Section */}
                <div className="h-48 overflow-hidden relative transform-3d">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        style={{
                            translateZ: "50px",
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay with Links */}
                    <div className="absolute inset-0 z-20 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.github, '_blank', 'noopener,noreferrer');
                            }}
                            className="p-3 bg-text-main text-background rounded-full hover:scale-110 hover:bg-white transition-all shadow-lg outline-none"
                        >
                            <Github size={22} />
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative transform-3d">
                    <motion.div
                        style={{ translateZ: "30px" }}
                        className="mb-4"
                    >
                        <h3 className="text-xl font-bold mb-2 text-text-main group-hover:text-cyan-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-text-muted text-sm line-clamp-3">
                            {project.description}
                        </p>
                    </motion.div>

                    <motion.div
                        style={{ translateZ: "20px" }}
                        className="flex flex-wrap gap-2 pt-4 border-t border-text-main/10"
                    >
                        {project.tech.map((tech) => (
                            <span key={tech} className="text-xs px-3 py-1 rounded-full bg-surface text-text-muted border border-text-main/10 flex items-center gap-1 group-hover:border-cyan-500/30 transition-colors">
                                <Code2 size={12} className="text-cyan-400" />
                                {tech}
                            </span>
                        ))}
                    </motion.div>
                </div>

                {/* Border Glow */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-2xl transition-colors duration-300 pointer-events-none" />
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-24 relative overflow-hidden bg-black/5">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Featured Projects</span>
                    </h2>
                    <p className="text-text-muted text-lg">Innovation through code.</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
