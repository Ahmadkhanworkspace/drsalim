'use client';

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
        { title: "Altruistic Compassionate Love and Global Peace", type: "Philosophical Monograph" },
        { title: "Human Journey from Soul to Final Abode", type: "Spiritual Psychology" },
        { title: "Spiritual Diseases and Their Integrated Management", type: "Islamic Ethics & Tazkiyah" },
        { title: "Brotherhood", type: "Social & Spiritual Foundations" },
        { title: "Divine Providence (Vols. 1 & 2)", type: "Theology & Revealed Knowledge" }
    ];

    return (
        <main className="bg-white min-h-screen text-stone-900 pb-24 relative overflow-hidden">
            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 border-b border-stone-200 bg-stone-50">
                <div className="container max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
                        Scientist, Scholar & Author
                    </span>

                    <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight font-heading text-stone-900 tracking-tight">
                        Dr. Muhammad Salim
                    </h1>

                    <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-light italic">
                        "Harmonizing the light of Revealed Knowledge with the rigor of Acquired Science for the holistic elevation of humanity."
                    </p>

                    <div className="pt-2 text-xs font-mono text-stone-500">
                        <span>Born May 5, 1948 • Toba Tek Singh, Punjab, Pakistan</span>
                    </div>
                </div>
            </section>

            {/* Core Narrative / Biography Section */}
            <section className="py-16 sm:py-20">
                <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
                    
                    {/* Early Life */}
                    <div className="p-6 sm:p-10 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
                        <span className="text-crimson-800 font-mono font-bold uppercase tracking-wider text-xs block">
                            Academic Journey
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading">
                            Excellence from Inception through Research
                        </h2>
                        <div className="w-12 h-1 bg-crimson-800 rounded-full" />
                        
                        <div className="text-stone-700 font-light text-base leading-relaxed space-y-3">
                            <p>
                                Dr. Muhammad Salim was born on <strong className="text-stone-900 font-semibold">May 5, 1948</strong> in district Toba Tek Singh, Punjab, Pakistan. He received his elementary education in his native village, securing First Position in the school in the Middle Examination by a wide margin.
                            </p>
                            <p>
                                Throughout his academic career, he consistently maintained standing among the top five percent of students, earning merit scholarships and competitive fellowships uninterruptedly through his doctoral studies.
                            </p>
                            <p>
                                He was an esteemed member of the prestigious <em>‘Scholars’ Forum’</em> at the University of Agriculture Faisalabad—a student body restricted to the top 5% of students in each major discipline.
                            </p>
                        </div>
                    </div>

                    {/* Scientific Contributions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-3">
                            <div className="text-2xl">🔬</div>
                            <h3 className="text-xl font-bold text-stone-900 font-heading">
                                Scientific Rigor & Global Research
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed font-light">
                                As a premier research scientist, Dr. Salim generated pioneering methodologies in integrated pest management (IPM) for rice and cotton ecosystems, host plant resistance, and biological control conservation.
                            </p>
                        </div>

                        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 space-y-3">
                            <div className="text-2xl">🌍</div>
                            <h3 className="text-xl font-bold text-stone-900 font-heading">
                                International Leadership & Community
                            </h3>
                            <p className="text-stone-600 text-sm leading-relaxed font-light">
                                During his tenure at IRRI in the Philippines, Dr. Salim served as President of the International Muslim Students Association (IMSA) and played a vital role in establishing the Islamic Centre at IRRI.
                            </p>
                        </div>
                    </div>

                    {/* 5 Presidential Awards */}
                    <div className="p-6 sm:p-10 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-6">
                        <div className="space-y-1">
                            <span className="text-xs font-mono tracking-wider text-amber-900 font-bold uppercase">
                                National Honors
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-heading">
                                5 Presidential & Prime Ministerial Seerat Awards
                            </h2>
                            <p className="text-xs sm:text-sm text-stone-600">
                                Conferred during National Seerat Conferences by the Ministry of Religious Affairs, Government of Pakistan.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {presidentialAwards.map((award, i) => (
                                <div key={i} className="p-4 rounded-xl bg-white border border-amber-200 space-y-1.5">
                                    <div className="text-xl">{award.icon}</div>
                                    <h4 className="text-sm font-bold text-stone-900 font-heading">{award.title}</h4>
                                    <div className="text-xs font-semibold text-crimson-800">{award.conferredBy}</div>
                                    <div className="text-[10px] text-stone-500 font-mono">{award.occasion}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Books */}
                    <div className="p-6 sm:p-10 rounded-2xl bg-white border border-stone-200 space-y-6">
                        <div className="space-y-1">
                            <span className="text-crimson-800 font-mono font-bold uppercase tracking-wider text-xs">
                                Major Publications
                            </span>
                            <h3 className="text-2xl font-bold text-stone-900 font-heading">
                                Published Books by Dr. Muhammad Salim
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {majorBooks.map((b, i) => (
                                <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex justify-between items-center">
                                    <div>
                                        <div className="text-sm font-bold text-stone-900 font-heading">{b.title}</div>
                                        <div className="text-xs text-crimson-800 font-mono">{b.type}</div>
                                    </div>
                                    <span className="text-stone-400 text-sm">📚</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vision & Articles */}
                    <div className="p-6 sm:p-10 rounded-2xl bg-stone-50 border border-stone-200 space-y-5">
                        <span className="text-amber-900 font-mono font-bold uppercase tracking-wider text-xs">
                            Intellectual Vision
                        </span>
                        <h3 className="text-2xl font-bold text-stone-900 font-heading">
                            Harmonizing Revealed & Acquired Knowledge
                        </h3>
                        
                        <p className="text-stone-700 font-light text-base leading-relaxed">
                            A primary emphasis of Dr. Salim's work is articulating solutions to modern human crises in the light of Revealed Knowledge (the Holy Qur'an & Seerah) and Acquired Knowledge (Empirical Science).
                        </p>
                        <blockquote className="p-4 rounded-xl bg-white border-l-4 border-amber-600 text-stone-800 font-serif italic text-base">
                            "The separation of mainstream secular education and spiritual education caused profound harm. An integrated ideal education system ensures true success in this world and the Hereafter."
                        </blockquote>

                        <div className="pt-2 flex flex-wrap gap-3">
                            <Link
                                href="/#articles"
                                className="btn btn-primary text-xs"
                            >
                                Read Online Articles →
                            </Link>
                            <Link
                                href="/#books"
                                className="btn btn-outline text-xs"
                            >
                                Browse Books
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
