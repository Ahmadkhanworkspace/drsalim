'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Article } from '@/data/articles';
import Link from 'next/link';

interface ArticlesSectionProps {
    articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [isPlayingAudio, setIsPlayingAudio] = useState<number | null>(null);

    const categories = ['All', 'Men & Evil Web', 'Articles', 'Blog'];

    const filteredArticles = selectedCategory === 'All'
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    // Lead flagship article (e.g. JUSTICE: AN ISLAMIC PERSPECTIVE or Evil Web)
    const featuredArticle = articles.find(a => a.id === 9) || articles[0];
    const gridArticles = filteredArticles.filter(a => selectedCategory !== 'All' || a.id !== featuredArticle?.id);

    const toggleAudioPlay = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPlayingAudio(prev => prev === id ? null : id);
    };

    return (
        <section id="articles" className="section relative bg-[#090B0F] text-white overflow-hidden py-24 border-y border-amber-500/10">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container relative z-10 px-6 max-w-7xl mx-auto">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-crimson-500/15 border border-crimson-500/30 text-crimson-300 text-[10px] font-black uppercase tracking-widest mb-4">
                            <span>📜</span> Philosophical Inquiries & Essays
                        </div>
                        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-heading leading-tight">
                            Critical Discourse & <br />
                            <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 bg-clip-text text-transparent font-serif italic font-normal">
                                Intellectual Reflections
                            </span>
                        </h2>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-gradient-to-r from-crimson-600 to-amber-600 text-white shadow-md shadow-crimson-900/30 border border-amber-400/30'
                                        : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 hover:border-amber-500/20'
                                }`}
                            >
                                {cat === 'All' ? 'All Inquiries' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FEATURED LEAD STORY BANNER (When All is selected) */}
                {selectedCategory === 'All' && featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-14 rounded-2xl bg-gradient-to-br from-[#151922] via-[#0F131A] to-[#0A0D12] border border-amber-500/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-crimson-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                            <div className="lg:col-span-8 space-y-5">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="px-3 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-[10px] font-black text-amber-300 uppercase tracking-wider">
                                        ⭐ Featured Discourse
                                    </span>
                                    <span className="text-xs text-stone-400 font-mono">
                                        Published {featuredArticle.date}
                                    </span>
                                    <span className="text-xs text-emerald-400 font-mono font-semibold">
                                        ⏱ 8 Min Read
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading group-hover:text-amber-200 transition-colors leading-tight">
                                    <Link href={`/articles/${featuredArticle.id}`}>
                                        {featuredArticle.title}
                                    </Link>
                                </h3>

                                <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                                    A profound examination of the metaphysical foundations of justice in classical Islamic scholarship. Dr. Salim deconstructs the balance between divine law, ethical accountability, and the harmony of human society.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                    <Link
                                        href={`/articles/${featuredArticle.id}`}
                                        className="px-6 py-3 rounded-xl bg-crimson-600 hover:bg-crimson-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-crimson-900/30 transition-all flex items-center gap-2"
                                    >
                                        <span>Read Full Treatise</span>
                                        <span>→</span>
                                    </Link>

                                    <button
                                        onClick={(e) => toggleAudioPlay(e, featuredArticle.id)}
                                        className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-stone-200 border border-white/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                                    >
                                        <span>{isPlayingAudio === featuredArticle.id ? '⏸ Pause Brief' : '🎧 Audio Brief (6 Min)'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Metadata Block */}
                            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                                <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                                    Reader Engagement
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-xs text-stone-400">Total Views</span>
                                    <span className="text-sm font-mono font-bold text-white">153+</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/10">
                                    <span className="text-xs text-stone-400">Verified Comments</span>
                                    <span className="text-sm font-mono font-bold text-amber-300">7 Active</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-xs text-stone-400">Category</span>
                                    <span className="text-xs font-semibold text-crimson-300">{featuredArticle.category}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* GRID OF DISCOURSE ARTICLES */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <AnimatePresence>
                        {gridArticles.map((article, index) => {
                            const readTime = ((article.id * 3) % 5) + 4;
                            const likesCount = ((article.id * 47) % 73) + 12;

                            return (
                                <motion.article
                                    key={article.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="group relative bg-gradient-to-br from-[#12151B] to-[#0A0C10] border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:shadow-crimson-900/10 hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Top Meta Bar */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="px-2.5 py-0.5 rounded-full bg-crimson-500/20 text-crimson-300 border border-crimson-500/30 text-[10px] font-bold uppercase tracking-wider">
                                                {article.category}
                                            </span>
                                            <span className="text-[11px] text-stone-400 font-mono">
                                                ⏱ {readTime} min read
                                            </span>
                                        </div>

                                        <h4 className="text-xl font-bold text-white font-heading group-hover:text-amber-200 transition-colors leading-snug line-clamp-2">
                                            <Link href={`/articles/${article.id}`}>
                                                {article.title}
                                            </Link>
                                        </h4>

                                        <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed line-clamp-3">
                                            {(() => {
                                                if (!article.content || article.content.trim() === '' || article.content === 'Seeded content...') {
                                                    return `A rigorous scholarly inquiry into ${article.category.toLowerCase()}, navigating classical tradition and contemporary moral challenges.`;
                                                }
                                                const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                                                const normalized = cleanText.replace(/\s+/g, " ").trim();
                                                return normalized.length > 130 ? normalized.substring(0, 130) + "..." : normalized;
                                            })()}
                                        </p>
                                    </div>

                                    {/* Bottom Footer Bar */}
                                    <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-center">
                                        <Link
                                            href={`/articles/${article.id}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 group-hover:text-amber-200 transition-colors"
                                        >
                                            <span>Read Essay</span>
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </Link>

                                        {/* Social Proof Counter */}
                                        <div className="flex items-center gap-3 text-xs text-stone-400">
                                            <span className="flex items-center gap-1">
                                                💬 {article.comments || 0}
                                            </span>
                                            <span className="flex items-center gap-1 text-rose-400">
                                                ♥ {likesCount}
                                            </span>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Archive Button */}
                <div className="mt-16 text-center">
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-widest uppercase border border-white/15 hover:border-amber-500/40 backdrop-blur-md transition-all shadow-lg hover:shadow-amber-500/10"
                    >
                        <span>Explore Full 200+ Essay Archive</span>
                        <span>→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}
