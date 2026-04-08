import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CERTIFICATIONS } from '../data';
import { Award, Calendar } from 'lucide-react';

const TimelineCard = ({ cert, index, isLeft }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative flex ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} w-full md:w-1/2 ${isLeft ? 'md:self-start' : 'md:self-start md:ml-auto'}`}
        >
            {/* Timeline dot */}
            <div className={`hidden md:block absolute top-6 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-3 h-3 rounded-full bg-primary border-2 border-background z-10`} />
            
            <div className="group bg-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl hover:border-primary/30 transition-all duration-500 overflow-hidden shadow-lg shadow-black/20 w-full max-w-lg">
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Date badge */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 bg-background/70 backdrop-blur-sm rounded-full border border-border/30">
                        <Calendar size={12} className="text-primary" />
                        <span className="text-xs font-heading text-text-muted">{cert.date}</span>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-lg font-heading font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors">
                        {cert.title}
                    </h3>
                    <p className="text-primary/80 font-medium text-sm mb-3 font-heading">{cert.issuer}</p>
                    <p className="text-text-muted text-sm leading-relaxed">
                        {cert.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const Certifications = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="certifications" className="py-24 md:py-32 relative overflow-hidden" ref={containerRef}>
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-3">Achievements</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                        <span className="text-primary">Certifications</span>
                    </h2>
                    <p className="text-text-muted text-lg">Validating my skills and knowledge.</p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line - visible on md+ */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                        <div className="w-full h-full bg-border/30" />
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-accent"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    {/* Cards */}
                    <div className="space-y-8 md:space-y-12">
                        {CERTIFICATIONS.map((cert, index) => (
                            <TimelineCard
                                key={cert.id}
                                cert={cert}
                                index={index}
                                isLeft={index % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
