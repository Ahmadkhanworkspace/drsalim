'use client';

export default function AwardsPage() {
    const awards = [
        {
            id: '1',
            title: 'Presidential Seerat Award (Essay Writing)',
            book: 'National Seerat Conference',
            organization: 'Conferred by General Pervez Musharraf (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Presidential Award',
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
        },
        {
            id: '2',
            title: 'Presidential Seerat Award (2nd Presidential Honor)',
            book: 'National Seerat Conference',
            organization: 'Conferred by General Pervez Musharraf (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Presidential Award',
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
        },
        {
            id: '3',
            title: 'National Prime Ministerial Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. M. Nawaz Sharif (Prime Minister of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'National Honor',
            badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
        },
        {
            id: '4',
            title: 'Presidential Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. Farooq Khan Leghari (President of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'Presidential Award',
            badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
        },
        {
            id: '5',
            title: 'Prime Ministerial Seerat Award',
            book: 'National Seerat Conference',
            organization: 'Conferred by Mr. Moeen A. Qureshi (Caretaker Prime Minister of Pakistan) • Ministry of Religious Affairs',
            date: 'National Seerat Conference, Islamabad',
            category: 'National Honor',
            badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
        },
        {
            id: '6',
            title: 'International Student Leadership Honor',
            book: 'Islamic Centre Establishment',
            organization: 'International Muslim Students Association (IMSA) • IRRI / UPLB Philippines',
            date: 'President & VP IMSA',
            category: 'International Recognition',
            badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        },
        {
            id: '7',
            title: 'Scholars\' Forum Distinction (Top 5%)',
            book: 'Academic Fellowship',
            organization: 'University of Agriculture Faisalabad (UAF)',
            date: 'Merit Fellowship & SSC to PhD Distinction',
            category: 'Academic Honor',
            badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
        }
    ];

    const stats = [
        { label: 'Presidential Awards', value: '5 Conferred', desc: 'Conferred by Presidents & PMs', icon: '🎖️', color: '#D97706', bg: 'bg-amber-50 text-amber-700' },
        { label: 'Published Treatises', value: '6 Volumes', desc: 'Books in Distribution', icon: '📚', color: '#4F46E5', bg: 'bg-indigo-50 text-indigo-700' },
        { label: 'Scientific & Religious Works', value: '200+ Publications', desc: 'Research & Discourse Papers', icon: '📜', color: '#059669', bg: 'bg-emerald-50 text-emerald-700' },
        { label: 'Scholarly Distinctions', value: 'Top 5% Career', desc: 'SSC to PhD Scholarships', icon: '🌟', color: '#7C3AED', bg: 'bg-purple-50 text-purple-700' },
    ];

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🎖️ Awards & Presidential Accolades
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Official presidential and prime ministerial accolades conferred on Dr. Muhammad Salim
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 transition-all cursor-pointer">
                        + Add New Distinction
                    </button>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                            <span className="text-xl">{stat.icon}</span>
                        </div>
                        <div className="text-2xl font-extrabold text-slate-900 mt-2">{stat.value}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-1">{stat.desc}</div>
                    </div>
                ))}
            </div>

            {/* AWARDS TIMELINE CARDS */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">Presidential & National Recognition Timeline</h3>
                        <p className="text-xs text-slate-400">Chronological ledger of conferred national honours</p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                        ⭐ 5 Presidential Seerat Awards
                    </span>
                </div>

                <div className="p-6 space-y-4">
                    {awards.map((award, idx) => (
                        <div key={award.id} className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-300 transition-all">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-amber-500/20 shrink-0">
                                    🎖️
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-slate-900">{award.title}</h4>
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${award.badgeColor}`}>
                                            {award.category}
                                        </span>
                                    </div>
                                    <p className="text-xs font-semibold text-emerald-700 mt-1">{award.organization}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{award.book} • {award.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 self-end md:self-center">
                                <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-xs">
                                    Verified Record #{idx + 1}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
