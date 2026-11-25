'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setMessage('✓ Thank you for subscribing. You will receive new articles and updates.');
            setEmail('');
            setIsSubmitting(false);
            setTimeout(() => setMessage(''), 5000);
        }, 1000);
    };

    return (
        <section id="newsletter" className="py-20 sm:py-28 bg-[#F5F1E8]">
            <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] block">
                    Literary Dispatches
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1715] tracking-tight font-heading leading-tight">
                    Subscribe to <br />
                    <span className="text-[#7A1C1C] font-serif italic font-normal">
                        New Articles & Publications
                    </span>
                </h2>
                
                <p className="text-[#554E48] text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
                    Join readers receiving new articles, book announcements, and insights directly from Dr. Muhammad Salim.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        required
                        className="flex-1 bg-white border border-[#D9CEBA] rounded-xl px-4 py-3 text-[#1A1715] placeholder:text-[#7A726A] focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xs cursor-pointer"
                    >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                <p className="text-xs text-[#7A726A] font-mono">
                    Zero spam. Unsubscribe anytime.
                </p>

                {message && (
                    <div className="mt-4 text-emerald-800 text-xs font-semibold">
                        {message}
                    </div>
                )}
            </div>
        </section>
    );
}
