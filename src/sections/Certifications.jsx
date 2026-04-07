import { motion } from 'framer-motion';
import { CERTIFICATIONS } from '../data';
import { Award, Calendar } from 'lucide-react';

const Certifications = () => {
    return (
        <section id="certifications" className="py-24 relative">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Certifications</span>
                    </h2>
                    <p className="text-text-muted">Validating my skills and knowledge.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {CERTIFICATIONS.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 100 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-surface/50 backdrop-blur-md border border-text-main/10 rounded-2xl hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] transition-all group relative overflow-hidden shadow-lg flex flex-col h-full"
                        >
                            {/* Certificate Image */}
                            <div className="relative h-48 w-full overflow-hidden bg-black/20">
                                <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            <div className="p-6 relative z-10 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-text-main mb-2 group-hover:text-cyan-400 transition-colors">
                                    {cert.title}
                                </h3>
                                <p className="text-cyan-400 font-medium mb-4">{cert.issuer}</p>

                                <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
                                    <Calendar size={14} />
                                    <span>{cert.date}</span>
                                </div>

                                <p className="text-text-muted text-sm leading-relaxed mt-auto">
                                    {cert.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
