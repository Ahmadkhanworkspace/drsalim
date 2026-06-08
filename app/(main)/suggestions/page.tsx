'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SuggestionsPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'general',
        suggestion: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setSubmitMessage('Thank you for your valuable suggestion. We appreciate your feedback.');
            setFormData({ name: '', email: '', category: 'general', suggestion: '' });
            setIsSubmitting(false);

            setTimeout(() => setSubmitMessage(''), 5000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
                        We Value Your Input
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-none tracking-tighter">
                        Suggestion <span className="text-crimson-500 font-serif-italic font-normal px-2">Box</span>
                    </h1>
                    <div className="w-16 h-[1px] bg-crimson-500/40 mx-auto mb-8" />
                    <p className="text-stone-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Share your ideas, feedback, or recommendations to help improve our scholarly platform.
                    </p>
                </div>

                {/* Info Cards Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: '💡', title: 'Ideas', desc: 'Share your creative concepts' },
                        { icon: '📝', title: 'Feedback', desc: 'Share your impressions' },
                        { icon: '🎯', title: 'Improvements', desc: 'Suggest specific changes' }
                    ].map((item, index) => (
                        <div 
                            key={index} 
                            className="p-8 bg-charcoal-900/60 border border-stone-900 rounded-none text-center hover:border-crimson-500/20 transition-all duration-500"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h3 className="text-stone-200 font-heading text-lg font-bold mb-2 uppercase tracking-wider">
                                {item.title}
                            </h3>
                            <p className="text-stone-400 font-light text-sm">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Form Container */}
                <div className="max-w-[800px] mx-auto bg-charcoal-900/50 border border-stone-900 p-8 md:p-12 rounded-none">
                    <h2 className="text-2xl font-bold text-white font-heading tracking-tight mb-8 text-center">
                        Submit Your Suggestion
                    </h2>

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
                            <label htmlFor="category" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                Category *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-stone-300 focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm cursor-pointer"
                            >
                                <option value="general">General Feedback</option>
                                <option value="website">Website Improvement</option>
                                <option value="content">Content Suggestion</option>
                                <option value="feature">Feature Request</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="suggestion" className="block text-xs font-black uppercase tracking-wider text-stone-400">
                                Your Suggestion *
                            </label>
                            <textarea
                                id="suggestion"
                                name="suggestion"
                                value={formData.suggestion}
                                onChange={handleChange}
                                required
                                rows={8}
                                placeholder="Please share your thoughts or ideas in detail..."
                                className="w-full bg-charcoal-950 border border-stone-850 px-6 py-4 text-white focus:outline-none focus:border-crimson-500 rounded-none transition-all duration-300 text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-crimson-500 hover:bg-stone-900 text-white font-black uppercase tracking-[0.2em] text-[10px] py-5 transition-all duration-500 rounded-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
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
        </main>
    );
}
