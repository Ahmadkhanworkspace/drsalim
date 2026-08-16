'use client';

export default function ReadingStatsPage() {
    const topBooks = [
        { title: 'Brotherhood: Principles & Practice', reads: 1247, completionRate: 78, avgTime: '4.2 hrs', color: '#4F46E5' },
        { title: 'Divine Providence: Understanding Rububiyah', reads: 892, completionRate: 65, avgTime: '5.8 hrs', color: '#06B6D4' },
        { title: 'Spiritual Diseases & Heart Remedies', reads: 654, completionRate: 82, avgTime: '3.5 hrs', color: '#10B981' },
        { title: 'Human Journey: Soul to Final Abode', reads: 423, completionRate: 71, avgTime: '4.0 hrs', color: '#F59E0B' },
        { title: 'Divine Providence Vol 2: Epistemology', reads: 243, completionRate: 80, avgTime: '5.1 hrs', color: '#8B5CF6' }
    ];

    const deviceStats = [
        { device: 'Mobile Phones (iOS & Android)', percentage: 62, reads: '2,145 sessions', color: '#3B82F6', icon: '📱' },
        { device: 'Desktop & Laptops', percentage: 28, reads: '968 sessions', color: '#10B981', icon: '💻' },
        { device: 'Kindle & E-Readers / Tablets', percentage: 10, reads: '346 sessions', color: '#8B5CF6', icon: '📖' },
    ];

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        📈 Reading Stats & Reader Insights
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Track chapter completions, average reading velocity, and reader device distribution
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Live Reader Analytics Active
                    </span>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Active Reads</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">3,459</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">▲ +22.4% this month</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Completion</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">74.2%</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">High Engagement</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Time Spent</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">4.4 hrs</div>
                    <div className="text-[10px] text-indigo-500 font-semibold mt-1">Deep Theological Reading</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Article Page Reads</div>
                    <div className="text-3xl font-extrabold text-purple-600 mt-1">1.22M</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">Across 10 Treatises</div>
                </div>
            </div>

            {/* TWO COLUMN CARDS: MOST READ BOOKS & DEVICE SESSIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Most Read Books */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Most Read Publications</h3>
                            <p className="text-xs text-slate-400">Total sessions and completion rates</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 font-mono">5 Books</span>
                    </div>

                    <div className="space-y-4 pt-2">
                        {topBooks.map((book, idx) => (
                            <div key={idx} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-900">{book.title}</span>
                                    <span className="font-mono font-bold text-emerald-600">{book.reads.toLocaleString()} reads</span>
                                </div>
                                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: `${book.completionRate}%`, backgroundColor: book.color }} />
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
                                    <span>{book.completionRate}% completion rate</span>
                                    <span>{book.avgTime} avg duration</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Reading by Device */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Device Distribution</h3>
                                <p className="text-xs text-slate-400">Where readers access your works</p>
                            </div>
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                                3.4K Users
                            </span>
                        </div>

                        <div className="space-y-4 pt-4">
                            {deviceStats.map((stat, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                                            <span>{stat.icon}</span> {stat.device}
                                        </span>
                                        <span className="font-bold text-slate-900">{stat.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }} />
                                    </div>
                                    <div className="text-[10px] text-slate-400 font-mono">{stat.reads}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900">
                        💡 <strong>Insight:</strong> 62% of readers access treatises on mobile. Mobile reading view is optimized with instant font adjustments.
                    </div>
                </div>

            </div>

        </div>
    );
}
