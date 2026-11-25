'use client';

import { useState } from 'react';

const CONTEMPLATIONS = [
    {
        quote: "Real brotherhood is built on sincere hearts, mutual respect, and honest care for one another.",
        source: "From 'Brotherhood'",
        theme: "Unity & Moral Harmony"
    },
    {
        quote: "Finding peace of mind starts by letting go of pride and envy, and filling the heart with gratitude and sincere devotion.",
        source: "From 'Spiritual Diseases'",
        theme: "Purification of Heart"
    },
    {
        quote: "Every hardship we encounter carries a hidden divine lesson that nurtures our soul toward greater wisdom and compassion.",
        source: "From 'Divine Providence'",
        theme: "Faith & Rububiyah"
    },
    {
        quote: "Justice brings balance, fairness, and mutual honor to human communities; when we act justly, collective peace naturally follows.",
        source: "From 'Justice: An Islamic Perspective'",
        theme: "Ethics & Social Balance"
    },
    {
        quote: "Life is a journey of continuous spiritual awakening — progressing from transient earthly distractions to purposeful moral living.",
        source: "From 'Human Journey'",
        theme: "Purposeful Existence"
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
        <section className="py-16 sm:py-24 bg-[#F5F1E8] border-b border-[#E3DBD0] relative overflow-hidden">
            <div className="container max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                
                {/* Illuminated Manuscript Card */}
                <div className="rounded-3xl bg-white border border-[#E3DBD0] p-8 sm:p-14 text-center space-y-7 shadow-xl relative">
                    
                    {/* Top Ornamental Header */}
                    <div className="flex flex-wrap justify-between items-center border-b border-[#EAE3D8] pb-5 gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-[#C5A059] text-base leading-none">✦</span>
                            <span className="text-xs font-mono font-bold text-[#7A1C1C] uppercase tracking-widest">
                                Daily Reflection & Wisdom
                            </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E3DBD0] text-[11px] font-mono text-[#7A726A] font-semibold">
                            {current.theme}
                        </span>
                    </div>

                    {/* Decorative Calligraphic Quote Mark */}
                    <div className="text-5xl sm:text-6xl font-serif text-[#C5A059]/40 leading-none select-none -mb-3">
                        “
                    </div>

                    {/* The Reflection Quote */}
                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#1A1715] leading-relaxed max-w-2xl mx-auto px-2">
                        {current.quote}
                    </blockquote>

                    {/* Source Citation */}
                    <div className="pt-2">
                        <cite className="text-sm font-heading font-semibold text-[#7A1C1C] not-italic block">
                            Dr. Muhammad Salim
                        </cite>
                        <span className="text-xs text-[#7A726A] font-serif italic">
                            {current.source}
                        </span>
                    </div>

                    {/* Action Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[#EAE3D8]">
                        <button
                            onClick={nextQuote}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1A1715] hover:bg-[#332E2A] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                        >
                            <span>Next Reflection</span>
                            <span>↻</span>
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D9CEBA] text-[#1A1715] font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                        >
                            {copied ? '✓ Copied to Clipboard' : '📋 Copy Wisdom'}
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
