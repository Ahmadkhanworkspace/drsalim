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
        <section id="newsletter" className="py-16 sm:py-24 bg-white">
            <div className="container max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 block">
                    Stay Connected
                </span>
                
                <h2 className="text-3xl sm:text-5xl font-bold text-stone-900 tracking-tight font-heading leading-tight">
                    Subscribe to <br />
                    <span className="text-crimson-800 font-serif italic font-normal">
                        New Articles & Publications
                    </span>
                </h2>
                
                <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-light">
                    Join thousands of readers receiving new articles, book announcements, and insights directly from Dr. Muhammad Salim.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email..."
                        required
                        className="flex-1 bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-crimson-800/20 focus:border-crimson-800 text-sm"
                    />
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary text-xs whitespace-nowrap"
                    >
                        {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                    </button>
                </form>

                <p className="text-xs text-stone-400 font-mono">
                    Zero spam. Unsubscribe anytime.
                </p>

                {message && (
                    <div className="mt-4 text-emerald-700 text-xs font-semibold">
                        {message}
                    </div>
                )}
            </div>
        </section>
    );
}
