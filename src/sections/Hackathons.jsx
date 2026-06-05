import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, ChevronLeft, ChevronRight, Terminal, ZoomIn, Eye } from 'lucide-react';

const Lightbox = ({ images, index, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(index);

    const next = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prev = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md cursor-default"
            onClick={onClose}
        >
            {/* Top header navigation info */}
            <div className="absolute top-4 right-4 flex gap-4 items-center z-50">
                <span className="text-xs font-mono text-text-muted">
                    PHOTO {currentIndex + 1} / {images.length}
                </span>
                <button 
                    onClick={onClose} 
                    className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-text-main hover:text-primary transition-all duration-300 text-xs font-mono border border-white/10"
                >
                    CLOSE
                </button>
            </div>

            {/* Main Image Viewport */}
            <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
                <motion.img
                    key={currentIndex}
                    src={images[currentIndex]}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-full max-h-full object-contain rounded border border-border/40 shadow-2xl shadow-black/80"
                    onClick={(e) => e.stopPropagation()}
                />

                {/* Lightbox arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-2 md:-left-12 p-3 rounded-full bg-background/80 hover:bg-background text-text-main border border-border/30 hover:border-primary/50 transition-all duration-300 z-50 shadow-lg"
                            aria-label="Previous photo"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-2 md:right-12 p-3 rounded-full bg-background/80 hover:bg-background text-text-main border border-border/30 hover:border-primary/50 transition-all duration-300 z-50 shadow-lg"
                            aria-label="Next photo"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

const HoverGallery = ({ images, title, coverPosition }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const handlePhotoClick = (e, index) => {
        e.stopPropagation();
        setLightboxIndex(index);
    };

    return (
        <div 
            className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] overflow-hidden bg-black/40 rounded-t-2xl cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                if (!isHovered) {
                    setLightboxIndex(0);
                }
            }}
        >
            {/* Default Cover Photo */}
            <img 
                src={images[0]} 
                alt={`${title} Cover`}
                style={{ objectPosition: coverPosition || 'center' }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Tap indicator for mobile touch devices */}
            <div className="absolute bottom-4 right-4 z-10 bg-background/90 backdrop-blur-md border border-border/30 px-3 py-1 rounded-full text-[9px] font-mono text-primary animate-pulse lg:hidden">
                Tap to View Gallery
            </div>

            {/* Hover Gallery Grid Overlay */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 bg-black/90 p-3.5 flex flex-col justify-between z-20 backdrop-blur-sm"
                    >
                        <div className="text-[9px] font-mono text-primary/80 mb-2 uppercase tracking-widest border-b border-border/35 pb-1 flex justify-between items-center">
                            <span className="flex items-center gap-1"><Eye size={10} /> Hover Grid Gallery</span>
                            <span className="flex items-center gap-1 text-[8px] opacity-80"><ZoomIn size={9} /> Click to expand</span>
                        </div>
                        
                        {/* Dynamic Grid Layout */}
                        <div className="grid grid-cols-12 gap-1.5 flex-1 overflow-hidden">
                            {images.length === 2 ? (
                                // 2 images: split half
                                images.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.04 }}
                                        className="col-span-6 h-full overflow-hidden rounded border border-border/30 hover:border-primary/50 transition-colors"
                                        onClick={(e) => handlePhotoClick(e, idx)}
                                    >
                                        <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="" />
                                    </motion.div>
                                ))
                            ) : images.length > 2 ? (
                                // 3+ images: 1 large left, up to 4 smaller in 2x2 grid on right
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.92 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-7 h-full overflow-hidden rounded border border-border/30 hover:border-primary/50 transition-colors"
                                        onClick={(e) => handlePhotoClick(e, 0)}
                                    >
                                        <img src={images[0]} style={{ objectPosition: coverPosition || 'center' }} className="w-full h-full object-cover hover:scale-103 transition-transform duration-500" alt="" />
                                    </motion.div>
                                    <div className="col-span-5 grid grid-cols-2 gap-1.5 h-full overflow-hidden">
                                        {images.slice(1, 5).map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.92 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.03 }}
                                                className="h-full overflow-hidden rounded border border-border/30 hover:border-primary/50 transition-colors"
                                                onClick={(e) => handlePhotoClick(e, idx + 1)}
                                            >
                                                <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                // 1 image
                                <div 
                                    className="col-span-12 h-full overflow-hidden rounded border border-border/30"
                                    onClick={(e) => handlePhotoClick(e, 0)}
                                >
                                    <img src={images[0]} className="w-full h-full object-cover" alt="" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Badge Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-md border border-border/30 px-3 py-1 rounded-full text-[10px] font-mono font-medium text-text-muted tracking-wider uppercase">
                {images.length} Photos Included
            </div>

            {/* Lightbox / Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox 
                        images={images} 
                        index={lightboxIndex} 
                        onClose={() => setLightboxIndex(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

const HackathonCard = ({ hack, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-surface/30 border border-border/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-[#e8a838]/30 transition-all duration-500 shadow-xl flex flex-col h-full"
        >
            {/* Header / Meta Bar */}
            <div className="bg-surface/50 border-b border-border/30 px-5 py-3.5 flex items-center justify-between backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-primary animate-pulse" />
                    <span className="text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase">
                        COMPETITION // 0{index + 1}
                    </span>
                </div>
                {hack.role === "Team Leader" ? (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary tracking-widest uppercase font-bold shadow-[0_0_6px_rgba(232,168,56,0.2)]">
                        Team Leader
                    </span>
                ) : (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-border/50 bg-surface/10 text-text-muted tracking-widest uppercase">
                        Developer
                    </span>
                )}
            </div>

            {/* Photo Hover Gallery Header */}
            <HoverGallery images={hack.images} title={hack.title} coverPosition={hack.coverPosition} />

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-primary/80">
                    <Calendar size={12} />
                    <span>{hack.date}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-text-main mb-2 group-hover:text-primary transition-colors duration-300">
                    {hack.title}
                </h3>
                <p className="text-xs text-[#d4a056] font-mono tracking-wider uppercase mb-4 flex items-center gap-1.5">
                    <MapPin size={12} className="text-primary" />
                    {hack.location} // {hack.organizer}
                </p>

                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                    {hack.description}
                </p>

                {/* Highlights List */}
                <div className="mb-6 space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Highlights //</h4>
                    <ul className="text-xs text-text-main/90 space-y-1.5 font-heading">
                        {hack.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                                <span className="text-primary text-[10px]">✦</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Stack Footer Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
                    {hack.tech.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.03] border border-border/50 text-text-muted hover:border-primary/20 hover:text-text-main transition-all duration-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bottom Glow Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
        </motion.div>
    );
};

const Hackathons = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    const hackathonsList = [
        {
            title: "Hack.X at HackTheSpring '26",
            organizer: "Government Engineering College, Sector 28, Gandhinagar",
            date: "February 20-21, 2026",
            location: "GEC Gandhinagar",
            description: "An intensive 36-hour state-level hackathon. Collaborated with a developer team to design and assemble a full-stack academic assistant. Managed layout renders, responsive container elements, and database synchronization logic under tight deadlines.",
            highlights: [
                "36-Hour Continuous Dev Cycle",
                "Built full-stack data loop models",
                "Pitched functional prototype to evaluation leads"
            ],
            tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
            role: "Developer",
            images: [
                "/certificates/hack_the_spring_team.jpg",
                "/certificates/hack_the_spring.jpg"
            ]
        },
        {
            title: "CRAFTATHON '26",
            organizer: "Gandhinagar University & IEEE Computer Society",
            date: "April 3, 2026",
            coverPosition: "center 5%",
            location: "Gandhinagar University",
            description: "Led a development team ('LKcoders') in a high-speed logic sprint, constructing a responsive web platform from scratch. Coordinated timeline sprints, resolved system merge requests, and successfully demoed the product pitch to corporate panels.",
            highlights: [
                "Served as Team Leader of 'LKcoders'",
                "Full-stack MERN dashboard implementation",
                "Presented software demos to judge panel leaders"
            ],
            tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS"],
            role: "Team Leader",
            images: [
                "/certificates/craftathon_2.jpg",
                "/certificates/craftathon_laptop.png",
                "/certificates/craftathon_1.jpg",
                "/certificates/craftathon_3.jpg",
                "/certificates/craftathon_4.jpg",
                "/certificates/craftathon_badge.jpg"
            ]
        }
    ];

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

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {hackathonsList.map((hack, idx) => (
                        <HackathonCard key={idx} hack={hack} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hackathons;
