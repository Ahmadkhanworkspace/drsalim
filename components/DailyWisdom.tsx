'use client';

import { useState } from 'react';

const CONTEMPLATIONS = [
    {
        quote: "Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another.",
        source: "From 'Brotherhood'",
        theme: "Unity & Friendship"
    },
    {
        quote: "Finding peace of mind starts by letting go of pride and envy, and filling the heart with gratitude.",
        source: "From 'Spiritual Diseases'",
        theme: "Inner Peace"
    },
    {
        quote: "Every hardship we encounter carries a lesson that helps us grow stronger, wiser, and more compassionate.",
        source: "From 'Divine Providence'",
        theme: "Faith & Trust"
    },
    {
        quote: "Justice brings balance and fairness to our communities; when we act justly, peace naturally follows.",
        source: "From 'Justice: An Islamic Perspective'",
        theme: "Fairness & Ethics"
    },
    {
        quote: "Life is a journey of continuous growth — from simply getting through the day to living with genuine purpose, kindness, and faith.",
        source: "From 'Human Journey'",
        theme: "Purposeful Living"
    }
];

export default function DailyWisdom() {
    const [index, setIndex] = useState(0);
    const [copied, setCopied] = useState(false);

    const nextQuote = () => {
        setIndex((prev) => (prev + 1) % CONTEMPLATIONS.length);
        setCopied(false);
    };

    const copyToClipboard = () => {
        const item = CONTEMPLATIONS[index];
        navigator.clipboard.writeText(`"${item.quote}" — Dr. Muhammad Salim (${item.source})`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const current = CONTEMPLATIONS[index];

    return (
        <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6">
                <div className="rounded-2xl bg-stone-50 border border-stone-200 p-6 sm:p-10 text-center space-y-6 shadow-2xs">
                    
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center border-b border-stone-200 pb-4 gap-2">
                        <span className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">
                            Daily Reflection
                        </span>
                        <span className="text-xs font-semibold text-crimson-800 bg-crimson-50 px-2.5 py-0.5 rounded-full border border-crimson-200">
                            {current.theme}
                        </span>
                    </div>

                    {/* Quote */}
                    <div className="space-y-4 py-2 sm:py-4">
                        <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-stone-900 leading-relaxed italic px-2">
                            "{current.quote}"
                        </p>
                        <p className="text-xs text-stone-500 font-mono font-semibold uppercase tracking-wider">
                            {current.source} • <span className="text-stone-900">Dr. Muhammad Salim</span>
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-3 border-t border-stone-200">
                        <button
                            onClick={nextQuote}
                            className="w-full sm:w-auto btn btn-primary text-xs cursor-pointer"
                        >
                            Next Reflection →
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="w-full sm:w-auto btn btn-outline text-xs cursor-pointer"
                        >
                            {copied ? '✓ Copied Quote' : 'Copy Quote'}
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
