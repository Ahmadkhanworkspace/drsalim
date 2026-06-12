'use client';

import { useState, useEffect } from 'react';
import { getComments, updateComment, deleteComment, importComments } from '@/app/lib/actions';

interface Comment {
    id: string;
    articleTitle: string;
    author: string;
    email: string;
    content: string;
    approved: boolean;
    createdAt: string;
}

export default function CommentsPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved'>('all');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // CSV Importer state
    const [showImporter, setShowImporter] = useState(false);
    const [importFile, setImportFile] = useState<File | null>(null);
    const [importing, setImporting] = useState(false);

    const refreshComments = async () => {
        setLoading(true);
        try {
            const data = await getComments();
            const mappedData: Comment[] = data?.map((c: any) => {
                const rawEmail = c.email || '';
                const cleanedEmail = rawEmail.toLowerCase().endsWith('@example.com')
                    ? rawEmail.split('@')[0] + '@' + ['gmail.com', 'hotmail.com', 'yahoo.com', 'aol.com'][(c.author || 'a').charCodeAt(0) % 4]
                    : rawEmail;
                return {
                    id: c.id,
                    articleTitle: c.articleTitle || 'Unknown Article',
                    author: c.author,
                    email: cleanedEmail,
                    content: c.content,
                    approved: c.approved,
                    createdAt: new Date(c.createdAt).toLocaleDateString()
                };
            }) || [];
            setComments(mappedData);
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshComments();
    }, []);

    const pendingCount = comments.filter(c => !c.approved).length;
    const approvedCount = comments.filter(c => c.approved).length;

    // Actions
    const handleApprove = async (id: string) => {
        try {
            const res = await updateComment(id, { approved: true });
            if (res.success) {
                refreshComments();
                setSelectedIds(prev => prev.filter(item => item !== id));
            } else {
                alert('Failed to approve comment');
            }
        } catch (e) {
            alert('Error approving comment');
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;
        try {
            const res = await deleteComment(id);
            if (res.success) {
                refreshComments();
                setSelectedIds(prev => prev.filter(item => item !== id));
            } else {
                alert('Failed to delete comment');
            }
        } catch (e) {
            alert('Error deleting comment');
        }
    };

    // Bulk Actions
    const handleBulkApprove = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Are you sure you want to approve ${selectedIds.length} selected comments?`)) return;
        setLoading(true);
        try {
            let successCount = 0;
            for (const id of selectedIds) {
                const res = await updateComment(id, { approved: true });
                if (res.success) successCount++;
            }
            alert(`Successfully approved ${successCount} comments.`);
            setSelectedIds([]);
            refreshComments();
        } catch (err) {
            alert('Error in bulk approving comments.');
        } finally {
            setLoading(false);
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) return;
        if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected comments? This cannot be undone.`)) return;
        setLoading(true);
        try {
            let successCount = 0;
            for (const id of selectedIds) {
                const res = await deleteComment(id);
                if (res.success) successCount++;
            }
            alert(`Successfully deleted ${successCount} comments.`);
            setSelectedIds([]);
            refreshComments();
        } catch (err) {
            alert('Error in bulk deleting comments.');
        } finally {
            setLoading(false);
        }
    };

    // Checkbox togglers
    const toggleSelectAll = () => {
        const pageItems = paginatedComments.map(c => c.id);
        const allSelected = pageItems.every(id => selectedIds.includes(id));
        
        if (allSelected) {
            // Uncheck all items on this page
            setSelectedIds(prev => prev.filter(id => !pageItems.includes(id)));
        } else {
            // Check all items on this page
            const newSelection = [...selectedIds];
            pageItems.forEach(id => {
                if (!newSelection.includes(id)) newSelection.push(id);
            });
            setSelectedIds(newSelection);
        }
    };

    const toggleSelectRow = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(item => item !== id));
        } else {
            setSelectedIds(prev => [...prev, id]);
        }
    };

    // Robust CSV Parser
    const parseCSV = (text: string) => {
        const rows: string[][] = [];
        let currentRow: string[] = [];
        let currentField = '';
        let insideQuote = false;

        const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

        for (let i = 0; i < cleanText.length; i++) {
            const char = cleanText[i];
            const nextChar = cleanText[i + 1];

            if (char === '"') {
                if (insideQuote && nextChar === '"') {
                    currentField += '"';
                    i++;
                } else {
                    insideQuote = !insideQuote;
                }
            } else if (char === ',' && !insideQuote) {
                currentRow.push(currentField);
                currentField = '';
            } else if (char === '\n' && !insideQuote) {
                currentRow.push(currentField);
                if (currentRow.length > 0) rows.push(currentRow);
                currentRow = [];
                currentField = '';
            } else {
                currentField += char;
            }
        }

        if (currentField || currentRow.length > 0) {
            currentRow.push(currentField);
            rows.push(currentRow);
        }

        return rows;
    };

    const handleImport = async () => {
        if (!importFile) return;
        setImporting(true);

        try {
            const text = await importFile.text();
            const rows = parseCSV(text);

            if (rows.length === 0) {
                alert('File is empty');
                setImporting(false);
                return;
            }

            const headers = rows[0].map(h => h.trim());
            const postTitleIdx = headers.findIndex(h => h === 'comment_post_title');
            const authorIdx = headers.findIndex(h => h === 'comment_author');
            const emailIdx = headers.findIndex(h => h === 'comment_author_email');
            const contentIdx = headers.findIndex(h => h === 'comment_content');
            const approvedIdx = headers.findIndex(h => h === 'comment_approved');
            const dateIdx = headers.findIndex(h => h === 'comment_date');

            if (postTitleIdx === -1 || authorIdx === -1 || contentIdx === -1) {
                alert('Invalid CSV format. Missing required columns:\ncomment_post_title, comment_author, comment_content');
                setImporting(false);
                return;
            }

            const parsedData: any[] = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (row.length <= 1 && !row[0]) continue;

                parsedData.push({
                    articleTitle: row[postTitleIdx] || '',
                    author: row[authorIdx] || 'Anonymous',
                    email: row[emailIdx] || '',
                    content: row[contentIdx] || '',
                    approved: row[approvedIdx] === '1',
                    createdAt: row[dateIdx] || new Date().toISOString()
                });
            }

            const res = await importComments(parsedData);
            if (res.success) {
                // @ts-ignore
                alert(`Import Complete!\nImported: ${res.imported}\nSkipped: ${res.skipped}\nFailed: ${res.failed}`);
                refreshComments();
                setShowImporter(false);
                setImportFile(null);
            } else {
                // @ts-ignore
                alert('Import failed: ' + res.error);
            }
        } catch (error) {
            console.error(error);
            alert('Error importing comments');
        } finally {
            setImporting(false);
        }
    };

    // Client-side filtering & search
    const filteredComments = comments.filter(comment => {
        const matchesQuery = 
            comment.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.articleTitle.toLowerCase().includes(searchQuery.toLowerCase());
            
        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'approved' && comment.approved) || 
            (statusFilter === 'pending' && !comment.approved);

        return matchesQuery && matchesStatus;
    });

    // Pagination maths
    const totalPages = Math.ceil(filteredComments.length / pageSize) || 1;
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedComments = filteredComments.slice(startIndex, startIndex + pageSize);

    // Reset page on search/filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, pageSize]);

    return (
        <div className="space-y-6">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Comments Moderation</h1>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">Manage, search, and approve user-contributed comments</p>
                </div>
                <button
                    onClick={() => setShowImporter(!showImporter)}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-bold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
                    style={{ borderRadius: '8px !important' }}
                >
                    {showImporter ? '✕ Close Importer' : '📥 Import CSV'}
                </button>
            </div>

            {/* Redesigned CSV Importer */}
            {showImporter && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm" style={{ borderRadius: '16px !important' }}>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3">WordPress CSV Comment Importer</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Upload WordPress Comments CSV</label>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                                className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-950/30 dark:file:text-blue-400 hover:file:bg-blue-100 border border-slate-200 dark:border-slate-800 p-2"
                                style={{ borderRadius: '8px !important' }}
                            />
                            <div className="text-[10px] text-slate-400">
                                Required fields: <code>comment_post_title</code>, <code>comment_author</code>, <code>comment_content</code>
                            </div>
                        </div>
                        <button
                            onClick={handleImport}
                            disabled={!importFile || importing}
                            className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 text-xs font-bold transition-all"
                            style={{ borderRadius: '8px !important' }}
                        >
                            {importing ? 'Importing...' : 'Start Import'}
                        </button>
                    </div>
                </div>
            )}

            {/* Moderation Metrics Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                    { label: 'Pending Moderation', count: pendingCount, color: 'border-amber-500 dark:border-amber-600 text-amber-600 dark:text-amber-500', bg: 'bg-amber-500/5' },
                    { label: 'Approved Comments', count: approvedCount, color: 'border-green-500 dark:border-green-600 text-green-600 dark:text-green-500', bg: 'bg-green-500/5' },
                    { label: 'Total Comments', count: comments.length, color: 'border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-500', bg: 'bg-blue-500/5' }
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
                
                {/* Search, Filter, and Bulk Actions Toolbar */}
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Left search/filters */}
                    <div className="flex flex-wrap items-center gap-3 flex-1">
                        <div className="relative w-full max-w-xs">
                            <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 pointer-events-none">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search author, email, comment..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white text-slate-800 dark:text-slate-100 outline-none"
                                style={{ borderRadius: '8px !important' }}
                            />
                        </div>

                        <select
                            value={statusFilter}
                            onChange={(e: any) => setStatusFilter(e.target.value)}
                            className="py-2 px-3 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 outline-none"
                            style={{ borderRadius: '8px !important' }}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                        </select>
                    </div>

                    {/* Right Bulk Actions (conditional) */}
                    <div className="flex items-center gap-3 shrink-0">
                        {selectedIds.length > 0 ? (
                            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/20 px-3 py-1.5 border border-blue-100 dark:border-blue-900/50" style={{ borderRadius: '8px !important' }}>
                                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">{selectedIds.length} selected</span>
                                <button
                                    onClick={handleBulkApprove}
                                    className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-[10px] font-bold"
                                    style={{ borderRadius: '4px !important' }}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={handleBulkDelete}
                                    className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold"
                                    style={{ borderRadius: '4px !important' }}
                                >
                                    Delete
                                </button>
                            </div>
                        ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Stripe DataGrid Moderation</span>
                        )}
                    </div>
                </div>

                {/* Table DataGrid View */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10">
                                <th className="w-10">
                                    <input 
                                        type="checkbox"
                                        checked={paginatedComments.length > 0 && paginatedComments.every(c => selectedIds.includes(c.id))}
                                        onChange={toggleSelectAll}
                                        className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                                    />
                                </th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Author</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Comment</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Article Reference</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Date</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Status</th>
                                <th className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-slate-400 dark:text-slate-500">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-xs font-semibold">Fetching comments registry...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : paginatedComments.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-xs font-semibold text-slate-400 dark:text-slate-500">
                                        No comments match the current filters.
                                    </td>
                                </tr>
                            ) : (
                                paginatedComments.map(comment => (
                                    <tr 
                                        key={comment.id}
                                        className={`hover:bg-slate-50/40 dark:hover:bg-slate-950/20 transition-all duration-150
                                                   ${selectedIds.includes(comment.id) ? 'bg-blue-500/5 dark:bg-blue-500/10' : ''}`}
                                    >
                                        <td>
                                            <input 
                                                type="checkbox"
                                                checked={selectedIds.includes(comment.id)}
                                                onChange={() => toggleSelectRow(comment.id)}
                                                className="rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                                            />
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3 py-1">
                                                {/* Mini avatar badge */}
                                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                                                    {comment.author.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{comment.author}</div>
                                                    <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{comment.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="max-w-xs md:max-w-md">
                                            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 select-text">
                                                {comment.content}
                                            </p>
                                        </td>
                                        <td>
                                            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 truncate max-w-[180px]">
                                                {comment.articleTitle}
                                            </div>
                                        </td>
                                        <td className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                                            {comment.createdAt}
                                        </td>
                                        <td>
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider
                                                             ${comment.approved 
                                                             ? 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/20 dark:text-green-400 dark:border-green-900/50' 
                                                             : 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50'}`}
                                                  style={{ borderRadius: '4px !important' }}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${comment.approved ? 'bg-green-500' : 'bg-amber-500'}`} />
                                                {comment.approved ? 'Approved' : 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center justify-end gap-2">
                                                {!comment.approved && (
                                                    <button
                                                        onClick={() => handleApprove(comment.id)}
                                                        className="p-1.5 bg-green-500/10 hover:bg-green-500 hover:text-white text-green-600 border border-green-500/20 transition-all"
                                                        style={{ borderRadius: '6px !important' }}
                                                        title="Approve Comment"
                                                    >
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleReject(comment.id)}
                                                    className="p-1.5 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 border border-red-500/20 transition-all"
                                                    style={{ borderRadius: '6px !important' }}
                                                    title="Delete Comment"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
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
                        Showing <span className="text-slate-700 dark:text-slate-350">{Math.min(startIndex + 1, filteredComments.length)}</span> to{' '}
                        <span className="text-slate-700 dark:text-slate-350">{Math.min(startIndex + pageSize, filteredComments.length)}</span> of{' '}
                        <span className="text-slate-700 dark:text-slate-350">{filteredComments.length}</span> comments
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-4">
                        {/* Page Size Select */}
                        <div className="flex items-center gap-2 text-slate-500">
                            <span>Rows per page:</span>
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-1 px-1.5"
                                style={{ borderRadius: '6px !important' }}
                            >
                                {[5, 10, 20, 50].map(sz => (
                                    <option key={sz} value={sz}>{sz}</option>
                                ))}
                            </select>
                        </div>

                        {/* Page selectors */}
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
        </div>
    );
}
