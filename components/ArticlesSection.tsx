'use client';

import { useState } from 'react';
import { Article } from '@/data/articles';
import Link from 'next/link';
import { getReadingStats } from '@/app/lib/readingTime';

interface ArticlesSectionProps {
    articles: Article[];
}

function cleanArticleExcerpt(content?: string, title?: string, maxLength: number = 140): string {
    if (!content || content.trim() === '' || content === 'Seeded content...') {
        return "An insightful exploration of Islamic ethics, moral values, and spiritual wisdom by Dr. Muhammad Salim.";
    }

    // 1. Remove all HTML comments (e.g. <!-- wp:paragraph --> and <!-- /wp:paragraph -->)
    let text = content.replace(/<!--[\s\S]*?-->/g, ' ');

    // 2. Remove all HTML tags (<p>, <strong>, <em>, etc.)
    text = text.replace(/<[^>]+>/g, ' ');

    // 3. Decode HTML entities and character artifacts
    text = text
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&quot;/gi, '"')
        .replace(/&#8217;/g, "'")
        .replace(/&#8216;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/â€™/g, "'")
        .replace(/â€œ/g, '"')
        .replace(/â€/g, '"')
        .replace(/â€˜/g, "'");

    // 4. Strip duplicate title from the start of excerpt if present (case-insensitive)
    if (title) {
        const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        text = text.replace(new RegExp('^\\s*' + escapedTitle + '\\s*', 'i'), ' ');
    }

    // 5. Strip leading numbering/headers like "1. INTRODUCTION", "1. INTRODUCTION ", "1.", etc.
    text = text.replace(/^\s*(?:[0-9]+\s*[\.:-]?\s*)?(?:INTRODUCTION|ABSTRACT|FOREWORD|SUMMARY)?\s*/i, '');
    text = text.replace(/^\s*(?:[0-9]+\s*[\.:-]\s*)/i, '');

    // 6. Clean extra spaces
    text = text.replace(/\s+/g, ' ').trim();

    if (!text || text.length < 20) {
        return "An insightful exploration of Islamic ethics, moral values, and spiritual wisdom by Dr. Muhammad Salim.";
    }

    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

function cleanArticleTitle(title: string): string {
    // If title is ALL CAPS, convert to clean Title Case for editorial elegance
    if (title === title.toUpperCase() && title.length > 4) {
        return title
            .toLowerCase()
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }
    return title;
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
        <section id="articles" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E3DBD0]">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
                    <div>
                        <span className="text-xs font-mono font-bold text-[#7A1C1C] uppercase tracking-widest block mb-2">
                            Articles & Literary Discourse
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight font-heading text-[#1A1715] leading-tight">
                            Thoughtful Articles & <br />
                            <span className="text-[#7A1C1C] font-serif italic font-normal">
                                Moral Reflections
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
                                        ? 'bg-[#7A1C1C] text-white shadow-xs'
                                        : 'bg-white text-[#554E48] border border-[#D9CEBA] hover:border-[#1A1715]'
                                }`}
                            >
                                {cat === 'All' ? 'All Articles' : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FEATURED LEAD ARTICLE */}
                {selectedCategory === 'All' && featuredArticle && (
                    <div className="mb-10 sm:mb-14 rounded-3xl bg-white border border-[#E3DBD0] p-7 sm:p-11 shadow-sm relative overflow-hidden group hover:border-[#C5A059]/60 transition-all">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-8 space-y-4">
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <span className="px-3 py-1 rounded-full bg-[#C5A059]/15 text-[#5C4A28] border border-[#C5A059]/30 text-xs font-bold uppercase tracking-wider">
                                        Featured Article
                                    </span>
                                    <span className="text-xs text-[#7A726A] font-mono">
                                        Published {featuredArticle.date}
                                    </span>
                                    <span className="text-xs text-[#7A726A] font-mono">
                                        • {getReadingStats(featuredArticle.content).text}
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1715] group-hover:text-[#7A1C1C] transition-colors leading-tight font-heading">
                                    <Link href={`/articles/${featuredArticle.id}`}>
                                        {cleanArticleTitle(featuredArticle.title)}
                                    </Link>
                                </h3>

                                <p className="text-[#554E48] text-sm sm:text-base font-light leading-relaxed max-w-3xl">
                                    {cleanArticleExcerpt(featuredArticle.content, featuredArticle.title, 220)}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 pt-3">
                                    <Link
                                        href={`/articles/${featuredArticle.id}`}
                                        className="px-6 py-3 rounded-xl bg-[#7A1C1C] hover:bg-[#631414] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs"
                                    >
                                        Read Full Article →
                                    </Link>

                                    <button
                                        onClick={(e) => toggleAudioPlay(e, featuredArticle.id)}
                                        className="px-5 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#D9CEBA] text-[#1A1715] font-bold text-xs uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                                    >
                                        <span>{isPlayingAudio === featuredArticle.id ? '⏸ Pause' : '🎧 Listen to Summary'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Right Metadata Block */}
                            <div className="lg:col-span-4 bg-[#FAF7F2] border border-[#E3DBD0] rounded-2xl p-6 space-y-3.5">
                                <div className="text-xs font-mono uppercase tracking-widest text-[#7A1C1C] font-bold">
                                    Article Details
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-[#EAE3D8] text-xs">
                                    <span className="text-[#7A726A]">Total Views</span>
                                    <span className="font-mono font-bold text-[#1A1715]">153+</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-[#EAE3D8] text-xs">
                                    <span className="text-[#7A726A]">Reader Comments</span>
                                    <span className="font-mono font-bold text-[#7A1C1C]">7 Comments</span>
                                </div>
                                <div className="flex justify-between items-center py-1.5 text-xs">
                                    <span className="text-[#7A726A]">Topic</span>
                                    <span className="font-semibold text-[#1A1715]">{featuredArticle.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ARTICLES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {gridArticles.map((article) => {
                        const readTime = ((article.id * 3) % 5) + 4;

                        return (
                            <article
                                key={article.id}
                                className="group bg-white border border-[#E3DBD0] hover:border-[#C5A059]/60 rounded-3xl p-7 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all"
                            >
                                <div className="space-y-3.5">
                                    <div className="flex justify-between items-center">
                                        <span className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E3DBD0] text-[#7A1C1C] text-[11px] font-mono font-bold uppercase tracking-wider">
                                            {article.category}
                                        </span>
                                        <span className="text-xs text-[#7A726A] font-mono">
                                            {article.date}
                                        </span>
                                    </div>

                                    <h4 className="text-lg sm:text-xl font-bold text-[#1A1715] group-hover:text-[#7A1C1C] transition-colors leading-snug font-heading">
                                        <Link href={`/articles/${article.id}`}>
                                            {cleanArticleTitle(article.title)}
                                        </Link>
                                    </h4>

                                    <p className="text-[#554E48] text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                                        {cleanArticleExcerpt(article.content, article.title, 140)}
                                    </p>
                                </div>

                                <div className="pt-5 mt-5 border-t border-[#EAE3D8] flex items-center justify-between text-xs text-[#7A726A]">
                                    <span className="font-mono">{readTime} min read</span>
                                    <Link
                                        href={`/articles/${article.id}`}
                                        className="text-[#7A1C1C] hover:text-[#521010] font-bold text-xs uppercase tracking-wider flex items-center gap-1 group/btn"
                                    >
                                        <span>Read</span>
                                        <span className="transition-transform group-hover/btn:translate-x-0.5">→</span>
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
