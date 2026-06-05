import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ExternalLink, Trophy, Flame, Terminal, Zap, Target, TrendingUp } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';

// ─── Animated Counter ───────────────────────────────────────────────
const AnimatedNumber = ({ value, duration = 2, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = parseInt(value);
        const startTime = Date.now() + delay * 1000;
        const endTime = startTime + duration * 1000;

        const timer = setInterval(() => {
            const now = Date.now();
            if (now < startTime) return;
            const progress = Math.min((now - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * end));
            if (progress >= 1) clearInterval(timer);
        }, 16);

        return () => clearInterval(timer);
    }, [isInView, value, duration, delay]);

    return <span ref={ref}>{display}</span>;
};

// ─── SVG Circular Progress Ring ────────────────────────────────────
const ProgressRing = ({ solved, total, color, gradientId, label, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const percentage = total > 0 ? (solved / total) * 100 : 0;

    const colorMap = {
        easy: { start: '#00b8a3', end: '#00d4aa', bg: 'rgba(0,184,163,0.08)', text: '#00b8a3', shadow: '0 0 20px rgba(0,184,163,0.15)' },
        medium: { start: '#ffc01e', end: '#ffab00', bg: 'rgba(255,192,30,0.08)', text: '#ffc01e', shadow: '0 0 20px rgba(255,192,30,0.15)' },
        hard: { start: '#ff375f', end: '#ef233c', bg: 'rgba(255,55,95,0.08)', text: '#ff375f', shadow: '0 0 20px rgba(255,55,95,0.15)' },
    };

    const c = colorMap[color] || colorMap.easy;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group flex flex-col items-center"
        >
            <div
                className="relative w-28 h-28 md:w-32 md:h-32 rounded-full transition-shadow duration-500"
                style={{ boxShadow: 'none' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = c.shadow}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
            >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={c.start} />
                            <stop offset="100%" stopColor={c.end} />
                        </linearGradient>
                    </defs>
                    {/* Background track */}
                    <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.06)" strokeWidth="6" fill="none" />
                    {/* Progress */}
                    <motion.circle
                        cx="50" cy="50" r={radius}
                        stroke={`url(#${gradientId})`}
                        strokeWidth="6"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={isInView ? { strokeDashoffset: circumference - (circumference * percentage) / 100 } : {}}
                        transition={{ delay: delay + 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    />
                </svg>
                {/* Center count */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-display font-bold" style={{ color: c.text }}>
                        <AnimatedNumber value={solved} delay={delay + 0.15} duration={0.8} />
                    </span>
                    <span className="text-[10px] text-text-muted font-heading">/{total}</span>
                </div>
            </div>
            <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3, duration: 0.2 }}
                className="mt-3 text-xs font-heading font-semibold uppercase tracking-widest"
                style={{ color: c.text }}
            >
                {label}
            </motion.span>
        </motion.div>
    );
};

// ─── Terminal Animation ────────────────────────────────────────────
const TerminalBlock = ({ stats }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [visibleCount, setVisibleCount] = useState(0);
    const hasStarted = useRef(false);

    const allLines = [
        { text: '$ leetcode stats --user sai_janjirala', type: 'command' },
        { text: ' ', type: 'blank' },
        { text: `  ✓ Total Solved:    ${stats.totalSolved} / ${stats.totalQuestions}`, type: 'success' },
        { text: `  ◉ Easy:            ${stats.easySolved} / ${stats.totalEasy}`, type: 'easy' },
        { text: `  ◉ Medium:          ${stats.mediumSolved} / ${stats.totalMedium}`, type: 'medium' },
        { text: `  ◉ Hard:            ${stats.hardSolved} / ${stats.totalHard}`, type: 'hard' },
        { text: ' ', type: 'blank' },
        { text: `  🏆 Ranking:        #${stats.ranking?.toLocaleString()}`, type: 'info' },
        { text: `  🔗 Profile:        leetcode.com/u/sai_janjirala`, type: 'info' },
        { text: ' ', type: 'blank' },
        { text: '  Status: Actively climbing — keep grinding! 💪', type: 'success' },
    ];

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;
        let count = 0;
        const interval = setInterval(() => {
            count++;
            if (count <= allLines.length) {
                setVisibleCount(count);
            } else {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval);
    }, [isInView]);

    const typeColors = {
        command: 'text-primary',
        success: 'text-[#00b8a3]',
        easy: 'text-[#00b8a3]',
        medium: 'text-[#ffc01e]',
        hard: 'text-[#ff375f]',
        info: 'text-text-muted',
        blank: '',
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative bg-surface/20 border border-border/40 rounded-2xl overflow-hidden backdrop-blur-md hover:border-primary/20 transition-all duration-500 shadow-xl"
        >
            {/* Custom geometric shell header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-surface/40 border-b border-border/30 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-primary" />
                    <span className="text-[10px] font-mono font-medium tracking-wider text-text-muted uppercase">SYSTEM_SHELL // LEETCODE_STATS</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/80 shadow-[0_0_8px_#e8a838] animate-pulse" />
            </div>

            {/* Terminal body */}
            <div className="p-5 font-mono text-sm leading-relaxed min-h-[220px]">
                {allLines.slice(0, visibleCount).map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`${typeColors[line.type]} whitespace-pre`}
                    >
                        {line.text}
                    </motion.div>
                ))}
                {/* Blinking cursor */}
                {visibleCount >= allLines.length && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                        className="text-primary"
                    >
                        █
                    </motion.span>
                )}
            </div>
        </motion.div>
    );
};

// ─── Stat Badge ────────────────────────────────────────────────────
const StatBadge = ({ icon: Icon, label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.06, y: -3 }}
        className="group relative bg-surface/60 backdrop-blur-sm border border-border/50 rounded-2xl p-5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
    >
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.03] transition-colors duration-500 rounded-2xl" />
        <div className="relative z-10 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                <Icon size={20} className="text-primary" />
            </div>
            <div>
                <p className="text-xl font-display font-bold text-text-main">
                    {typeof value === 'number' ? <AnimatedNumber value={value} delay={delay} /> : value}
                </p>
                <p className="text-xs text-text-muted font-heading">{label}</p>
            </div>
        </div>
        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 group-hover:via-primary/40 to-transparent transition-all duration-500" />
    </motion.div>
);

// ─── Contribution Heatmap ──────────────────────────────────────────
// ─── Contribution Heatmap ──────────────────────────────────────────
const ContributionHeatmap = ({ submissionCalendar }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Generate heatmap data (40 weeks × 7 days) from dynamic calendar or fallback to mock
    const heatmapData = useMemo(() => {
        if (!submissionCalendar || Object.keys(submissionCalendar).length === 0) {
            // Generate mock heatmap data (40 weeks × 7 days) as fallback
            const data = [];
            for (let week = 0; week < 40; week++) {
                const weekData = [];
                for (let day = 0; day < 7; day++) {
                    const rand = Math.random();
                    let level = 0;
                    if (rand > 0.6) level = 1;
                    if (rand > 0.75) level = 2;
                    if (rand > 0.88) level = 3;
                    if (rand > 0.95) level = 4;
                    weekData.push(level);
                }
                data.push(weekData);
            }
            return data;
        }

        const data = [];
        const today = new Date();
        const startDay = new Date(today);
        // Align starting day to Sunday, 40 weeks ago
        startDay.setDate(today.getDate() - 40 * 7 - today.getDay());
        startDay.setHours(0, 0, 0, 0);

        for (let week = 0; week < 40; week++) {
            const weekData = [];
            for (let day = 0; day < 7; day++) {
                const currentDay = new Date(startDay);
                currentDay.setDate(startDay.getDate() + (week * 7 + day));
                
                // LeetCode's submissionCalendar keys represent midnight UTC in seconds.
                const utcMidnight = Date.UTC(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate()) / 1000;
                const count = submissionCalendar[String(utcMidnight)] || 0;

                let level = 0;
                if (count > 0 && count <= 2) level = 1;
                else if (count > 2 && count <= 5) level = 2;
                else if (count > 5 && count <= 10) level = 3;
                else if (count > 10) level = 4;

                weekData.push(level);
            }
            data.push(weekData);
        }
        return data;
    }, [submissionCalendar]);

    const levelColorsLC = [
        'bg-white/[0.04]',
        'bg-primary/20',
        'bg-primary/40',
        'bg-primary/60',
        'bg-primary/90',
    ];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-surface/40 border border-border/30 rounded-2xl p-5 md:p-6 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-heading font-semibold text-text-main flex items-center gap-2">
                    <Flame size={14} className="text-primary" />
                    Contribution Activity
                </h4>
                <span className="text-[10px] text-text-muted font-heading">Past 40 weeks</span>
            </div>

            {/* Heatmap grid */}
            <div className="flex gap-[3px] overflow-x-auto no-scrollbar pb-1">
                {heatmapData.map((week, weekIdx) => (
                    <motion.div
                        key={weekIdx}
                        className="flex flex-col gap-[3px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.1 + weekIdx * 0.005, duration: 0.2 }}
                    >
                        {week.map((level, dayIdx) => (
                            <div
                                key={`${weekIdx}-${dayIdx}`}
                                className={`w-[10px] h-[10px] md:w-[11px] md:h-[11px] rounded-sm ${levelColorsLC[level]} transition-colors duration-200 hover:ring-1 hover:ring-primary/50`}
                            />
                        ))}
                    </motion.div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 mt-3">
                <span className="text-[10px] text-text-muted mr-1">Less</span>
                {levelColorsLC.map((color, i) => (
                    <div key={i} className={`w-[10px] h-[10px] rounded-sm ${color}`} />
                ))}
                <span className="text-[10px] text-text-muted ml-1">More</span>
            </div>
        </motion.div>
    );
};

// ─── Main LeetCode Section ─────────────────────────────────────────
const LeetCode = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

    // Dynamic stats state initialized with current cached fallback stats
    const [stats, setStats] = useState({
        totalSolved: 19,
        totalQuestions: 3902,
        easySolved: 13,
        totalEasy: 937,
        mediumSolved: 6,
        totalMedium: 2042,
        hardSolved: 0,
        totalHard: 923,
        acceptanceRate: null,
        ranking: 4183649,
        streak: null,
        contestRating: null,
        submissionCalendar: {},
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchStats = async () => {
            try {
                const res = await fetch('https://alfa-leetcode-api.onrender.com/sai_janjirala/profile');
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                
                if (isMounted && data && data.totalSolved !== undefined) {
                    setStats({
                        totalSolved: data.totalSolved || 0,
                        totalQuestions: data.totalQuestions || 3949,
                        easySolved: data.easySolved || 0,
                        totalEasy: data.totalEasy || 947,
                        mediumSolved: data.mediumSolved || 0,
                        totalMedium: data.totalMedium || 2063,
                        hardSolved: data.hardSolved || 0,
                        totalHard: data.totalHard || 939,
                        acceptanceRate: data.acceptanceRate || null,
                        ranking: data.ranking || null,
                        streak: data.streak || null,
                        contestRating: data.contestRating || null,
                        submissionCalendar: data.submissionCalendar || {},
                    });
                    setIsLive(true);
                }
            } catch (err) {
                console.error('Failed to fetch dynamic LeetCode statistics:', err);
                if (isMounted) {
                    setIsError(true);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchStats();
        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <section id="leetcode" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
            {/* Background ambient glows */}
            <motion.div
                style={{ y: bgY }}
                className="absolute top-1/4 right-[-10%] w-[400px] h-[400px] bg-[#ffa116]/5 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
                style={{ y: bgY }}
                className="absolute bottom-1/4 left-[-10%] w-[350px] h-[350px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"
            />

            {/* Floating LC icons */}
            <motion.div
                animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/3 left-[5%] text-[#ffa116]/[0.06] pointer-events-none hidden lg:block"
            >
                <SiLeetcode size={120} />
            </motion.div>
            <motion.div
                animate={{ y: [10, -10, 10], rotate: [0, -8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-1/3 right-[5%] text-primary/[0.05] pointer-events-none hidden lg:block"
            >
                <Terminal size={100} />
            </motion.div>

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                {/* Section header */}
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
                        Problem Solving
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4">
                        Leet<span className="text-[#ffa116]">Code</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="w-16 h-px bg-gradient-to-r from-transparent via-[#ffa116] to-transparent mx-auto mb-4"
                    />
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-text-muted text-lg max-w-lg mx-auto"
                    >
                        Sharpening problem-solving skills, one algorithm at a time.
                    </motion.p>

                    {/* Premium status indicator */}
                    <div className="flex justify-center mt-6">
                        {isLive ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] md:text-xs font-mono text-emerald-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Live Stats Connected
                            </div>
                        ) : isError ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] md:text-xs font-mono text-amber-400 animate-bounce">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                Offline Mode (Cached Stats)
                            </div>
                        ) : isLoading ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-mono text-primary">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                                Syncing Live stats...
                            </div>
                        ) : null}
                    </div>
                </motion.div>

                {/* Progress Rings */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap justify-center gap-10 md:gap-16 mb-14"
                >
                    <ProgressRing solved={stats.easySolved} total={stats.totalEasy} color="easy" gradientId="g-easy" label="Easy" delay={0} />
                    <ProgressRing solved={stats.mediumSolved} total={stats.totalMedium} color="medium" gradientId="g-medium" label="Medium" delay={0.15} />
                    <ProgressRing solved={stats.hardSolved} total={stats.totalHard} color="hard" gradientId="g-hard" label="Hard" delay={0.3} />
                </motion.div>

                {/* Total solved bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="max-w-2xl mx-auto mb-14"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-heading text-text-main font-semibold flex items-center gap-2">
                            <Target size={14} className="text-primary" />
                            Total Progress
                        </span>
                        <span className="text-sm font-heading text-primary font-bold">
                            <AnimatedNumber value={stats.totalSolved} delay={0.5} /> / {stats.totalQuestions}
                        </span>
                    </div>
                    <div className="h-3 bg-surface-light rounded-full overflow-hidden border border-border/30">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(stats.totalSolved / stats.totalQuestions) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                                background: 'linear-gradient(90deg, #00b8a3, #ffc01e, #ff375f)',
                            }}
                        >
                            {/* Shimmer effect */}
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Stats + Terminal grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-14">
                    {/* Left: Quick stat badges */}
                    <div className="grid grid-cols-2 gap-4">
                        <StatBadge icon={Trophy} label="Global Ranking" value={stats.ranking ? `#${stats.ranking.toLocaleString()}` : 'N/A'} delay={0.1} />
                        <StatBadge icon={Target} label="Total Solved" value={stats.totalSolved} delay={0.2} />
                        <StatBadge icon={Zap} label="Easy Solved" value={stats.easySolved} delay={0.3} />
                        <StatBadge icon={TrendingUp} label="Medium Solved" value={stats.mediumSolved} delay={0.4} />
                    </div>

                    {/* Right: Terminal */}
                    <TerminalBlock stats={stats} />
                </div>

                {/* Contribution Heatmap */}
                <ContributionHeatmap submissionCalendar={stats.submissionCalendar} />

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-12 flex justify-center"
                >
                    <motion.a
                        href="https://leetcode.com/u/sai_janjirala/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,161,22,0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#ffa116]/10 border border-[#ffa116]/30 hover:border-[#ffa116]/60 rounded-full transition-all duration-300"
                    >
                        <SiLeetcode size={18} className="text-[#ffa116]" />
                        <span className="text-text-main font-heading text-sm tracking-wide font-medium">View Full Profile</span>
                        <ExternalLink size={14} className="text-[#ffa116] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCode;
