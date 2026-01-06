'use client';

import { Article } from '@/data/articles';
import Image from 'next/image';

interface PremiumArticleCardProps {
    article: Article;
    index: number;
}

export default function PremiumArticleCard({ article, index }: PremiumArticleCardProps) {
    return (
        <article
            className="modern-card"
            style={{
                padding: 0,
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                transition: 'all var(--transition-normal)'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Featured Image */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '240px',
                background: `linear-gradient(135deg, 
          ${index % 3 === 0 ? '#2d5f8d' : index % 3 === 1 ? '#1a2332' : '#5a9bd4'} 0%, 
          ${index % 3 === 0 ? '#5a9bd4' : index % 3 === 1 ? '#2d5f8d' : '#a8d8f0'} 100%)`,
                overflow: 'hidden'
            }}>
                {/* Placeholder Icon */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '4rem',
                    opacity: 0.3
                }}>
                    📝
                </div>

                {/* Category Badge */}
                <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-md)',
                    left: 'var(--spacing-md)',
                    padding: '0.4rem 1rem',
                    background: 'var(--color-accent)',
                    color: 'var(--color-navy)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 4px 12px rgba(0, 212, 255, 0.4)'
                }}>
                    {article.category}
                </div>

                {/* Date Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 'var(--spacing-md)',
                    right: 'var(--spacing-md)',
                    padding: '0.4rem 1rem',
                    background: 'rgba(26, 35, 50, 0.9)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: '1px solid rgba(0, 212, 255, 0.3)'
                }}>
                    {article.date}
                </div>
            </div>

            {/* Content */}
            <div style={{
                padding: 'var(--spacing-lg)',
                flex: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Title */}
                <h3 style={{
                    fontSize: '1.3rem',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 800,
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: '2.6em'
                }}>
                    {article.title}
                </h3>

                {/* Meta Info */}
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        👁️ {article.views.toLocaleString()} views
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        💬 {article.comments} comments
                    </span>
                </div>

                {/* Excerpt */}
                <p style={{
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    fontSize: '0.95rem',
                    flex: 1,
                    marginBottom: 'var(--spacing-md)',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {article.title} - Explore this insightful article on {article.category.toLowerCase()} and discover profound perspectives on spiritual growth and understanding.
                </p>

                {/* Read More Button */}
                <a
                    href={`/articles/${article.id}`}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: 'var(--color-accent)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        transition: 'all var(--transition-fast)',
                        marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.gap = 'var(--spacing-md)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.gap = 'var(--spacing-sm)';
                    }}
                >
                    <span>Read Full Article</span>
                    <span style={{ fontSize: '1.2rem' }}>→</span>
                </a>
            </div>
        </article>
    );
}
