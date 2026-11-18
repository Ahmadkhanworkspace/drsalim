'use client';

import { useState } from 'react';
import { Article } from '@/data/articles';
import Link from 'next/link';
import { getReadingStats } from '@/app/lib/readingTime';

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

    // Flagship featured article
    const featuredArticle = articles.find(a => a.id === 9) || articles[0];
    const gridArticles = filteredArticles.filter(a => selectedCategory !== 'All' || a.id !== featuredArticle?.id);

    const toggleAudioPlay = (e: React.MouseEvent, id: number) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPlayingAudio(prev => prev === id ? null : id);
    };

    return (
        <section id="articles" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
                    <div>
                        <span className="text-xs font-mono font-bold text-crimson-800 uppercase tracking-wider block mb-2">
                            Articles & Reading
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-heading text-stone-900 leading-tight">
                            Thoughtful Articles & <br />
                            <span className="text-crimson-800 font-serif italic font-normal">
                                Practical Reflections
                            </span>
                        </h2>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                    selectedCategory === cat
                                        ? 'bg-crimson-800 text-white shadow-xs'
                                        : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                                }`}
                            >
                                {cat === 'All' ? 'All Articles' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FEATURED LEAD ARTICLE */}
                {selectedCategory === 'All' && featuredArticle && (
                    <div className="mb-10 sm:mb-14 rounded-2xl bg-white border border-stone-200 p-6 sm:p-10 shadow-sm relative overflow-hidden group">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="px-3 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                                        Featured Article
                                    </span>
                                    <span className="text-xs text-stone-500 font-mono">
                                        Published {featuredArticle.date}
                                    </span>
                                    <span className="text-xs text-stone-600 font-mono">
                                        • {getReadingStats(featuredArticle.content).text}
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 group-hover:text-crimson-800 transition-colors leading-tight">
                                    <Link href={`/articles/${featuredArticle.id}`}>
                                        {featuredArticle.title}
                                    </Link>
                                </h3>

                                <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                                    An insightful examination of what real justice means in everyday society, how moral responsibility builds strong communities, and why fairness matters in personal and public life.
                                </p>

                                <div className="flex flex-wrap items-center gap-3 pt-2">
                                    <Link
                                        href={`/articles/${featuredArticle.id}`}
                                        className="btn btn-primary text-xs"
                                    >
                                        Read Full Article →
                                    </Link>

                                    <button
                                        onClick={(e) => toggleAudioPlay(e, featuredArticle.id)}
                                        className="btn btn-outline text-xs cursor-pointer"
                                    >
                                        <span>{isPlayingAudio === featuredArticle.id ? '⏸ Pause' : '🎧 Listen to Summary'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Metadata Block */}
                            <div className="lg:col-span-4 bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                                <div className="text-xs font-mono uppercase tracking-wider text-crimson-800 font-bold">
                                    Article Details
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-stone-200 text-xs">
                                    <span className="text-stone-600">Total Views</span>
                                    <span className="font-mono font-bold text-stone-900">153+</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 border-b border-stone-200 text-xs">
                                    <span className="text-stone-600">Reader Comments</span>
                                    <span className="font-mono font-bold text-amber-800">7 Comments</span>
                                </div>
                                <div className="flex justify-between items-center py-1 text-xs">
                                    <span className="text-stone-600">Topic</span>
                                    <span className="font-semibold text-crimson-800">{featuredArticle.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ARTICLES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gridArticles.map((article) => {
                        const readTime = ((article.id * 3) % 5) + 4;
                        const likesCount = ((article.id * 47) % 73) + 12;

                        return (
                            <article
                                key={article.id}
                                className="group bg-white border border-stone-200 hover:border-stone-300 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
                            >
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-xs font-medium">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-stone-400 font-mono">
                                            {readTime} min read
                                        </span>
                                    </div>

                                    <h4 className="text-lg font-bold text-stone-900 group-hover:text-crimson-800 transition-colors leading-snug line-clamp-2">
                                        <Link href={`/articles/${article.id}`}>
                                            {article.title}
                                        </Link>
                                    </h4>

                                    <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                                        {(() => {
                                            if (!article.content || article.content.trim() === '' || article.content === 'Seeded content...') {
                                                return `An inspiring article examining ${article.category.toLowerCase()} and practical lessons for daily life.`;
                                            }
                                            const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                                            const normalized = cleanText.replace(/\s+/g, " ").trim();
                                            return normalized.length > 130 ? normalized.substring(0, 130) + "..." : normalized;
                                        })()}
                                    </p>
                                </div>

                                <div className="pt-4 mt-5 border-t border-stone-100 flex justify-between items-center">
                                    <Link
                                        href={`/articles/${article.id}`}
                                        className="text-xs font-bold text-crimson-800 hover:underline inline-flex items-center gap-1"
                                    >
                                        <span>Read Article</span>
                                        <span>→</span>
                                    </Link>

                                    <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                                        <span>💬 {article.comments || 0}</span>
                                        <span>♥ {likesCount}</span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Archive Button */}
                <div className="mt-12 sm:mt-16 text-center">
                    <Link
                        href="/articles"
                        className="btn btn-outline"
                    >
                        Explore All Articles →
                    </Link>
                </div>

            </div>
        </section>
    );
}
