'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitMessage('Thank you for your message. Your inquiry has been received.');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setIsSubmitting(false);

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <main className="bg-charcoal-950 min-h-screen text-white pt-32 pb-24 relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_50%_50%,rgba(153,0,0,0.1),transparent_70%)] blur-[80px]" />
                <div className="absolute inset-0 bg-cover bg-center opacity-5 grayscale" style={{ backgroundImage: 'url("/section-bg.png")' }} />
            </div>

            <div className="container relative z-10 max-w-[1200px] mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tighter">
                        Contact the <span className="text-crimson-500 font-serif-italic font-normal px-2">Author</span>
                    </h1>
                    <div className="w-16 h-[1px] bg-crimson-500/40 mx-auto mb-8" />
                    <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Have a question, feedback, or want to connect? Please feel free to send a message.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
                    
                    {/* Column 1: Contact Information */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white font-heading tracking-tight mb-8">
                            Information
                        </h2>

                        <div className="space-y-6">
                            {[
                                { icon: '📧', label: 'Email Address', value: 'contact@drsalim.com' },
                                { icon: '📱', label: 'Office Telephone', value: '+1 (555) 123-4567' },
                                { icon: '📍', label: 'Academic Location', value: 'Academic Center, City' }
                            ].map((item, index) => (
                                <div 
                                    key={index} 
                                    className="flex items-start gap-6 p-8 bg-charcoal-900/60 border border-stone-900 rounded-none hover:border-crimson-500/20 transition-all duration-500"
                                >
                                    <div className="text-2xl mt-1">{item.icon}</div>
                                    <div>
                                        <div className="text-crimson-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                                            {item.label}
                                        </div>
                                        <div className="text-stone-200 font-light text-base tracking-wide">
                                            {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Office Hours */}
                        <div className="p-8 bg-charcoal-900/40 border border-stone-900 rounded-none border-t-2 border-t-crimson-500/30">
                            <div className="text-crimson-500 text-2xl mb-4 text-center">⏰</div>
                            <div className="font-bold text-stone-200 text-center uppercase tracking-widest text-xs mb-3">Office Hours</div>
                            <div className="text-sm text-stone-400 text-center leading-relaxed font-light">
                                Monday - Friday<br />
                                9:00 AM - 5:00 PM (EST)
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Contact Form */}
                    <div className="bg-charcoal-900/50 border border-stone-900 p-8 md:p-12 rounded-none relative">
                        <h3 className="text-2xl font-bold text-white font-heading tracking-tight mb-8">
                            Send a Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label htmlFor="name" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-white focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-white focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="subject" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-white focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm"
                                />
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="message" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-white focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-crimson-500 hover:bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 transition-all duration-500 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {submitMessage && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-6 p-4 border border-crimson-500/20 bg-crimson-500/5 text-crimson-400 text-xs font-semibold tracking-wider text-center uppercase"
                                >
                                    {submitMessage}
                                </motion.div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}
