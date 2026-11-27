'use client';

import { useState } from 'react';
import Link from 'next/link';
import { curatedQA, QAItem } from '@/data/qa';

export default function AskTheAuthorPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [expandedId, setExpandedId] = useState<number | null>(1); // First open by default

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        category: 'Spiritual Health',
        question: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const categories = ['All', 'Spiritual Health', 'Divine Destiny', 'Family & Brotherhood', 'Modern Life'];

    const filteredQA = curatedQA.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = searchQuery === '' || 
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', category: 'Spiritual Health', question: '' });
            setTimeout(() => setSubmitted(false), 6000);
        }, 1000);
    };

    return (
        <main className="bg-[#FAF7F2] min-h-screen text-[#1A1715] pt-32 sm:pt-40 pb-24 relative overflow-hidden">
            <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] block">
                        Community & Intellectual Discourse
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-[#1A1715] tracking-tight leading-tight">
                        Ask the <span className="text-[#7A1C1C] font-serif italic font-normal">Author</span>
                    </h1>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#7A1C1C] via-[#C5A059] to-transparent mx-auto rounded-full" />
                    <p className="text-[#554E48] text-sm sm:text-base font-light leading-relaxed">
                        Curated answers from Dr. Muhammad Salim on spiritual purification, divine destiny, brotherhood, and navigating modern ethical dilemmas.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-white border border-[#E3DBD0] p-4 sm:p-6 rounded-3xl shadow-xs space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions & topics..."
                                className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-2.5 text-xs text-[#1A1715] outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all placeholder:text-[#7A726A]"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-[#7A726A] hover:text-[#1A1715] text-xs cursor-pointer"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {/* Category Filter Pills */}
                        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                        selectedCategory === cat
                                            ? 'bg-[#7A1C1C] text-white shadow-xs'
                                            : 'bg-[#FAF7F2] text-[#554E48] border border-[#D9CEBA] hover:border-[#1A1715]'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Q&A Accordion List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#7A726A] px-1">
                        <span>Showing {filteredQA.length} Published Inquiry{filteredQA.length !== 1 ? 's' : ''}</span>
                        <span>Click question to expand scholarly response</span>
                    </div>

                    {filteredQA.length === 0 ? (
                        <div className="p-12 text-center bg-white rounded-3xl border border-[#E3DBD0] text-[#7A726A] text-sm">
                            No questions found matching your search. Try another keyword or submit your question below.
                        </div>
                    ) : (
                        filteredQA.map((item) => {
                            const isExpanded = expandedId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`border rounded-3xl transition-all duration-200 overflow-hidden ${
                                        isExpanded
                                            ? 'bg-white border-[#7A1C1C]/40 shadow-sm'
                                            : 'bg-white border-[#E3DBD0] hover:border-[#C5A059]/60'
                                    }`}
                                >
                                    {/* Question Header */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                        className="w-full p-6 sm:p-7 text-left flex items-start justify-between gap-4 cursor-pointer"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                                <span className="px-3 py-1 rounded-full font-mono text-[10px] uppercase font-bold bg-[#FAF7F2] text-[#7A1C1C] border border-[#E3DBD0]">
                                                    {item.category}
                                                </span>
                                                <span className="text-[#7A726A] font-mono text-[11px]">
                                                    Inquiry by {item.askedBy}
                                                </span>
                                            </div>
                                            <h2 className="text-base sm:text-lg font-bold text-[#1A1715] font-heading leading-snug">
                                                {item.question}
                                            </h2>
                                        </div>
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border transition-colors ${
                                            isExpanded ? 'bg-[#7A1C1C] text-white border-[#7A1C1C]' : 'bg-[#FAF7F2] text-[#554E48] border-[#D9CEBA]'
                                        }`}>
                                            {isExpanded ? '−' : '+'}
                                        </span>
                                    </button>

                                    {/* Answer Body (Accordion) */}
                                    {isExpanded && (
                                        <div className="px-6 sm:px-7 pb-7 pt-2 border-t border-[#EAE3D8] bg-[#FAF7F2]/60 space-y-4">
                                            <div className="flex items-center gap-2 pt-1 text-xs font-mono font-bold text-[#7A1C1C]">
                                                <span>✍️ Dr. Muhammad Salim's Response:</span>
                                            </div>
                                            <div className="text-[#443E38] text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                                                {item.answer}
                                            </div>

                                            {item.bookReference && (
                                                <div className="p-4 rounded-2xl bg-white border border-[#E3DBD0] flex items-center justify-between text-xs text-[#1A1715] shadow-2xs">
                                                    <span>
                                                        📖 Explored in: <strong>{item.bookReference.title}</strong>
                                                    </span>
                                                    <Link
                                                        href={`/books/${item.bookReference.bookId}`}
                                                        className="font-bold text-[#7A1C1C] hover:underline"
                                                    >
                                                        View Book Details →
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Question Submission Form */}
                <div className="mt-16 bg-white border border-[#E3DBD0] p-8 sm:p-12 rounded-3xl shadow-sm space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C]">
                            Submit Your Inquiry
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#1A1715]">
                            Ask Dr. Muhammad Salim a Question
                        </h2>
                        <p className="text-xs sm:text-sm text-[#554E48] font-light leading-relaxed">
                            Have a thoughtful question on moral philosophy, spiritual heart management, or family ethics? Share it with Dr. Salim's research circle. Selected questions are answered in published articles and updates.
                        </p>
                    </div>

                    {submitted ? (
                        <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center text-emerald-900 space-y-2">
                            <span className="text-2xl block">✓</span>
                            <div className="font-bold text-sm">Your question has been received.</div>
                            <p className="text-xs text-emerald-800 font-light">
                                Thank you for your inquiry. Dr. Salim reviews submissions for upcoming published responses and research pieces.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A726A]">Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Full name & City"
                                        className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-2.5 text-xs text-[#1A1715] outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A726A]">Your Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="email@example.com"
                                        className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-2.5 text-xs text-[#1A1715] outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A726A]">Topic Domain *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-2.5 text-xs text-[#1A1715] outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all"
                                >
                                    <option value="Spiritual Health">Spiritual Health & Heart Healing</option>
                                    <option value="Divine Destiny">Divine Destiny & Purpose</option>
                                    <option value="Family & Brotherhood">Family & Brotherhood</option>
                                    <option value="Modern Life">Modern Life & Ethical Dilemmas</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A726A]">Your Question *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="State your question clearly and respectfully..."
                                    className="w-full bg-[#FAF7F2] border border-[#D9CEBA] rounded-xl px-4 py-2.5 text-xs text-[#1A1715] outline-none focus:ring-2 focus:ring-[#7A1C1C]/20 focus:border-[#7A1C1C] transition-all resize-y"
                                />
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold text-xs uppercase tracking-widest shadow-xs transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting Question...' : 'Submit Question to Dr. Salim →'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            </div>
        </main>
    );
}
