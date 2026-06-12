'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
    const achievements = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Academic Excellence',
            desc: 'PhD in Islamic Studies with distinction'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: '25+ Books Published',
            desc: 'Comprehensive works on theology and philosophy'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: '200+ Publications',
            desc: 'Articles in leading academic journals'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a4 4 0 0 0-4 4v7h8V6a4 4 0 0 0-4-4z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'Global Recognition',
            desc: '20+ international awards and honors'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: '40 Years Teaching',
            desc: 'Mentoring thousands of students worldwide'
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-crimson-500">
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10zM2 12h20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            title: 'International Impact',
            desc: 'Works translated into multiple languages'
        }
    ];

    return (
        <main className="bg-charcoal-950 min-h-screen text-stone-100 pb-24 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(153,0,0,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
            <div className="absolute inset-0 bg-cover bg-center opacity-5 grayscale pointer-events-none" style={{ backgroundImage: 'url("/section-bg.png")' }} />

            {/* Hero Section */}
            <section className="relative z-10 pt-36 pb-20 border-b border-white/5">
                <div className="container max-w-[1200px] mx-auto px-6 text-center">
                    <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block">
                        Biography of a Scholar
                    </span>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight mb-8 font-heading text-white tracking-tighter">
                        Dr. Muhammad Salim
                    </h1>

                    <p className="text-stone-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light italic">
                        A lifetime dedicated to scholarly research, spiritual enlightenment, and sharing profound insights with the world.
                    </p>
                </div>
            </section>

            {/* Biography Section */}
            <section className="relative z-10 py-24">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start">
                        {/* Profile Card Mockup */}
                        <div className="w-full aspect-[3/4] bg-charcoal-900 border border-crimson-500/20 relative group overflow-hidden rounded-none flex items-center justify-center shadow-[20px_20px_50px_rgba(0,0,0,0.5)]">
                            {/* Scholarly Initials Backdrop */}
                            <span className="text-[12rem] font-heading font-black opacity-10 text-crimson-500 select-none">MS</span>
                            <div className="absolute bottom-8 left-8 right-8 text-center border-t border-white/10 pt-4">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 block mb-1">Established Voice</span>
                                <span className="text-xs font-bold text-white uppercase tracking-wider">Islamic Philosophy</span>
                            </div>
                            <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-crimson-500/20" />
                        </div>

                        {/* Bio Content */}
                        <div className="space-y-8">
                            <span className="text-crimson-500 font-black uppercase tracking-[0.4em] text-[10px] block">
                                Core Mission & Journey
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-heading tracking-tight leading-tight">
                                Scholar, Author, & Spiritual Mentor
                            </h2>
                            <div className="w-16 h-[1px] bg-crimson-500/40" />

                            <div className="space-y-6 text-stone-300 font-light text-base sm:text-lg leading-relaxed">
                                <p>
                                    Dr. Muhammad Salim has devoted over <span className="text-white font-medium italic">40 years</span> to the study and teaching of Islamic theology, philosophy, and spirituality. His work serves as a vital bridge, connecting the profound depths of classical Islamic scholarship with the complexities of contemporary thought.
                                </p>
                                <p>
                                    With a prolific archive of more than <span className="text-white font-medium italic">200 publications</span> and 25 authored books, Dr. Salim has become a preeminent, respected voice in Islamic studies. His writings explore the depths of human spirituality, the intersection of faith and reason, and the timeless wisdom found in classical texts.
                                </p>
                                <p>
                                    Throughout his distinguished career, he has received numerous international accolades for his contributions to scholarship and spiritual education. His work continues to guide and inspire students, researchers, and seekers of knowledge worldwide.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="relative z-10 py-24 border-t border-white/5 bg-charcoal-900/30">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                            Milestones
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading tracking-tight">
                            Notable Achievements
                        </h2>
                        <div className="w-16 h-[1px] bg-crimson-500/40 mx-auto mt-6" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.map((item, index) => (
                            <div 
                                key={index} 
                                className="p-8 bg-charcoal-900/60 border border-stone-900 rounded-none hover:border-crimson-500/20 transition-all duration-500 flex flex-col items-center text-center group"
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-stone-100 font-heading text-lg font-bold mb-3 uppercase tracking-wider">
                                    {item.title}
                                </h3>
                                <p className="text-stone-400 font-light text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
