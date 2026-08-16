'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const MILESTONES = [
    { 
        year: '1948 – 1970s', 
        title: 'Academic Brilliance & Top 5% Scholars\' Forum', 
        desc: 'Born in Toba Tek Singh. Secured 1st position in Middle Exam. Maintained top 5% standing with merit scholarships from SSC through PhD, joining the elite Scholars\' Forum at UAF.' 
    },
    { 
        year: '1980s', 
        title: 'Global Science & International Leadership (IRRI / IMSA)', 
        desc: 'Pioneered IPM research at IRRI (Philippines). Served as President of International Muslim Students Association (IMSA) and established the Islamic Centre at IRRI.' 
    },
    { 
        year: '1990s – 2000s', 
        title: '5 National Presidential & Prime Ministerial Awards', 
        desc: 'Conferred 5 competitive Presidential & PM Seerat Awards by Gen. Pervez Musharraf (twice), Nawaz Sharif, Farooq Leghari, and Moeen Qureshi at National Seerat Conferences.' 
    },
    { 
        year: '2010s – 2026', 
        title: 'Harmonizing Revealed & Acquired Knowledge', 
        desc: 'Authored 200+ publications and seminal books including Divine Providence (Vols 1 & 2), Brotherhood, Spiritual Diseases, and 10 foundational treatises on modern ethics.' 
    }
];

export default function HeritageTimeline() {
    return (
        <section id="about" className="section relative bg-[#07090D] text-white py-24 border-b border-white/5 overflow-hidden">
            <div className="container relative z-10 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Left: Scholar Profile Summary */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-crimson-400 block mb-3 font-mono">
                                The Architect of Modern Discourse
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-extrabold text-white font-heading leading-tight">
                                Dr. Muhammad <br />
                                <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 bg-clip-text text-transparent font-serif italic font-normal">
                                    Salim
                                </span>
                            </h2>
                            <div className="w-20 h-[1px] bg-amber-500 mt-4" />
                        </div>

                        <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                            <p>
                                Dr. Muhammad Salim (PhD) is a distinguished scientist, Islamic scholar, and author of over <strong className="text-white font-medium">200 scientific and religious publications</strong>.
                            </p>
                            <p>
                                Recipient of <strong className="text-amber-300 font-semibold">5 Presidential & Prime Ministerial Seerat Awards</strong> from the Government of Pakistan, his life's mission is resolving contemporary crises by bridging <strong className="text-white font-medium">Revealed Wisdom</strong> and <strong className="text-white font-medium">Empirical Science</strong> into an integrated educational paradigm.
                            </p>
                        </div>

                        {/* Metric Badges */}
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div className="p-4 rounded-xl bg-white/5 border border-amber-500/20">
                                <div className="text-3xl font-bold text-amber-300 font-mono">5x</div>
                                <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Presidential Awards</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-3xl font-bold text-white font-mono">200+</div>
                                <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Treatises & Books</div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-crimson-900/30"
                            >
                                <span>Read Complete Scholarly Bio</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Interactive 40-Year Heritage Journey */}
                    <div className="lg:col-span-7 space-y-6">
                        <h3 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest mb-6">
                            Life Milestones & Distinctions (1948 – 2026)
                        </h3>

                        <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-500 before:via-crimson-500 before:to-transparent">
                            {MILESTONES.map((m, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className="relative pl-10 group"
                                >
                                    {/* Glowing Milestone Dot */}
                                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-crimson-500 -translate-x-1/2 group-hover:scale-150 transition-transform shadow-md shadow-amber-500/50" />

                                    <div className="p-5 rounded-xl bg-gradient-to-br from-[#12151B] to-[#0A0D12] border border-white/10 group-hover:border-amber-500/40 transition-all shadow-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-mono font-bold text-amber-300">{m.year}</span>
                                            <span className="text-[10px] text-stone-500 uppercase font-mono">Era</span>
                                        </div>
                                        <h4 className="text-base font-bold text-white font-heading group-hover:text-amber-200 transition-colors">
                                            {m.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-stone-400 font-light mt-1.5 leading-relaxed">
                                            {m.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
