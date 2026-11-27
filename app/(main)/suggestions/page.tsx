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

        setTimeout(() => {
            setSubmitMessage('✓ Thank you for your valuable suggestion. Dr. Salim\'s research circle appreciates your contribution.');
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
        <main className="bg-[#FAF7F2] min-h-screen text-[#1A1715] pt-32 sm:pt-40 pb-24 relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#EFE8DC]/60 rounded-full blur-[140px] pointer-events-none z-0" />

            <div className="container relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-crimson-700 font-mono font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-3 block">
                        Community & Intellectual Input
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 mb-4 tracking-tight font-heading leading-tight">
                        Scholarly <span className="bg-gradient-to-r from-crimson-700 to-amber-700 bg-clip-text text-transparent font-serif italic font-normal">Suggestions</span>
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-crimson-600 via-amber-500 to-transparent mx-auto mb-6 rounded-full" />
                    <p className="text-stone-600 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                        Share your ideas, research topics, critique, or recommendations to enrich Dr. Salim's published discourse.
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white border border-stone-200/90 p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl shadow-xl relative">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Prof. / Researcher / Reader"
                                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-600 transition-all text-sm"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="email@example.com"
                                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-600 transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="category" className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
                                Suggestion Domain *
                            </label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-600 transition-all text-sm"
                            >
                                <option value="general">General Reader Feedback</option>
                                <option value="books">Book Translation / Edition Requests</option>
                                <option value="articles">Article Topic Suggestion</option>
                                <option value="technical">Website & Reading Experience</option>
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="suggestion" className="block text-xs font-mono font-bold uppercase tracking-wider text-stone-600">
                                Your Suggestion or Proposal *
                            </label>
                            <textarea
                                id="suggestion"
                                name="suggestion"
                                value={formData.suggestion}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Describe your recommendation, source references, or topic in detail..."
                                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-600 transition-all text-sm resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 rounded-xl bg-gradient-to-r from-crimson-600 via-crimson-700 to-amber-600 hover:from-crimson-700 hover:to-amber-700 text-white font-bold uppercase tracking-wider text-xs shadow-md shadow-crimson-900/15 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
                        >
                            {isSubmitting ? 'Submitting Proposal...' : 'Submit Suggestion →'}
                        </button>

                        {submitMessage && (
                            <motion.div 
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-semibold text-center"
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
