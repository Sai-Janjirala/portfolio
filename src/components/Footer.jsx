import { motion } from 'framer-motion';

const Footer = () => {
    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="py-10 relative overflow-hidden border-t border-border/30">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-text-muted text-sm font-heading"
                >
                    © {new Date().getFullYear()} <span className="text-primary">Sai Janjirala</span>
                </motion.p>

                {/* Back to top */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    whileHover={{ y: -3, color: "#e8a838" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToTop}
                    className="text-text-muted/60 text-xs font-heading tracking-widest uppercase transition-colors outline-none"
                >
                    Back to top ↑
                </motion.button>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-text-muted/60 text-xs font-heading"
                >
                    Built with <span className="text-primary/80">React</span> & crafted with <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="inline-block text-red-400/70"
                    >♥</motion.span>
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
