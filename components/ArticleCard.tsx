'use client';

import { Article } from '@/data/articles';

interface PremiumArticleCardProps {
    article: Article;
    index: number;
}

export default function PremiumArticleCard({ article, index }: PremiumArticleCardProps) {
    return (
        <article className="modern-card" style={{
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            border: 'none',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            height: '100%'
        }}>
            {/* Featured Image */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '220px',
                background: '#f8fafc',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: '1px solid rgba(0,0,0,0.05)'
            }}>
                <div style={{
                    fontSize: '3rem',
                    color: 'var(--color-gold)',
                    opacity: 0.8
                }}>
                    ✒️
                </div>

                {/* Category Badge */}
                <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    background: 'var(--color-gold)',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '2px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {article.category}
                </div>
            </div>

            {/* Content - Properly grouped */}
            <div style={{
                padding: '2rem',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start'
            }}>
                {/* Date */}
                <div style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontWeight: 600
                }}>
                    {article.date}
                </div>

                {/* Title */}
                <h3 style={{
                    fontSize: '1.4rem',
                    marginBottom: '1rem',
                    color: '#0f172a',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    lineHeight: 1.3
                }}>
                    {article.title}
                </h3>

                {/* Excerpt */}
                <p style={{
                    color: '#475569',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    marginBottom: '2rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    flex: 1
                }}>
                    {article.title} - Explore this insightful article on {article.category.toLowerCase()} and discover profound perspectives.
                </p>

                {/* Read More Link */}
                <a
                    href={`/articles/${article.id}`}
                    style={{
                        marginTop: 'auto',
                        color: 'var(--color-gold-dark)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease',
                        fontFamily: 'var(--font-body)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.gap = '0.8rem';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.gap = '0.5rem';
                    }}
                >
                    Read Article <span>→</span>
                </a>
            </div>
        </article>
    );
}
