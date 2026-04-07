import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data';

const colorMap = {
    cyan: {
        badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
        glow: 'rgba(6, 182, 212, 0.15)',
        border: 'rgba(6, 182, 212, 0.4)',
        dot: 'bg-cyan-400',
        levelBar: 'from-cyan-500 to-cyan-400',
    },
    purple: {
        badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        glow: 'rgba(139, 92, 246, 0.15)',
        border: 'rgba(139, 92, 246, 0.4)',
        dot: 'bg-purple-400',
        levelBar: 'from-purple-500 to-purple-400',
    },
    emerald: {
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        glow: 'rgba(16, 185, 129, 0.15)',
        border: 'rgba(16, 185, 129, 0.4)',
        dot: 'bg-emerald-400',
        levelBar: 'from-emerald-500 to-emerald-400',
    },
    amber: {
        badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        glow: 'rgba(245, 158, 11, 0.15)',
        border: 'rgba(245, 158, 11, 0.4)',
        dot: 'bg-amber-400',
        levelBar: 'from-amber-500 to-amber-400',
    },
    pink: {
        badge: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
        glow: 'rgba(236, 72, 153, 0.15)',
        border: 'rgba(236, 72, 153, 0.4)',
        dot: 'bg-pink-400',
        levelBar: 'from-pink-500 to-pink-400',
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
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onMouseMove={handleMouseMove}
            className="group relative bg-surface/50 border border-text-main/10 px-4 py-3 rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 cursor-default"
        >
            {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                          350px circle at ${mouseX}px ${mouseY}px,
                          ${colors.glow},
                          transparent 80%
                        )
                      `,
                }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-text-main group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300 whitespace-nowrap">
                    {skill.name}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                    <div className="w-14 h-1.5 bg-text-main/10 rounded-full overflow-hidden hidden sm:block">
                        <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${colors.levelBar}`}
                            initial={{ width: 0 }}
                            whileInView={{ width: levelWidths[skill.level] }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.05 + 0.3, ease: "easeOut" }}
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
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-2 h-2 rounded-full ${colors.dot} shadow-lg`} />
                <h3 className="text-lg font-bold text-text-main">{category.category}</h3>
                <div className="h-px flex-1 bg-text-main/10" />
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colors.badge}`}>
                    {category.skills.length} skills
                </span>
            </div>

            {/* Skills Grid */}
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
        <section id="skills" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-8 md:px-16 lg:px-28 xl:px-36 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Skill Sets</span>
                    </h2>
                    <p className="text-text-muted max-w-2xl mx-auto text-lg mb-6">
                        The tools and technologies I use to build seamless digital products.
                    </p>

                    {/* Total Skills Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface/50 border border-text-main/10 rounded-full">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 animate-pulse" />
                        <span className="text-sm text-text-muted">
                            <span className="font-bold text-text-main">{totalSkills}</span> technologies across{' '}
                            <span className="font-bold text-text-main">{SKILL_CATEGORIES.length}</span> categories
                        </span>
                    </div>
                </motion.div>

                {/* Categories */}
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
