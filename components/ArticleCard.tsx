'use client';

import { Article } from '@/data/articles';
import Link from 'next/link';
import { getReadingStats } from '@/app/lib/readingTime';

interface PremiumArticleCardProps {
    article: Article;
    index: number;
}

function cleanExcerpt(content?: string, maxLength: number = 140): string {
    if (!content || content.trim() === '' || content === 'Seeded content...') {
        return "An insightful article examining ethical living, moral psychology, and human purpose by Dr. Muhammad Salim.";
    }

    let text = content.replace(/<!--[\s\S]*?-->/g, ' ');
    text = text.replace(/<[^>]+>/g, ' ');
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

    text = text.replace(/^\s*(?:[0-9]+\s*[\.:-]?\s*)?(?:INTRODUCTION|ABSTRACT|FOREWORD|SUMMARY)?\s*/i, '');
    text = text.replace(/\s+/g, ' ').trim();

    if (!text || text.length < 15) {
        return "An insightful article examining ethical living, moral psychology, and human purpose by Dr. Muhammad Salim.";
    }

    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

function formatTitle(title: string): string {
    if (title === title.toUpperCase() && title.length > 4) {
        return title
            .toLowerCase()
            .split(' ')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
    }
    return title;
}

export default function PremiumArticleCard({ article }: PremiumArticleCardProps) {
    const randomLikes = ((article.id * 47) % 73) + 12;
    const stats = getReadingStats(article.content);

    return (
        <article className="group flex flex-col bg-white border border-[#E3DBD0] hover:border-[#C5A059]/60 rounded-3xl shadow-xs hover:shadow-lg transition-all overflow-hidden p-6 sm:p-7">
            <Link href={`/articles/${article.id}`} className="flex flex-col h-full w-full justify-between space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                        <span className="px-3 py-1 rounded-full bg-[#FAF7F2] border border-[#E3DBD0] text-[#7A1C1C] text-[11px] font-mono font-bold uppercase tracking-wider">
                            {article.category}
                        </span>
                        <span className="font-mono text-[#7A726A] text-xs">
                            {stats.text}
                        </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#1A1715] font-heading group-hover:text-[#7A1C1C] transition-colors leading-snug">
                        {formatTitle(article.title)}
                    </h3>

                    <p className="text-[#554E48] text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                        {cleanExcerpt(article.content, 140)}
                    </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D8] flex justify-between items-center w-full text-xs">
                    <span className="font-bold text-[#7A1C1C] uppercase tracking-wider flex items-center gap-1">
                        <span>Read Article</span>
                        <span>→</span>
                    </span>

                    <div className="flex items-center gap-3 text-xs text-[#7A726A] font-mono">
                        <span>📅 {article.date}</span>
                        <span>💬 {article.comments || 0}</span>
                        <span>♥ {randomLikes}</span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
