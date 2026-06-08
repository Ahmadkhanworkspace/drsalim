'use client';

import { motion } from 'framer-motion';
import { Article } from '@/data/articles';
import Link from 'next/link';

interface PremiumArticleCardProps {
    article: Article;
    index: number;
}

export default function PremiumArticleCard({ article, index }: PremiumArticleCardProps) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[500px] flex flex-col glass-card overflow-hidden rounded-none border-none cursor-pointer"
        >
            <Link href={`/articles/${article.id}`} className="flex flex-col h-full w-full">
                {/* Featured Image / Placeholder */}
                <div className="relative h-64 overflow-hidden bg-charcoal-950" style={{ backgroundColor: 'hsl(var(--charcoal-950))' }}>
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110 opacity-30 grayscale group-hover:grayscale-0"
                        style={{ backgroundImage: 'url("/section-bg.png")' }}
                    />
                    
                    {/* Category Badge (Crimson) */}
                    <div 
                        className="absolute top-6 left-6 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-crimson-500 z-10"
                        style={{ backgroundColor: 'hsl(var(--crimson-500))' }}
                    >
                        {article.category}
                    </div>

                    {/* Decorative Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 transition-opacity duration-500 group-hover:opacity-30">
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="0.5" className="w-32 h-32">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-8 flex flex-col relative z-10 bg-black/20 backdrop-blur-sm group-hover:bg-crimson-900/5 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="w-8 h-[1px] bg-crimson-500/50" style={{ backgroundColor: 'hsla(0, 100%, 30%, 0.5)' }}></span>
                        <time className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">
                            {article.date}
                        </time>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 font-heading group-hover:text-crimson-400 transition-colors duration-300">
                        {article.title}
                    </h3>

                    <p className="text-stone-400 text-sm leading-relaxed mb-8 line-clamp-3 font-light">
                        {(() => {
                            if (!article.content || article.content.trim() === '' || article.content === 'Seeded content...') {
                                return `${article.title} - A scholarly inquiry into ${article.category.toLowerCase()}. Examining the timeless structures of human history and philosophical tradition.`;
                            }
                            const cleanText = article.content.replace(/<\/?[^>]+(>|$)/g, "");
                            const normalized = cleanText.replace(/\s+/g, " ").trim();
                            return normalized.length > 150 ? normalized.substring(0, 150) + "..." : normalized;
                        })()}
                    </p>

                    <div className="mt-auto">
                        <div
                            className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-stone-200 group-hover:text-crimson-500 transition-all duration-300"
                        >
                            <span>Read the Blog</span>
                            <motion.span 
                                className="text-crimson-500"
                                style={{ color: 'hsl(var(--crimson-500))' }}
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                →
                            </motion.span>
                        </div>
                    </div>
                </div>
            </Link>

            {/* Bottom Crimson Glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-crimson-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" style={{ backgroundColor: 'hsl(var(--crimson-500))' }} />
        </motion.article>

    );
}

