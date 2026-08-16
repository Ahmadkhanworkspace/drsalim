'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTEMPLATIONS = [
    {
        quote: "True brotherhood is not merely a social contract; it is a spiritual resonance rooted in the primordial recognition of the Divine.",
        source: "From 'Brotherhood'",
        theme: "Communal Unity"
    },
    {
        quote: "When we treat the symptoms of pride and envy, we are not merely refining behavior; we are polishing the mirror of the heart to reflect divine light.",
        source: "From 'Spiritual Diseases'",
        theme: "Purification of the Heart (Tazkiyah)"
    },
    {
        quote: "Divine Providence (Rububiyah) nurtures creation through every joy and tribulation, guiding the soul toward its ultimate destination.",
        source: "From 'Divine Providence'",
        theme: "Theology & Purpose"
    },
    {
        quote: "Justice is the cosmic equilibrium upon which the heavens and the earth stand; to disrupt it is to invite disharmony into the human condition.",
        source: "From 'JUSTICE: AN ISLAMIC PERSPECTIVE'",
        theme: "Moral Philosophy"
    },
    {
        quote: "The human journey is an ascent from heedlessness to illuminated awareness through sincere reflection and righteous deed.",
        source: "From 'Human Journey'",
        theme: "Existential Meaning"
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
        <section className="relative py-20 bg-[#07090D] overflow-hidden border-b border-white/5">
            <div className="container relative z-10 px-6 max-w-4xl mx-auto">
                <div className="rounded-2xl bg-gradient-to-br from-[#151922] via-[#0E1117] to-[#0A0D12] border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-6">
                    {/* Top Tag */}
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                        <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                            ✨ Daily Contemplation & Wisdom
                        </span>
                        <span className="text-xs text-crimson-300 font-semibold">
                            {current.theme}
                        </span>
                    </div>

                    {/* Animated Quote */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4 py-4"
                        >
                            <p className="text-xl sm:text-2xl lg:text-3xl font-serif text-white/95 leading-relaxed italic">
                                "{current.quote}"
                            </p>
                            <div className="w-16 h-[1px] bg-gradient-to-r from-amber-500 to-crimson-500 mx-auto" />
                            <p className="text-xs text-amber-300/80 font-mono font-semibold uppercase tracking-wider">
                                {current.source} • Dr. Muhammad Salim
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center items-center gap-4 pt-4 border-t border-white/10">
                        <button
                            onClick={nextQuote}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                        >
                            ✨ Generate Another Reflection
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                        >
                            {copied ? '✓ Copied Quote' : '📋 Copy Wisdom'}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
