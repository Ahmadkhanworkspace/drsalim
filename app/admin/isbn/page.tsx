'use client';

export default function ISBNPage() {
    const books = [
        { id: 1, title: 'Brotherhood: Principles & Practice', isbn: '978-1-64746-892-3', publisher: 'Amazon KDP & Global', edition: '1st Edition', format: 'Paperback & Digital', pubDate: '2024-06-15', status: 'Registered' },
        { id: 2, title: 'Divine Providence: Understanding Rububiyah', isbn: '978-1-59184-567-8', publisher: 'Amazon KDP & Global', edition: '2nd Edition', format: 'Hardcover & Digital', pubDate: '2023-03-20', status: 'Registered' },
        { id: 3, title: 'Spiritual Diseases & Heart Remedies', isbn: '978-1-73521-094-2', publisher: 'Amazon KDP & Global', edition: '1st Edition', format: 'Paperback & Digital', pubDate: '2024-01-10', status: 'Registered' },
        { id: 4, title: 'Human Journey: Soul to Final Abode', isbn: '978-1-88345-721-6', publisher: 'Amazon KDP & Global', edition: '1st Edition', format: 'Digital Kindle & EPUB', pubDate: '2023-09-05', status: 'Registered' },
        { id: 5, title: 'Divine Providence Vol 2: Epistemology', isbn: '978-1-59184-893-5', publisher: 'Amazon KDP & Global', edition: '1st Edition', format: 'Paperback & Digital', pubDate: '2024-11-12', status: 'Registered' },
    ];

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🔖 ISBN & Publishing Registry
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        International Standard Book Numbers (ISBN-13), copyright records, and distribution formats
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Register New ISBN
                    </button>
                </div>
            </div>

            {/* Top 3 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registered ISBNs</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">5 Registered</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">100% Verified with Bowker</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Distribution</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">Worldwide</div>
                    <div className="text-[10px] text-indigo-500 font-semibold mt-1">Amazon, B&N, IngramSpark</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Formats Available</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">Print & Digital</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Paperback, Hardcover, Kindle</div>
                </div>
            </div>

            {/* ISBN Table */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">Official ISBN Registry</h3>
                        <p className="text-xs text-slate-400">Bibliographic registry for library indexing & retail</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="p-4">Book Title</th>
                                <th className="p-4">ISBN-13 Code</th>
                                <th className="p-4">Publisher</th>
                                <th className="p-4 text-center">Edition</th>
                                <th className="p-4 text-center">Format</th>
                                <th className="p-4 text-center">Pub Date</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {books.map(book => (
                                <tr key={book.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 font-bold text-slate-900">{book.title}</td>
                                    <td className="p-4 font-mono font-bold text-indigo-600">{book.isbn}</td>
                                    <td className="p-4 text-slate-600">{book.publisher}</td>
                                    <td className="p-4 text-center text-slate-700">{book.edition}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                            {book.format}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center font-mono text-slate-600">{book.pubDate}</td>
                                    <td className="p-4 text-right">
                                        <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                                            Manage Metadata
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
