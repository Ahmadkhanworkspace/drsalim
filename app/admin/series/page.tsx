'use client';

import { useState } from 'react';

export default function SeriesPage() {
    const [series] = useState([
        {
            id: '1',
            name: 'Divine Providence Theological Series',
            description: 'Comprehensive scholarly exploration of Rububiyah and Allah\'s divine providence across ontology & epistemology',
            books: ['Divine Providence Vol 1', 'Divine Providence Vol 2'],
            totalSales: 24,
            totalRevenue: 477,
            status: 'ongoing',
            badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
        },
        {
            id: '2',
            name: 'Spiritual Growth & Tazkiyah Collection',
            description: 'Essential guides for spiritual purification, diagnosing internal diseases, and moral development',
            books: ['Spiritual Diseases & Heart Remedies', 'Human Journey from Soul to Abode'],
            totalSales: 36,
            totalRevenue: 714,
            status: 'complete',
            badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        },
        {
            id: '3',
            name: 'Community & Islamic Ethics Library',
            description: 'Treatises on Islamic social harmony, brotherhood principles, and governance ethics',
            books: ['Brotherhood: Principles & Practice', 'Justice: An Islamic Perspective (Companion)'],
            totalSales: 58,
            totalRevenue: 1190,
            status: 'bestseller',
            badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        }
    ]);

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        📚 Book Series & Anthologies
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Organize volumes into multi-book thematic series and manage reading sequences
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Create New Series
                    </button>
                </div>
            </div>

            {/* Series Cards */}
            <div className="space-y-6">
                {series.map(s => (
                    <div key={s.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">{s.name}</h3>
                                <p className="text-xs text-slate-500 mt-1">{s.description}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto uppercase border ${s.badgeColor}`}>
                                {s.status}
                            </span>
                        </div>

                        {/* Series KPIs */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Included Volumes</div>
                                <div className="text-sm font-bold text-slate-800 mt-1 space-y-1">
                                    {s.books.map((b, i) => (
                                        <div key={i} className="flex items-center gap-1.5 text-xs">
                                            <span className="text-indigo-600 font-bold">#{i + 1}</span> {b}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Total Series Sales</div>
                                <div className="text-2xl font-extrabold text-slate-900 mt-1">
                                    {s.totalSales} <span className="text-xs font-normal text-slate-400">Copies</span>
                                </div>
                            </div>
                            <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Attributed Royalties</div>
                                <div className="text-2xl font-extrabold text-emerald-600 mt-1">
                                    ${s.totalRevenue} <span className="text-xs font-normal text-slate-400">USD</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 cursor-pointer">
                                Manage Reading Order
                            </button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 cursor-pointer">
                                Edit Series Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
