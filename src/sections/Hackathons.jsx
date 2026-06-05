import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-full min-h-[320px] overflow-hidden group/carousel bg-black/30">
            {/* Image Slider */}
            <AnimatePresence initial={false} mode="wait">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    alt={`Hackathon Photo ${currentIndex + 1}`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </AnimatePresence>

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Carousel Navigation Chevrons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 text-text-muted hover:text-text-main hover:bg-background border border-border/30 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20 shadow-md"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-background/80 text-text-muted hover:text-text-main hover:bg-background border border-border/30 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 z-20 shadow-md"
                        aria-label="Next image"
                    >
                        <ChevronRight size={16} />
                    </button>
                </>
            )}

            {/* Carousel Page Counter */}
            <div className="absolute top-4 left-4 z-20 bg-background/80 backdrop-blur-md border border-border/30 px-3 py-1 rounded-full text-[10px] font-mono font-medium text-text-muted tracking-wider">
                GALLERY // 0{currentIndex + 1} OF 0{images.length}
            </div>

            {/* Slide Navigation Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                idx === currentIndex ? 'bg-primary scale-125' : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Hackathons = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const hackathonData = {
        title: "Hack.X at HackTheSpring '26",
        organizer: "Government Engineering College, Sector 28, Gandhinagar",
        date: "February 20-21, 2026",
        location: "GEC Gandhinagar",
        description: "An intensive 36-hour state-level hackathon. Collaborated with a team of developers to conceptualize and construct a full-stack academic assistance module. Handled data layer mapping, responsive container loops, and dynamic client-server integration under aggressive timeline constraints.",
        highlights: [
            "36-Hour Continuous Dev Cycle",
            "Responsive full-stack dashboard implementation",
            "Pitched functional prototype to industry judges"
        ],
        tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
        images: [
            "/certificates/hack_the_spring_team.jpg",
            "/certificates/hack_the_spring.jpg"
        ]
    };

    return (
        <section id="hackathons" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
            {/* Background ambient glows */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-1/4 left-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                style={{ y: bgY }}
                className="absolute bottom-1/4 right-[-10%] w-[350px] h-[350px] bg-accent/5 rounded-full blur-[100px] pointer-events-none"
            />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16 text-center md:text-left"
                >
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="h-px bg-[#e8a838] w-12" />
                        <p className="text-[#e8a838] text-sm uppercase font-heading tracking-[0.3em]">
                            Competitions
                        </p>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-main">
                        Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8a838] to-[#d4a056]">Chronicles</span>
                    </h2>
                </motion.div>

                {/* Split Featured Layout */}
                <motion.div
                    initial={{ opacity: 0, y: 45 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto bg-surface/30 border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-[#e8a838]/30 transition-all duration-500 shadow-2xl flex flex-col md:grid md:grid-cols-2 min-h-[420px]"
                >
                    {/* Left Column: Image Carousel */}
                    <div className="w-full h-full min-h-[320px] md:min-h-[450px]">
                        <ImageCarousel images={hackathonData.images} />
                    </div>

                    {/* Right Column: Information & Details */}
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border/30">
                        {/* Upper meta */}
                        <div>
                            {/* Tags */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-primary/80">
                                    <Calendar size={12} />
                                    <span>{hackathonData.date}</span>
                                </div>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary tracking-widest uppercase">
                                    Featured Spotlight
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-display font-bold text-text-main mb-2">
                                {hackathonData.title}
                            </h3>
                            <p className="text-xs text-[#d4a056] font-mono tracking-wider uppercase mb-5 flex items-center gap-1.5">
                                <MapPin size={12} className="text-primary" />
                                {hackathonData.location} // {hackathonData.organizer}
                            </p>

                            <p className="text-text-muted text-sm leading-relaxed mb-6">
                                {hackathonData.description}
                            </p>

                            {/* Highlights */}
                            <div className="mb-6 space-y-2.5">
                                <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Highlights //</h4>
                                <ul className="text-xs text-text-main/90 space-y-2 font-heading">
                                    {hackathonData.highlights.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2">
                                            <span className="text-primary text-[10px]">✦</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Lower Tech Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-5 border-t border-border/30">
                            {hackathonData.tech.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-border/50 text-text-muted hover:border-primary/20 hover:text-text-main transition-all duration-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hackathons;
