'use client';

export default function PreviewsPage() {
    const previews = [
        { id: '1', bookTitle: 'Brotherhood: Principles & Practice', pages: 25, downloads: 342, conversions: 58, conversionRate: 17.0 },
        { id: '2', bookTitle: 'Divine Providence: Understanding Rububiyah', pages: 30, downloads: 289, conversions: 15, conversionRate: 5.2 },
        { id: '3', bookTitle: 'Spiritual Diseases & Heart Remedies', pages: 20, downloads: 215, conversions: 24, conversionRate: 11.2 },
        { id: '4', bookTitle: 'Human Journey: Soul to Final Abode', pages: 22, downloads: 98, conversions: 12, conversionRate: 12.2 },
        { id: '5', bookTitle: 'Divine Providence Vol 2: Epistemology', pages: 28, downloads: 67, conversions: 9, conversionRate: 13.4 },
    ];

    const totalDownloads = previews.reduce((sum, p) => sum + p.downloads, 0);
    const totalConversions = previews.reduce((sum, p) => sum + p.conversions, 0);
    const avgConversion = (totalConversions / totalDownloads) * 100;

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        👁️ Sample Chapters & Digital Previews
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Manage free sample chapters, PDF watermarks, and reader purchase conversions
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Upload Sample Chapter
                    </button>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Sample Reads</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalDownloads.toLocaleString()}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Reader Downloads</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Book Purchases</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">{totalConversions} Copies</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Direct from Previews</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">{avgConversion.toFixed(1)}%</div>
                    <div className="text-[10px] text-indigo-500 font-semibold mt-1">High Intent Readers</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Samples</div>
                    <div className="text-3xl font-extrabold text-purple-600 mt-1">5 Books</div>
                    <div className="text-[10px] text-purple-600 font-semibold mt-1">100% Coverage</div>
                </div>
            </div>

            {/* Previews Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">Active Book Sample Chapters</h3>
                        <p className="text-xs text-slate-400">PDF previews distributed across web and email landing pages</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="p-4">Book Title</th>
                                <th className="p-4 text-center">Sample Pages</th>
                                <th className="p-4 text-center">Downloads</th>
                                <th className="p-4 text-center">Purchases</th>
                                <th className="p-4 text-center">Conversion</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {previews.map((preview) => (
                                <tr key={preview.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 font-bold text-slate-900">{preview.bookTitle}</td>
                                    <td className="p-4 text-center font-mono text-slate-600">{preview.pages} pages</td>
                                    <td className="p-4 text-center font-mono font-bold text-slate-800">{preview.downloads}</td>
                                    <td className="p-4 text-center font-mono font-bold text-emerald-600">{preview.conversions} sold</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold font-mono text-xs border border-emerald-200">
                                            {preview.conversionRate.toFixed(1)}%
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                            Edit
                                        </button>
                                        <button className="px-3 py-1 bg-indigo-50 border border-indigo-200 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-100 cursor-pointer">
                                            Download PDF
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
