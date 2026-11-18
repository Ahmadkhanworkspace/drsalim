'use client';

import Link from 'next/link';

const MILESTONES = [
    { 
        year: '1948 – 1970s', 
        title: 'Early Education & Academic Honors', 
        desc: 'Born in Toba Tek Singh. Secured 1st position in middle school and maintained top 5% standing throughout higher education with continuous merit scholarships.' 
    },
    { 
        year: '1980s', 
        title: 'International Research & Community Leadership', 
        desc: 'Conducted agricultural and scientific research at IRRI in the Philippines. Served as President of the International Muslim Students Association and helped establish the local Islamic Centre.' 
    },
    { 
        year: '1990s – 2000s', 
        title: '5 National Presidential Awards', 
        desc: 'Awarded 5 prestigious Presidential and Prime Ministerial Seerat Awards by the Government of Pakistan for contributions to literature and religious scholarship.' 
    },
    { 
        year: '2010s – Present', 
        title: 'Books & Articles on Faith and Life', 
        desc: 'Authored more than 200 publications and books including Brotherhood, Spiritual Diseases, and articles exploring how faith enriches modern life.' 
    }
];

export default function HeritageTimeline() {
    return (
        <section id="about" className="py-16 sm:py-24 bg-white border-b border-stone-200">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    
                    {/* Left: Author Profile */}
                    <div className="lg:col-span-5 space-y-6 sm:space-y-8">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 block mb-2">
                                Author Profile
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
                                About <br />
                                <span className="text-crimson-800 font-serif italic font-normal">
                                    Dr. Muhammad Salim
                                </span>
                            </h2>
                            <div className="w-16 h-1 bg-crimson-800 mt-3 rounded-full" />
                        </div>

                        <div className="space-y-3.5 text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                            <p>
                                <strong className="text-stone-900 font-semibold">Dr. Muhammad Salim</strong> is an author, scientist, and Islamic scholar with recognized research and published works.
                            </p>
                            <p>
                                Recognized with <strong className="text-stone-900 font-semibold">5 Presidential and Prime Ministerial Awards</strong> in Pakistan, his writing focuses on bringing spiritual values, kindness, and moral clarity into daily modern life.
                            </p>
                        </div>

                        {/* Metric Badges */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1">
                            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                                <div className="text-2xl sm:text-3xl font-bold text-stone-900">5x</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">National Awards</div>
                            </div>
                            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                                <div className="text-2xl sm:text-3xl font-bold text-stone-900">5</div>
                                <div className="text-xs text-stone-500 uppercase tracking-wider font-mono">Published Books</div>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Link
                                href="/about"
                                className="btn btn-primary text-xs w-full sm:w-auto text-center"
                            >
                                Read Complete Biography →
                            </Link>
                        </div>
                    </div>

                    {/* Right: Milestones */}
                    <div className="lg:col-span-7 space-y-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider">
                                Key Milestones
                            </h3>
                            <span className="text-xs font-mono text-crimson-800 font-bold uppercase">
                                4 Decades
                            </span>
                        </div>

                        <div className="space-y-4">
                            {MILESTONES.map((m, idx) => (
                                <div
                                    key={idx}
                                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-all"
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-xs font-mono font-bold text-crimson-800 bg-crimson-50 px-2 py-0.5 rounded border border-crimson-200">
                                            {m.year}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-stone-900 mt-2">
                                        {m.title}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-stone-600 font-light mt-1.5 leading-relaxed">
                                        {m.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
