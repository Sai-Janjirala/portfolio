import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data';

const colorMap = {
    cyan: {
        badge: 'bg-[#e8a838]/10 text-[#e8a838] border-[#e8a838]/20',
        glow: 'rgba(232, 168, 56, 0.12)',
        border: 'rgba(232, 168, 56, 0.3)',
        dot: 'bg-[#e8a838]',
        levelBar: 'from-[#e8a838] to-[#d4a056]',
    },
    purple: {
        badge: 'bg-[#c48a2a]/10 text-[#c48a2a] border-[#c48a2a]/20',
        glow: 'rgba(196, 138, 42, 0.12)',
        border: 'rgba(196, 138, 42, 0.3)',
        dot: 'bg-[#c48a2a]',
        levelBar: 'from-[#c48a2a] to-[#a67520]',
    },
    emerald: {
        badge: 'bg-[#8b7355]/10 text-[#d4a056] border-[#8b7355]/20',
        glow: 'rgba(139, 115, 85, 0.12)',
        border: 'rgba(139, 115, 85, 0.3)',
        dot: 'bg-[#d4a056]',
        levelBar: 'from-[#d4a056] to-[#c48a2a]',
    },
    amber: {
        badge: 'bg-[#f5e6d3]/10 text-[#f5e6d3] border-[#f5e6d3]/20',
        glow: 'rgba(245, 230, 211, 0.08)',
        border: 'rgba(245, 230, 211, 0.2)',
        dot: 'bg-[#f5e6d3]',
        levelBar: 'from-[#f5e6d3] to-[#e8a838]',
    },
    pink: {
        badge: 'bg-[#e8a838]/10 text-[#e8a838] border-[#e8a838]/20',
        glow: 'rgba(232, 168, 56, 0.12)',
        border: 'rgba(232, 168, 56, 0.3)',
        dot: 'bg-[#e8a838]',
        levelBar: 'from-[#e8a838] to-[#d4a056]',
    },
};

const levelWidths = {
    'Beginner': '33%',
    'Intermediate': '66%',
    'Advanced': '100%',
};

const SkillCard = ({ skill, index, color }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const colors = colorMap[color] || colorMap.cyan;

    const handleMouseMove = (e) => {
        const { left, top } = ref.current.getBoundingClientRect();
        x.set(e.clientX - left);
        y.set(e.clientY - top);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-surface/60 border border-border/50 px-4 py-3 rounded-xl overflow-hidden hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 cursor-default"
        >
            {/* Spotlight */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          300px circle at ${mouseX}px ${mouseY}px,
                          ${colors.glow},
                          transparent 80%
                        )
                      `,
                }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                    {skill.name}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-14 h-1.5 bg-border/50 rounded-full overflow-hidden hidden sm:block">
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${colors.levelBar}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: levelWidths[skill.level] }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.04 + 0.3, ease: "easeOut" }}
                        />
                    </div>
                    <span className="text-[10px] font-medium text-text-muted uppercase tracking-wider hidden md:inline">
                        {skill.level}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const CategorySection = ({ category, index }) => {
    const colors = colorMap[category.color] || colorMap.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <h3 className="text-lg font-heading font-bold text-text-main">{category.category}</h3>
                <div className="h-px flex-1 bg-border/50" />
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors.badge}`}>
                    {category.skills.length} skills
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                        key={skill.name}
                        skill={skill}
                        index={skillIndex}
                        color={category.color}
                    />
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    const totalSkills = SKILL_CATEGORIES.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-3">What I Know</p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4">
                        Skill <span className="text-primary">Sets</span>
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg mb-6">
                        The tools and technologies I use to build seamless digital products.
                    </p>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border/50 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse-slow" />
                        <span className="text-sm text-text-muted font-heading">
                            <span className="font-bold text-text-main">{totalSkills}</span> technologies across{' '}
                            <span className="font-bold text-text-main">{SKILL_CATEGORIES.length}</span> categories
                        </span>
                    </div>
                </motion.div>

                <div className="space-y-10">
                    {SKILL_CATEGORIES.map((category, index) => (
                        <CategorySection key={category.category} category={category} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
