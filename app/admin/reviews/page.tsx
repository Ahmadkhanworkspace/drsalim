'use client';

import { useState } from 'react';

interface Review {
    id: string;
    bookTitle: string;
    bookId: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    featured: boolean;
}

export default function ReviewsPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [reviews, setReviews] = useState<Review[]>([
        { id: '1', bookTitle: 'Brotherhood', bookId: 4, author: 'Ahmed Khan', rating: 5, comment: 'Absolutely transformative! This book changed my understanding of community and brotherhood in Islam. Dr. Salim\'s insights are profound and practical.', date: '2026-01-05', status: 'approved', featured: true },
        { id: '2', bookTitle: 'Brotherhood', bookId: 4, author: 'Fatima Ali', rating: 5, comment: 'A must-read for anyone seeking to strengthen their bonds with fellow Muslims. The examples are relatable and the guidance is clear.', date: '2026-01-04', status: 'approved', featured: false },
        { id: '3', bookTitle: 'Divine Providence', bookId: 1, author: 'Omar Hassan', rating: 4, comment: 'Deep theological insights presented in an accessible way. Some sections require multiple readings to fully grasp.', date: '2026-01-03', status: 'approved', featured: true },
        { id: '4', bookTitle: 'Spiritual Diseases', bookId: 5, author: 'Aisha Rahman', rating: 5, comment: 'This book is like a mirror for the soul. It helped me identify and work on my spiritual weaknesses. Highly recommended!', date: '2026-01-02', status: 'pending', featured: false },
        { id: '5', bookTitle: 'Human Journey', bookId: 2, author: 'Yusuf Ibrahim', rating: 4, comment: 'Thought-provoking exploration of life\'s purpose. The philosophical depth is impressive.', date: '2026-01-01', status: 'pending', featured: false },
        { id: '6', bookTitle: 'Brotherhood', bookId: 4, author: 'Maryam Siddiqui', rating: 3, comment: 'Good content but could be more concise. Some repetition in the middle chapters.', date: '2025-12-30', status: 'rejected', featured: false },
        { id: '7', bookTitle: 'Divine Providence', bookId: 1, author: 'Hassan Malik', rating: 5, comment: 'Dr. Salim\'s explanation of Rububiyah is unparalleled. This book deepened my faith and understanding of Allah\'s divine providence in every aspect of life.', date: '2025-12-29', status: 'approved', featured: true },
        { id: '8', bookTitle: 'Spiritual Diseases', bookId: 5, author: 'Zainab Ahmed', rating: 5, comment: 'A practical guide to spiritual purification. The remedies provided are actionable and rooted in authentic Islamic teachings. Every Muslim should read this!', date: '2025-12-28', status: 'approved', featured: false },
    ]);

    const stats = {
        total: reviews.length,
        pending: reviews.filter(r => r.status === 'pending').length,
        approved: reviews.filter(r => r.status === 'approved').length,
        rejected: reviews.filter(r => r.status === 'rejected').length,
        avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    };

    const handleApprove = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    };

    const handleReject = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    };

    const handleToggleFeatured = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
    };

    const filteredReviews = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab);

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        ⭐ Reviews & Reader Feedback
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Moderate customer book ratings, testimonials, and verified purchase reviews
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                        <span>★</span> Average Rating: {stats.avgRating} / 5.0
                    </span>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Reviews</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">{stats.total}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Verified Readers</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pending Approval</div>
                    <div className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending}</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">Needs Moderation</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Approved Reviews</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.approved}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Public on Store</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Average Star Rating</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">{stats.avgRating} ★</div>
                    <div className="text-[10px] text-indigo-500 font-semibold mt-1">Across 5 Publications</div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto bg-white p-2 rounded-2xl shadow-xs">
                {[
                    { id: 'all', label: 'All Reviews', count: stats.total },
                    { id: 'pending', label: 'Pending', count: stats.pending, badgeColor: 'bg-amber-100 text-amber-800' },
                    { id: 'approved', label: 'Approved', count: stats.approved, badgeColor: 'bg-emerald-100 text-emerald-800' },
                    { id: 'rejected', label: 'Rejected', count: stats.rejected, badgeColor: 'bg-rose-100 text-rose-800' },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        <span>{tab.label}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${activeTab === tab.id ? 'bg-white/20 text-white' : tab.badgeColor || 'bg-slate-100 text-slate-700'}`}>
                            {tab.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-4">
                {filteredReviews.map(review => (
                    <div key={review.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                    {review.author.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                                        <span className="text-amber-500 text-xs font-bold">
                                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 font-mono">{review.bookTitle} • {review.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    review.status === 'approved' 
                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                        : review.status === 'pending'
                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                                }`}>
                                    {review.status.toUpperCase()}
                                </span>
                                {review.featured && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                                        FEATURED
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-slate-700 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border border-slate-100">
                            "{review.comment}"
                        </p>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button
                                onClick={() => handleToggleFeatured(review.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                                    review.featured 
                                        ? 'border-purple-300 bg-purple-50 text-purple-700' 
                                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {review.featured ? '★ Featured' : '☆ Feature Review'}
                            </button>
                            {review.status !== 'approved' && (
                                <button
                                    onClick={() => handleApprove(review.id)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
                                >
                                    ✓ Approve
                                </button>
                            )}
                            {review.status !== 'rejected' && (
                                <button
                                    onClick={() => handleReject(review.id)}
                                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all cursor-pointer"
                                >
                                    ✕ Reject
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
