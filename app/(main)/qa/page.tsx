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
        <main className="bg-white min-h-screen text-stone-900 pt-32 sm:pt-40 pb-24 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-amber-100/40 rounded-full blur-[140px] pointer-events-none z-0" />

            <div className="container relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Header Section */}
                <div className="text-center space-y-3 max-w-3xl mx-auto">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 block">
                        Community & Intellectual Discourse
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-stone-900 tracking-tight leading-tight">
                        Ask the <span className="text-crimson-800 font-serif italic font-normal">Author</span>
                    </h1>
                    <div className="w-16 h-1 bg-crimson-800 mx-auto rounded-full" />
                    <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                        Curated answers from Dr. Muhammad Salim on spiritual purification, divine destiny, brotherhood, and navigating modern ethical dilemmas.
                    </p>
                </div>

                {/* Filter and Search Bar */}
                <div className="bg-stone-50 border border-stone-200/90 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search questions & topics..."
                                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all placeholder:text-stone-400"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700 text-xs cursor-pointer"
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
                                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                        selectedCategory === cat
                                            ? 'bg-crimson-800 text-white shadow-xs'
                                            : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
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
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500 px-1">
                        <span>Showing {filteredQA.length} Published Question{filteredQA.length !== 1 ? 's' : ''}</span>
                        <span>Click question to read answer</span>
                    </div>

                    {filteredQA.length === 0 ? (
                        <div className="p-12 text-center bg-stone-50 rounded-2xl border border-stone-200 text-stone-500 text-sm">
                            No questions found matching your search. Try another keyword or submit your question below.
                        </div>
                    ) : (
                        filteredQA.map((item) => {
                            const isExpanded = expandedId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                                        isExpanded
                                            ? 'bg-white border-crimson-700/40 shadow-sm'
                                            : 'bg-white border-stone-200 hover:border-stone-300'
                                    }`}
                                >
                                    {/* Question Header */}
                                    <button
                                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                        className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer"
                                    >
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-2 text-xs">
                                                <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] uppercase font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                                    {item.category}
                                                </span>
                                                <span className="text-stone-400 font-mono text-[11px]">
                                                    Asked by {item.askedBy}
                                                </span>
                                            </div>
                                            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-heading leading-snug">
                                                {item.question}
                                            </h2>
                                        </div>
                                        <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold border transition-colors ${
                                            isExpanded ? 'bg-crimson-800 text-white border-crimson-800' : 'bg-stone-100 text-stone-600 border-stone-200'
                                        }`}>
                                            {isExpanded ? '−' : '+'}
                                        </span>
                                    </button>

                                    {/* Answer Body (Accordion) */}
                                    {isExpanded && (
                                        <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4">
                                            <div className="flex items-center gap-2 pt-1 text-xs font-mono font-bold text-crimson-800">
                                                <span>✍️ Dr. Muhammad Salim's Response:</span>
                                            </div>
                                            <div className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light">
                                                {item.answer}
                                            </div>

                                            {item.bookReference && (
                                                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between text-xs text-amber-950">
                                                    <span>
                                                        📖 Explored in: <strong>{item.bookReference.title}</strong>
                                                    </span>
                                                    <Link
                                                        href={`/books/${item.bookReference.bookId}`}
                                                        className="font-bold text-crimson-800 hover:underline"
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
                <div className="mt-16 bg-gradient-to-br from-stone-50 to-white border border-stone-200/90 p-6 sm:p-10 md:p-12 rounded-3xl shadow-sm space-y-6">
                    <div className="text-center max-w-xl mx-auto space-y-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800">
                            Submit Your Inquiry
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-stone-900">
                            Ask Dr. Muhammad Salim a Question
                        </h2>
                        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
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
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Name *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Full name & City"
                                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Email *</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="email@example.com"
                                        className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Topic Domain *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all"
                                >
                                    <option value="Spiritual Health">Spiritual Health & Heart Healing</option>
                                    <option value="Divine Destiny">Divine Destiny & Purpose</option>
                                    <option value="Family & Brotherhood">Family & Brotherhood</option>
                                    <option value="Modern Life">Modern Life & Ethical Dilemmas</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Question *</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="State your question clearly and respectfully..."
                                    className="w-full bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all resize-y"
                                />
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-8 py-3 rounded-xl bg-crimson-800 hover:bg-crimson-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-50"
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
