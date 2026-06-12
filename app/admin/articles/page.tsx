'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getArticles, deleteArticle } from '@/app/lib/actions';
import { Article } from '@/data/articles';

interface AdminArticle extends Article {
    published?: boolean;
    createdAt?: string;
}

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<AdminArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const refreshArticles = async () => {
        setLoading(true);
        try {
            const data = await getArticles();
            const mappedData: AdminArticle[] = data.map(a => ({
                ...a,
                published: true, // Default to true
                createdAt: a.date
            }));
            setArticles(mappedData);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshArticles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this article? This cannot be undone.')) return;
        try {
            const res = await deleteArticle(id);
            if (res.success) {
                setArticles(prev => prev.filter(a => a.id !== id));
            } else {
                alert('Failed to delete article');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting article');
        }
    };

    // Metrics
    const publishedCount = articles.filter(a => a.published).length;
    const draftCount = articles.filter(a => !a.published).length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

    // List of unique categories for filtering
    const categories = Array.from(new Set(articles.map(a => a.category).filter(Boolean)));

    // Client-side search & filter
    const filteredArticles = articles.filter(article => {
        const matchesQuery = 
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (article.category && article.category.toLowerCase().includes(searchQuery.toLowerCase()));
            
        const matchesCategory = 
            categoryFilter === 'all' || 
            article.category === categoryFilter;

        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'published' && article.published) || 
            (statusFilter === 'draft' && !article.published);

        return matchesQuery && matchesCategory && matchesStatus;
    });

    // Pagination calculations
    const totalPages = Math.ceil(filteredArticles.length / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + pageSize);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, categoryFilter, statusFilter, pageSize]);

    return (
        <div className="space-y-6">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Articles Management</h1>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">Create, draft, edit, and publish scholarly essays and blog analysis</p>
                </div>
                <button
                    onClick={() => router.push('/admin/articles/new')}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/10"
                    style={{ borderRadius: '8px !important' }}
                >
                    ✍️ Write New Article
                </button>
            </div>

            {/* Metrics Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Published Essays', count: publishedCount, color: 'border-green-500 dark:border-green-655 text-green-600 dark:text-green-500' },
                    { label: 'Drafts', count: draftCount, color: 'border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300' },
                    { label: 'Total Views', count: totalViews.toLocaleString(), color: 'border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-500' }
                ].map((card, idx) => (
                    <div 
                        key={idx} 
                        className={`p-5 bg-white dark:bg-slate-900 border-l-4 ${card.color} border border-slate-200 dark:border-slate-800 shadow-sm`}
                        style={{ borderRadius: '12px !important' }}
                    >
                        <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 dark:text-slate-500">{card.label}</div>
                        <div className="text-3xl font-black mt-2 leading-none">{card.count}</div>
                    </div>
                ))}
            </div>

            {/* DATAGRID CONTAINER */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm" style={{ borderRadius: '16px !important' }}>
                
                {/* Search, Filter Toolbar */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        <div className="relative w-full max-w-xs">
                            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search title or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white text-slate-800 dark:text-slate-100 outline-none"
                                style={{ borderRadius: '8px !important' }}
                            />
                        </div>

                        {/* Category Select Filter */}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="py-2 px-3 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none"
                            style={{ borderRadius: '8px !important' }}
                        >
                            <option value="all">All Categories</option>
                            {categories.map((cat, idx) => (
                                <option key={idx} value={cat}>{cat}</option>
                            ))}
                        </select>

                        {/* Status Select Filter */}
                        <select
                            value={statusFilter}
                            onChange={(e: any) => setStatusFilter(e.target.value)}
                            className="py-2 px-3 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none"
                            style={{ borderRadius: '8px !important' }}
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>

                    <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold shrink-0">
                        {filteredArticles.length} articles found
                    </div>
                </div>

                {/* Table DataGrid View */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10">
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider pl-6 py-3">Article Title</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Category</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Status</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider text-center">Views</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider text-center">Comments</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400 dark:text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs font-semibold">Fetching articles library...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedArticles.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-xs font-semibold text-slate-400 dark:text-slate-500">
                                        No articles found.
                                    </td>
                                </tr>
                            ) : (
                                paginatedArticles.map(article => (
                                    <tr 
                                        key={article.id}
                                        className="hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all duration-150"
                                    >
                                        <td className="pl-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Article Miniature Badge */}
                                                <div 
                                                    className="w-10 h-10 bg-gradient-to-br from-amber-500/10 to-amber-700/5 text-amber-600 dark:text-amber-500 border border-amber-500/10 flex items-center justify-center text-sm shrink-0 font-serif"
                                                    style={{ borderRadius: '8px !important' }}
                                                >
                                                    ✍️
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-bold text-slate-850 dark:text-slate-100 truncate max-w-xs md:max-w-md">{article.title}</div>
                                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{article.createdAt}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="inline-block px-2.5 py-1 text-[10px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-150 dark:border-slate-850" style={{ borderRadius: '6px !important' }}>
                                                {article.category}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider
                                                             ${article.published 
                                                             ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/50' 
                                                             : 'bg-slate-50 text-slate-650 border border-slate-200 dark:bg-slate-950/20 dark:text-slate-450 dark:border-slate-850'}`}
                                                  style={{ borderRadius: '4px !important' }}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${article.published ? 'bg-green-500' : 'bg-slate-400'}`} />
                                                {article.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            {article.views.toLocaleString()}
                                        </td>
                                        <td className="text-xs font-bold text-slate-700 dark:text-slate-300 text-center">
                                            {article.comments}
                                        </td>
                                        <td className="pr-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => router.push(`/admin/articles/${article.id}`)}
                                                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-blue-600 hover:text-white dark:bg-slate-800 dark:hover:bg-blue-600 text-slate-600 dark:text-slate-300 text-[10px] font-bold transition-all border border-slate-200 dark:border-slate-750"
                                                    style={{ borderRadius: '6px !important' }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(article.id)}
                                                    className="px-2.5 py-1.5 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-600 dark:bg-red-950/10 border border-red-500/10 hover:border-red-500 text-[10px] font-bold transition-all"
                                                    style={{ borderRadius: '6px !important' }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Stripe-style Pagination Footer */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    {/* Rows Info */}
                    <div className="text-slate-400 dark:text-slate-500 font-semibold">
                        Showing <span className="text-slate-700 dark:text-slate-350">{Math.min(startIndex + 1, filteredArticles.length)}</span> to{' '}
                        <span className="text-slate-700 dark:text-slate-350">{Math.min(startIndex + pageSize, filteredArticles.length)}</span> of{' '}
                        <span className="text-slate-700 dark:text-slate-350">{filteredArticles.length}</span> articles
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500">
                            <span>Rows per page:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-1 px-1.5"
                                style={{ borderRadius: '6px !important' }}
                            >
                                {[5, 10, 20].map(sz => (
                                    <option key={sz} value={sz}>{sz}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ borderRadius: '6px !important' }}
                            >
                                Previous
                            </button>
                            <span className="px-3 text-slate-400 dark:text-slate-500">
                                Page <strong className="text-slate-700 dark:text-slate-350">{currentPage}</strong> of <strong>{totalPages}</strong>
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ borderRadius: '6px !important' }}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Guidelines / Tips Info Section */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" style={{ borderRadius: '16px !important' }}>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    💡 Editorial Guidelines
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    <div className="space-y-1.5">
                        <p>✓ Draft layout supports custom cover thumbnails & featured images.</p>
                        <p>✓ Rich text editor supports inline quote styling, headings, and lists.</p>
                        <p>✓ SEO fields are automatically extracted for title tags and meta tags.</p>
                    </div>
                    <div className="space-y-1.5">
                        <p>✓ Comments count points to the reader response table for moderation.</p>
                        <p>✓ Ensure category labels match public section taxonomy (e.g. Blog, Books).</p>
                        <p>✓ Draft status prevents public readers from loading unfinished drafts.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
