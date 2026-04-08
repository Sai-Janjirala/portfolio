import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../data';
import { Send, Mail, MapPin, Loader2, ArrowUpRight } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const onSubmit = (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending...");

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
                formRef.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
                }
            )
            .then(
                () => {
                    setResult("Message sent successfully!");
                    event.target.reset();
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    setResult("Failed to send message. Please try again.");
                }
            )
            .finally(() => {
                setIsSubmitting(false);
                setTimeout(() => setResult(""), 5000);
            });
    };

    const inputClasses = "w-full bg-surface border border-border/50 rounded-xl px-5 py-3.5 text-text-main placeholder-text-muted/40 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(232,168,56,0.1)] transition-all duration-300 font-sans text-sm";

    return (
        <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary text-sm tracking-[0.3em] uppercase font-heading mb-3">Get In Touch</p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                        Let's Work <span className="text-primary">Together</span>
                    </h2>
                    <p className="text-text-muted text-lg max-w-md mx-auto">Ready to collaborate on something amazing?</p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
                    {/* Info - 2 cols */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        <div className="space-y-6">
                            <h3 className="text-xl font-heading font-bold text-text-main">Contact Info</h3>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-text-muted text-sm group-hover:text-text-main transition-colors">saijanjirala5411@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                                        <MapPin size={18} />
                                    </div>
                                    <span className="text-text-muted text-sm group-hover:text-text-main transition-colors">Remote / Worldwide</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-border/30" />

                        <div>
                            <h4 className="text-xs text-text-muted uppercase tracking-[0.2em] font-heading mb-4">Follow Me</h4>
                            <div className="flex gap-3">
                                {SOCIALS.map((social) => (
                                    <button
                                        key={social.name}
                                        onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                                        className="w-10 h-10 rounded-xl bg-surface border border-border/50 flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 hover:scale-110 transition-all duration-300 outline-none"
                                    >
                                        <social.icon size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form - 3 cols */}
                    <motion.form
                        ref={formRef}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-3 space-y-4"
                        onSubmit={onSubmit}
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your name"
                                className={inputClasses}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Your email"
                                className={inputClasses}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            required
                            placeholder="Subject"
                            className={inputClasses}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                        />
                        <textarea
                            name="message"
                            rows="5"
                            required
                            placeholder="Tell me about your project..."
                            className={`${inputClasses} resize-none`}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                        />

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full group relative bg-primary hover:bg-primary-dim text-background font-heading font-semibold py-4 rounded-xl shadow-lg shadow-primary/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden text-sm tracking-wide"
                        >
                            {isSubmitting ? (
                                <>Sending... <Loader2 size={16} className="animate-spin" /></>
                            ) : (
                                <>Send Message <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                            )}
                        </button>

                        {result && (
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`text-center text-sm font-heading ${result.includes("successfully") ? "text-green-400" : "text-red-400"}`}
                            >
                                {result}
                            </motion.p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
