import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Calendar, MapPin, Award, Users, Terminal, ExternalLink } from 'lucide-react';

const HackathonCard = ({ hack, index }) => {
    const [viewCertificate, setViewCertificate] = useState(false);

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
                {hack.winner ? (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-bold tracking-widest uppercase">
                        WINNER
                    </span>
                ) : (
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-primary/20 bg-primary/5 text-primary tracking-widest uppercase">
                        PARTICIPANT
                    </span>
                )}
            </div>

            {/* Interactive Image Frame */}
            <div className="relative h-56 md:h-64 overflow-hidden bg-black/40">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={viewCertificate ? 'cert' : 'team'}
                        src={viewCertificate ? hack.certificateImage : hack.teamImage}
                        alt={viewCertificate ? `${hack.title} Certificate` : `${hack.title} Team`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        loading="lazy"
                    />
                </AnimatePresence>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Date & Location overlays */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs font-heading font-semibold text-text-main flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/30 w-fit">
                            <MapPin size={12} className="text-primary" />
                            {hack.location}
                        </span>
                    </div>
                </div>

                {/* Image Toggle Buttons */}
                {hack.teamImage && (
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        <button
                            onClick={() => setViewCertificate(false)}
                            className={`p-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md ${
                                !viewCertificate
                                    ? 'bg-primary text-background border-primary shadow-primary/20'
                                    : 'bg-background/70 text-text-muted border-border/30 hover:text-text-main'
                            }`}
                            title="Show Team"
                        >
                            <Users size={14} />
                        </button>
                        <button
                            onClick={() => setViewCertificate(true)}
                            className={`p-2 rounded-full border transition-all duration-300 backdrop-blur-md shadow-md ${
                                viewCertificate
                                    ? 'bg-primary text-background border-primary shadow-primary/20'
                                    : 'bg-background/70 text-text-muted border-border/30 hover:text-text-main'
                            }`}
                            title="Show Certificate"
                        >
                            <Award size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-primary/80">
                    <Calendar size={12} />
                    <span>{hack.date}</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-text-main mb-2 group-hover:text-primary transition-colors duration-300">
                    {hack.title}
                </h3>
                <p className="text-xs text-[#d4a056] font-mono tracking-wider uppercase mb-4">{hack.organizer}</p>

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
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-border/50 text-text-muted group-hover:border-primary/20 transition-all duration-500"
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
            description: "An intensive 36-hour state-level hackathon. Collaborated with a full-stack engineering team to build a responsive platform targeting automated academic summaries. Structured frontend performance loops and managed dynamic API integrations.",
            teamImage: "/certificates/hack_the_spring_team.jpg",
            certificateImage: "/certificates/hack_the_spring.jpg",
            highlights: [
                "36-Hour Continuous Sprint Cycle",
                "Full-stack architecture development",
                "Successfully demoed project to panel judges"
            ],
            tech: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
            winner: false
        },
        {
            title: "Odoo x Adani Hackathon '26",
            organizer: "Adani University & Unstop",
            date: "2026",
            location: "Adani University, Ahmedabad",
            description: "Pitched real-world software prototype solutions using automated Odoo models. Addressed logic execution flows, completed tasks in collaborative team setups, and successfully showcased product capabilities to corporate panel leaders.",
            teamImage: "/certificates/adani_hackathon.png", // fallback certificate if no team photo
            certificateImage: "/certificates/adani_hackathon.png",
            highlights: [
                "Odoo workflow design and logic setup",
                "Coordinated with system engineers",
                "Earned special participation evaluation"
            ],
            tech: ["Python", "Odoo ERP Framework", "REST APIs", "Workflow Automation"],
            winner: false
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
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
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
