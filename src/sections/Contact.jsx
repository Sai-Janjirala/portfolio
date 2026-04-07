import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SOCIALS } from '../data';
import { Send, Mail, MapPin, Loader2 } from 'lucide-react';


const Contact = () => {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("Sending...");
        
        const formData = new FormData(event.target);
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully!");
                event.target.reset();
            } else {
                setResult(data.message || "Something went wrong.");
            }
        } catch (error) {
            setResult("Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setResult(""), 5000);
        }
    };
    return (
        <section id="contact" className="py-20 bg-gradient-to-b from-transparent to-black/80 relative">
            <div className="absolute bottom-0 left-1/2 w-[500px] h-[300px] bg-purple-900/20 rounded-full blur-[100px] -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-bold mb-4 hover:text-text-main text-text-main">Let's Connect</h2>
                    <p className="text-text-muted">Ready to collaborate on something amazing?</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Info */}
                    <div className="space-y-8">
                        <div className="bg-surface/50 border border-text-main/10 p-8 rounded-2xl backdrop-blur-md">
                            <h3 className="text-2xl font-bold text-text-main mb-6">Contact Info</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-text-muted">
                                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <Mail size={20} />
                                    </div>
                                    <span>saijanjirala5411@gmail.com</span>
                                </div>
                                <div className="flex items-center gap-4 text-text-muted">
                                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                                        <MapPin size={20} />
                                    </div>
                                    <span>Remote / Worldwide</span>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-sm text-text-muted uppercase tracking-widest mb-4">Socials</h4>
                                <div className="flex gap-4">
                                    {SOCIALS.map((social) => (
                                        <button
                                            key={social.name}
                                            onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                                            className="w-12 h-12 rounded-xl bg-surface/50 border border-text-main/10 flex items-center justify-center text-text-muted hover:bg-surface hover:text-text-main hover:scale-110 transition-all cursor-pointer outline-none"
                                        >
                                            <social.icon size={20} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                        onSubmit={onSubmit}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Name"
                                className="w-full bg-surface/50 border border-text-main/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/60 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                className="w-full bg-surface/50 border border-text-main/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/60 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                        <input
                            type="text"
                            name="subject"
                            required
                            placeholder="Subject"
                            className="w-full bg-surface/50 border border-text-main/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/60 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        <textarea
                            name="message"
                            rows="5"
                            required
                            placeholder="Message"
                            className="w-full bg-surface/50 border border-text-main/10 rounded-xl px-4 py-3 text-text-main placeholder-text-muted/60 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        ></textarea>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>Sending... <Loader2 size={18} className="animate-spin" /></>
                            ) : (
                                <>Send Message <Send size={18} /></>
                            )}
                        </button>

                        {result && (
                            <p className={`text-center text-sm ${result.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
                                {result}
                            </p>
                        )}
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
