'use client';

export default function CoversPage() {
    const books = [
        {
            id: 1,
            title: 'Brotherhood: Principles & Practice',
            covers: [
                { id: 'c1', name: 'Original Scholarly Edition', active: true, performance: 94, clicks: 1247, conversions: 58 },
                { id: 'c2', name: 'Minimalist Modern Hardcover', active: false, performance: 78, clicks: 892, conversions: 32 },
                { id: 'c3', name: 'Gold Foil Collector Edition', active: false, performance: 85, clicks: 1054, conversions: 41 }
            ]
        },
        {
            id: 2,
            title: 'Divine Providence: Understanding Rububiyah',
            covers: [
                { id: 'c4', name: 'Classic Gold Calligraphy', active: true, performance: 88, clicks: 756, conversions: 15 },
                { id: 'c5', name: 'Contemporary Philosophical Blue', active: false, performance: 72, clicks: 543, conversions: 8 }
            ]
        },
        {
            id: 3,
            title: 'Spiritual Diseases & Heart Remedies',
            covers: [
                { id: 'c6', name: 'Standard Emerald Green Cover', active: true, performance: 91, clicks: 654, conversions: 24 }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🎨 Book Cover A/B Testing & Variations
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Manage high-resolution jacket art, A/B conversion tests, and collector foil editions
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Upload Cover Variation
                    </button>
                </div>
            </div>

            {/* Books Cover Grid */}
            <div className="space-y-6">
                {books.map(book => (
                    <div key={book.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <h3 className="text-base font-bold text-slate-900">{book.title}</h3>
                            <span className="text-xs font-mono font-bold text-indigo-600">{book.covers.length} Variations</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            {book.covers.map(cover => (
                                <div 
                                    key={cover.id} 
                                    className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                                        cover.active 
                                            ? 'bg-indigo-50/40 border-indigo-300 ring-2 ring-indigo-500/10' 
                                            : 'bg-slate-50 border-slate-200'
                                    }`}
                                >
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-xs font-bold text-slate-900">{cover.name}</h4>
                                            {cover.active ? (
                                                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                                    LIVE ACTIVE
                                                </span>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[9px] font-bold">
                                                    IN TESTING
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
                                            <div className="p-2 bg-white rounded-xl border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400">CTR Score</div>
                                                <div className="text-sm font-extrabold text-emerald-600 mt-0.5">{cover.performance}%</div>
                                            </div>
                                            <div className="p-2 bg-white rounded-xl border border-slate-100">
                                                <div className="text-[9px] font-bold text-slate-400">Purchases</div>
                                                <div className="text-sm font-extrabold text-indigo-600 mt-0.5">{cover.conversions} sold</div>
                                            </div>
                                        </div>
                                    </div>

                                    <button className={`w-full py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                        cover.active 
                                            ? 'bg-emerald-600 text-white' 
                                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}>
                                        {cover.active ? '✓ Set as Primary Cover' : 'Switch to this Cover'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
