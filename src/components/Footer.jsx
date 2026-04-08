import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="py-10 relative overflow-hidden border-t border-border/30">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-text-muted text-sm font-heading"
                >
                    © {new Date().getFullYear()} <span className="text-primary">Sai Janjirala</span>
                </motion.p>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-text-muted/60 text-xs font-heading"
                >
                    Built with <span className="text-primary/80">React</span> & crafted with <span className="text-red-400/70">♥</span>
                </motion.p>
            </div>
        </footer>
    );
};

export default Footer;
