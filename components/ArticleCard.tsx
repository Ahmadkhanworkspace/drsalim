'use client';

import { Article } from '@/data/articles';
import Link from 'next/link';
import { getReadingStats } from '@/app/lib/readingTime';

interface PremiumArticleCardProps {
    article: Article;
    index: number;
}

export default function PremiumArticleCard({ article }: PremiumArticleCardProps) {
    const randomLikes = ((article.id * 47) % 73) + 12;
    const stats = getReadingStats(article.content);

    return (
        <article className="group flex flex-col bg-white border border-stone-200 hover:border-stone-300 rounded-2xl shadow-2xs hover:shadow-md transition-all overflow-hidden">
            <Link href={`/articles/${article.id}`} className="flex flex-col h-full w-full">
                {/* Meta Header */}
                <div className="p-6 pb-0 flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                        {article.category}
                    </span>
                    <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                        <span>{stats.text}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-stone-900 font-heading mb-3 group-hover:text-crimson-800 transition-colors leading-snug line-clamp-2">
                        {article.title}
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                        {(() => {
                            if (!article.content || article.content.trim() === '' || article.content === 'Seeded content...') {
                                return `${article.title} - An insightful article examining ethical living, moral psychology, and human purpose.`;
                            }
                            const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                            const normalized = cleanText.replace(/\s+/g, " ").trim();
                            return normalized.length > 150 ? normalized.substring(0, 150) + "..." : normalized;
                        })()}
                    </p>

                    <div className="mt-auto pt-4 border-t border-stone-100 flex justify-between items-center w-full">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-crimson-800">
                            <span>Read Article</span>
                            <span>→</span>
                        </span>

                        <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                            <span>📅 {article.date}</span>
                            <span>💬 {article.comments || 0}</span>
                            <span>♥ {randomLikes}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
