'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
    const presidentialAwards = [
        {
            title: "Presidential Seerat Award",
            conferredBy: "General Pervez Musharraf, President of Pakistan",
            occasion: "National Seerat Conference",
            organizer: "Ministry of Religious Affairs, Govt of Pakistan",
            icon: "🎖️"
        },
        {
            title: "Presidential Seerat Award (2nd Honor)",
            conferredBy: "General Pervez Musharraf, President of Pakistan",
            occasion: "National Seerat Conference",
            organizer: "Ministry of Religious Affairs, Govt of Pakistan",
            icon: "🎖️"
        },
        {
            title: "National Seerat Award",
            conferredBy: "Mr. M. Nawaz Sharif, Prime Minister of Pakistan",
            occasion: "National Seerat Conference",
            organizer: "Ministry of Religious Affairs, Govt of Pakistan",
            icon: "🏅"
        },
        {
            title: "Presidential Seerat Award",
            conferredBy: "Mr. Farooq Khan Leghari, President of Pakistan",
            occasion: "National Seerat Conference",
            organizer: "Ministry of Religious Affairs, Govt of Pakistan",
            icon: "🎖️"
        },
        {
            title: "Prime Ministerial Seerat Award",
            conferredBy: "Mr. Moeen A. Qureshi, Caretaker Prime Minister of Pakistan",
            occasion: "National Seerat Conference",
            organizer: "Ministry of Religious Affairs, Govt of Pakistan",
            icon: "🏅"
        }
    ];

    const majorBooks = [
        { title: "Host Plant Resistance: Concept and Significance", type: "Post-Graduate Scientific Textbook" },
        { title: "Altruistic Compassionate Love and Global Peace", type: "Philosophical Treatise" },
        { title: "Human Journey from Soul to Final Abode", type: "Spiritual Metaphysics" },
        { title: "Spiritual Diseases and Their Integrated Management", type: "Islamic Psychology & Tazkiyah" },
        { title: "Brotherhood", type: "Social & Spiritual Foundations" },
        { title: "Divine Providence (Vols. 1 & 2)", type: "Theology & Revealed Knowledge (Vol 3 in Prep)" }
    ];

    return (
        <main className="bg-[#07090D] min-h-screen text-stone-100 pb-24 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(180,20,20,0.12)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Hero Section */}
            <section className="relative z-10 pt-36 pb-20 border-b border-white/5">
                <div className="container max-w-5xl mx-auto px-6 text-center space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono font-bold uppercase tracking-[0.3em] text-[10px]">
                        Distinguished Scientist, Scholar & Author
                    </span>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight font-heading text-white tracking-tight">
                        Dr. Muhammad Salim
                    </h1>

                    <p className="text-stone-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed font-light italic">
                        "Harmonizing the light of Revealed Knowledge with the rigor of Acquired Science for the holistic elevation of humanity."
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-mono text-stone-400">
                        <span>📍 Born May 5, 1948 • Toba Tek Singh, Punjab, Pakistan</span>
                    </div>
                </div>
            </section>

            {/* Core Narrative / Biography Section */}
            <section className="relative z-10 py-20">
                <div className="container max-w-5xl mx-auto px-6 space-y-16">
                    
                    {/* Early Life & Scholarly Distinction */}
                    <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#12151B] to-[#0A0D12] border border-amber-500/20 shadow-2xl space-y-6">
                        <span className="text-crimson-400 font-mono font-bold uppercase tracking-widest text-xs block">
                            Academic Journey & Early Brilliance
                        </span>
                        <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading">
                            Excellence from Inception to PhD
                        </h2>
                        <div className="w-16 h-[2px] bg-gradient-to-r from-amber-500 to-crimson-500" />
                        
                        <div className="text-stone-300 font-light text-base sm:text-lg leading-relaxed space-y-4">
                            <p>
                                Dr. Muhammad Salim was born on <strong className="text-white">May 5, 1948</strong> in district Toba Tek Singh, Punjab, Pakistan. He received his elementary education in his native village, securing <strong className="text-amber-200">First Position</strong> in the school in the Middle Examination by a wide margin.
                            </p>
                            <p>
                                Throughout his academic career, he consistently maintained standing among the <strong className="text-amber-200">top five percent of students</strong>, earning merit scholarships and competitive fellowships uninterruptedly from his Secondary School Certificate Examination through to his <strong>Doctor of Philosophy (PhD)</strong>.
                            </p>
                            <p>
                                He was an esteemed member of the prestigious <em>‘Scholars’ Forum’</em> at the University of Agriculture Faisalabad—a student body exclusively restricted to the top 5% of students in each major discipline.
                            </p>
                        </div>
                    </div>

                    {/* Scientific Contributions & International Service */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#12151B] to-[#0A0D12] border border-white/10 space-y-4">
                            <div className="text-2xl text-amber-400">🔬</div>
                            <h3 className="text-xl font-bold text-white font-heading">
                                Scientific Rigor & Global Research
                            </h3>
                            <p className="text-stone-300 text-sm leading-relaxed font-light">
                                As a premier research scientist, Dr. Salim generated pioneering methodologies in integrated pest management (IPM) for rice and cotton ecosystems, host plant resistance under physicochemical stresses, and biological control conservation.
                            </p>
                            <p className="text-stone-400 text-xs leading-relaxed font-mono">
                                Advanced qualifications: Bio-safety & bio-security initiatives, Life Sciences IP Management (USA), and Genetic Engineering with Bacillus thuringiensis (Bt) at IRRI (Philippines).
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#12151B] to-[#0A0D12] border border-white/10 space-y-4">
                            <div className="text-2xl text-amber-400">🌍</div>
                            <h3 className="text-xl font-bold text-white font-heading">
                                International Leadership & Community
                            </h3>
                            <p className="text-stone-300 text-sm leading-relaxed font-light">
                                During his tenure at IRRI/UPLB in the Philippines, Dr. Salim served as both <strong>President and Vice President</strong> of the International Muslim Students Association (IMSA).
                            </p>
                            <p className="text-stone-300 text-sm leading-relaxed font-light">
                                He played a vital instrumental role in the establishment and expansion of the <strong>Islamic Centre at IRRI</strong>, cultivating a dynamic and supportive community for international Muslim scholars.
                            </p>
                        </div>
                    </div>

                    {/* 5 Presidential & Prime Ministerial Awards */}
                    <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#151922] via-[#0E1117] to-[#0A0D12] border border-amber-500/30 shadow-2xl space-y-8">
                        <div className="text-center max-w-2xl mx-auto space-y-2">
                            <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                                National Recognition
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                                5 Presidential & Prime Ministerial Awards
                            </h2>
                            <p className="text-xs sm:text-sm text-stone-400">
                                Conferred during National Seerat Conferences by the Ministry of Religious Affairs, Government of Pakistan, Islamabad.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {presidentialAwards.map((award, i) => (
                                <div key={i} className="p-5 rounded-xl bg-white/5 border border-amber-500/20 space-y-2 hover:border-amber-500/50 transition-colors">
                                    <div className="text-2xl">{award.icon}</div>
                                    <h4 className="text-sm font-bold text-white font-heading">{award.title}</h4>
                                    <div className="text-xs font-semibold text-amber-300">{award.conferredBy}</div>
                                    <div className="text-[10px] text-stone-400 font-mono">{award.occasion}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Prolific Literary & Philosophical Output */}
                    <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-[#12151B] to-[#0A0D12] border border-white/10 space-y-8">
                        <div className="space-y-2">
                            <span className="text-crimson-400 font-mono font-bold uppercase tracking-widest text-xs">
                                Prolific Authorship (200+ Publications)
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                                Published Books by Dr. Muhammad Salim
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {majorBooks.map((b, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                                    <div>
                                        <div className="text-sm font-bold text-white font-heading">{b.title}</div>
                                        <div className="text-xs text-amber-400/90 font-mono">{b.type}</div>
                                    </div>
                                    <span className="text-stone-500 text-xs">📖</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Core Vision & Philosophy: Harmonizing Revealed & Acquired Knowledge */}
                    <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-crimson-950/40 via-[#0E1117] to-amber-950/20 border border-amber-500/30 space-y-6">
                        <span className="text-amber-400 font-mono font-bold uppercase tracking-widest text-xs">
                            Core Philosophical Vision
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                            The Interface of Science & Religion: An Integrated Education System
                        </h3>
                        <div className="w-16 h-[2px] bg-amber-500" />
                        
                        <div className="text-stone-300 font-light text-base sm:text-lg leading-relaxed space-y-4">
                            <p>
                                At present, the major emphasis of Dr. Salim is the articulation of solutions to modern human crises in the light of <strong>Revealed Knowledge</strong> (the Holy Qur'an & Seerah) and <strong>Acquired Knowledge</strong> (Empirical Science).
                            </p>
                            <blockquote className="p-4 rounded-xl bg-black/40 border-l-4 border-amber-500 text-amber-100 font-serif italic text-base sm:text-lg">
                                "The historical separation of mainstream secular education and religious education was a monumental blunder that caused profound harm to humanity in general and the Muslim Nation in particular. Only an integrated ideal education system will ensure true success in this world and the Hereafter."
                            </blockquote>
                            <p>
                                Through his 10 featured treatises on this platform—including <em>Evil Web</em>, <em>The Status of Heart in Human Personality</em>, <em>Justice: An Islamic Perspective</em>, and <em>Hidayat</em>—Dr. Salim provides the roadmap for this intellectual synthesis.
                            </p>
                        </div>

                        <div className="pt-4 flex flex-wrap gap-4">
                            <Link
                                href="/#articles"
                                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-crimson-600 to-amber-600 hover:from-crimson-500 hover:to-amber-500 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg"
                            >
                                Read Dr. Salim's 10 Online Treatises →
                            </Link>
                            <Link
                                href="/#books"
                                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 text-xs font-bold transition-all"
                            >
                                View Book Editions
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
