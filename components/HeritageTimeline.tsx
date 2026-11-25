'use client';

import Link from 'next/link';

const MILESTONES = [
    { 
        period: '1948 – 1970s', 
        title: 'Formative Scholarly Foundations', 
        desc: 'Born in Toba Tek Singh. Secured 1st position in academic evaluations and maintained top standing throughout higher education with continuous merit scholarships.' 
    },
    { 
        period: '1980s', 
        title: 'International Research & Community Leadership', 
        desc: 'Conducted high-impact agricultural and scientific research at IRRI in the Philippines. Served as President of the International Muslim Students Association and co-founded the local Islamic Centre.' 
    },
    { 
        period: '1990s – 2000s', 
        title: '5 National Presidential & Prime Ministerial Seerat Awards', 
        desc: 'Conferred 5 prestigious national awards by the Government of Pakistan for outstanding contributions to Islamic literature, moral ethics, and Seerat scholarship.' 
    },
    { 
        period: '2010s – Present', 
        title: 'Published Works on Moral Philosophy & Faith', 
        desc: 'Authored definitive published volumes including Brotherhood, Spiritual Diseases, and Divine Providence, alongside numerous articles addressing modern existential and ethical challenges.' 
    }
];

export default function HeritageTimeline() {
    return (
        <section id="about" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E3DBD0] relative overflow-hidden">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* Left: Author Profile & Honors */}
                    <div className="lg:col-span-5 space-y-7">
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] block mb-2">
                                Scholarly Heritage & Honors
                            </span>
                            <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1715] leading-tight font-heading">
                                About <br />
                                <span className="text-[#7A1C1C] font-serif italic font-normal">
                                    Dr. Muhammad Salim
                                </span>
                            </h2>
                            <div className="w-16 h-1 bg-[#7A1C1C] mt-3 rounded-full" />
                        </div>

                        <div className="space-y-4 text-[#554E48] text-sm sm:text-base font-light leading-relaxed">
                            <p>
                                <strong className="text-[#1A1715] font-semibold">Dr. Muhammad Salim</strong> is an author, scientist, and Islamic scholar whose lifelong vocation bridges scientific rigor with timeless spiritual wisdom.
                            </p>
                            <p>
                                Conferred <strong className="text-[#1A1715] font-semibold">5 Presidential and Prime Ministerial Seerat Awards</strong> in Pakistan, his published works provide a compass for cultivating inner peace, moral integrity, and social harmony in the modern era.
                            </p>
                        </div>

                        {/* Honors Strip */}
                        <div className="p-6 rounded-2xl bg-white border border-[#E3DBD0] shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#7A1C1C]">
                                <span>✦</span>
                                <span>Conferred Distinctions</span>
                            </div>
                            <ul className="space-y-2 text-xs text-[#554E48] font-light">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C5A059] font-bold">✓</span>
                                    <span>National Seerat Award Winner (Ministry of Religious Affairs)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C5A059] font-bold">✓</span>
                                    <span>Prime Ministerial Seerat Conference Honors</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#C5A059] font-bold">✓</span>
                                    <span>Presidential Citations for Islamic Scholarly Literature</span>
                                </li>
                            </ul>
                        </div>

                        {/* Direct Action */}
                        <div className="pt-2">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#7A1C1C] hover:text-[#521010] group"
                            >
                                <span>Read Full Biography & Archival Essay</span>
                                <span className="transition-transform group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Milestone Archive Timeline */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="border-l-2 border-[#D9CEBA] pl-6 sm:pl-8 space-y-8 sm:space-y-10 my-2">
                            {MILESTONES.map((item, idx) => (
                                <div key={idx} className="relative group">
                                    {/* Timeline Marker Bullet */}
                                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#7A1C1C] group-hover:bg-[#7A1C1C] transition-colors shadow-2xs" />

                                    <div className="bg-white border border-[#E3DBD0] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow space-y-2">
                                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C5A059] block">
                                            {item.period}
                                        </span>
                                        <h3 className="text-lg font-bold text-[#1A1715] font-heading">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#554E48] leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
