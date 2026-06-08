'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setMessage('You have been initiated into the discourse.');
            setEmail('');
            setIsSubmitting(false);
            setTimeout(() => setMessage(''), 5000);
        }, 1500);
    };

    return (
        <section id="newsletter" className="py-40 relative overflow-hidden bg-charcoal-900 border-t border-white/5">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none grayscale" style={{ backgroundImage: 'url("/section-bg.png")', backgroundSize: 'cover' }} />
            
            <div className="container relative z-10">
                <div className="max-w-5xl mx-auto glass-card p-12 md:p-24 text-center border-crimson-500/10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">
                            Intellectual Resonance
                        </span>
                        
                        <h2 className="text-5xl md:text-8xl text-white font-bold mb-10 leading-[0.9] tracking-tighter">
                            Subscribe to the <br />
                            <span className="text-crimson-500 font-serif-italic font-normal px-2">Discourse</span>
                        </h2>
                        
                        <p className="text-stone-400 text-xl mb-16 max-w-2xl mx-auto leading-relaxed font-light">
                            Receive curated updates on latest publications, 
                            philosophical reflections, and scholarly inquiries.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Formal Email Address"
                                required
                                className="flex-1 bg-charcoal-950 border border-stone-800 px-8 py-6 text-white placeholder:text-stone-600 focus:outline-none focus:border-crimson-500 transition-all duration-500 tracking-wide text-sm"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary disabled:opacity-50 min-w-[220px]"
                            >
                                {isSubmitting ? 'Processing...' : 'Secure Access'}
                            </button>
                        </form>

                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-12 text-crimson-400 text-[10px] font-black tracking-[0.3em] uppercase"
                            >
                                {message}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
