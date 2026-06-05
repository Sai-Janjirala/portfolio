import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data';

const TechMarquee = () => {
    const marqueeSkills = [
        "REACT", "NODE.JS", "TYPESCRIPT", "NEXT.JS", "MONGODB", "TAILWIND CSS", "EXPRESS", "C++", "FIGMA"
    ];
    
    return (
        <div className="w-full overflow-hidden flex whitespace-nowrap py-10 relative select-none">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
            
            <motion.div 
                animate={{ x: [0, -1035] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 items-center"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex gap-8 items-center">
                        {marqueeSkills.map((skill, j) => (
                            <div key={`${i}-${j}`} className="flex items-center gap-8">
                                <span className="text-6xl md:text-8xl font-display font-bold text-transparent" style={{ WebkitTextStroke: '1px rgba(232, 168, 56, 0.15)' }}>
                                    {skill}
                                </span>
                                <span className="text-[#e8a838] opacity-30 text-2xl">✦</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const SkillRow = ({ skill, index }) => {
    const dots = skill.level === 'Advanced' ? [1, 1, 1] : skill.level === 'Intermediate' ? [1, 1, 0] : [1, 0, 0];

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.04 }}
            className="flex items-center group cursor-default py-3 px-2 relative"
        >
            <div className="absolute left-0 inset-y-0 w-0 bg-gradient-to-r from-[#e8a838]/10 to-transparent group-hover:w-full transition-all duration-500 ease-out z-0" />
            
            <span className="font-heading tracking-wide text-sm md:text-base text-text-main group-hover:text-[#e8a838] transition-colors duration-300 z-10 whitespace-nowrap">
                {skill.name}
            </span>
            
            <div className="flex-1 mx-4 border-b border-dashed border-[#e8a838]/20 group-hover:border-[#e8a838]/60 transition-colors duration-500 z-10 opacity-50" />
            
            <div className="flex gap-2 z-10 items-center">
                <span className="text-[10px] uppercase font-mono text-[#e8a838]/50 mr-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
                    {skill.level}
                </span>
                {dots.map((filled, i) => (
                    <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-sm rotate-45 transition-all duration-500 delay-${i * 100} ${
                            filled 
                                ? 'bg-[#e8a838] shadow-[0_0_8px_rgba(232,168,56,0.8)] group-hover:scale-125' 
                                : 'bg-surface border border-[#e8a838]/20'
                        }`} 
                    />
                ))}
            </div>
        </motion.div>
    );
};

const SkillCard = ({ category, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="relative group"
        >
            {/* Custom Modern Glassmorphism Container */}
            <div className="bg-surface/30 border border-border/50 rounded-xl overflow-hidden backdrop-blur-sm hover:border-[#e8a838]/30 transition-all duration-500 shadow-lg hover:shadow-[#e8a838]/5">
                {/* Custom Elegant Header */}
                <div className="bg-surface/50 border-b border-border/30 px-5 py-3.5 flex items-center justify-between backdrop-blur-sm">
                    <div className="flex items-center gap-2.5">
                        <span className="text-[10px] font-mono text-[#e8a838]/60 tracking-wider">✦ 0{index + 1} //</span>
                        <span className="font-display text-xs md:text-sm font-bold tracking-wider text-text-main uppercase">
                            {category.category}
                        </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded border border-[#e8a838]/20 bg-[#e8a838]/5 text-[#e8a838] tracking-widest uppercase">
                        ACTIVE
                    </span>
                </div>
                
                {/* Content / Grid */}
                <div className="p-5">
                    <div className="flex flex-col">
                        {category.skills.map((skill, skillIndex) => (
                            <SkillRow key={skill.name} skill={skill} index={skillIndex} />
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Subtle glow behind the card */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#e8a838]/0 to-[#e8a838]/0 group-hover:from-[#e8a838]/5 group-hover:to-[#e8a838]/0 rounded-xl transition-all duration-500 z-[-1] pointer-events-none" />
        </motion.div>
    );
};

const Skills = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="skills" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
            {/* Background Orbs */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
            />
            
            {/* Infinite Marquee Vibe */}
            <TechMarquee />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10 mt-12">
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
                            Command Center
                        </p>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-main max-w-2xl">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8a838] to-[#d4a056]">Arsenal</span>
                    </h2>
                </motion.div>

                {/* Dashboard Masonry Layout with Column Count */}
                <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-0 [column-fill:_balance]">
                    <div className="break-inside-avoid mb-6">
                        <SkillCard category={SKILL_CATEGORIES[0]} index={0} /> {/* Frontend */}
                    </div>
                    <div className="break-inside-avoid mb-6">
                        <SkillCard category={SKILL_CATEGORIES[1]} index={1} /> {/* Backend */}
                    </div>
                    <div className="break-inside-avoid mb-6">
                        <SkillCard category={SKILL_CATEGORIES[3]} index={3} /> {/* DevOps & Tools */}
                    </div>
                    <div className="break-inside-avoid mb-6">
                        <SkillCard category={SKILL_CATEGORIES[2]} index={2} /> {/* Database */}
                    </div>
                    <div className="break-inside-avoid mb-6">
                        <SkillCard category={SKILL_CATEGORIES[4]} index={4} /> {/* Design */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
