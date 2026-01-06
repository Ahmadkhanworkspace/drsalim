'use client';

import { getArticle } from '@/app/lib/actions';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';

export default function ArticlePage() {
    const params = useParams();
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const articleId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '0');
            const data = await getArticle(articleId);
            setArticle(data);
            setLoading(false);
        };
        fetch();
    }, [params.id]);

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading...</div>;

    if (!article) {
        return (
            <div style={{
                minHeight: '60vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: 'var(--spacing-xl)'
            }}>
                <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)' }}>404</h1>
                <p>The article you are looking for does not exist.</p>
                <Link href="/" style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--color-accent)',
                    color: 'white',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600
                }}>
                    Return Home
                </Link>
            </div>
        );
    }

    // Determine background gradient based on ID (consistent with card)
    const index = article.id;
    const gradient = `linear-gradient(135deg, 
        ${index % 3 === 0 ? '#2d5f8d' : index % 3 === 1 ? '#1a2332' : '#5a9bd4'} 0%, 
        ${index % 3 === 0 ? '#5a9bd4' : index % 3 === 1 ? '#2d5f8d' : '#a8d8f0'} 100%)`;

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Header */}
            <div style={{
                background: gradient,
                padding: '6rem 2rem 4rem',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '1.5rem'
                    }}>
                        {article.category}
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        marginBottom: '1.5rem',
                        textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}>
                        {article.title}
                    </h1>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        fontSize: '0.95rem',
                        opacity: 0.9
                    }}>
                        <span>📅 {article.date}</span>
                        <span>👁️ {article.views.toLocaleString()} views</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container" style={{
                maxWidth: '800px',
                margin: '-3rem auto 0',
                position: 'relative',
                zIndex: 3,
                padding: '0 1rem'
            }}>
                <div style={{
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    padding: '3rem',
                    marginBottom: '2rem'
                }}>
                    {/* Simulated Content */}
                    <div style={{
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: '#334155'
                    }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            <strong>Editor's Note:</strong> This is a simulated view of the article content. In a full production environment, the dynamic content added via the admin panel would be fetched from a database and displayed here.
                        </p>
                        <hr style={{ margin: '2rem 0', borderColor: '#e2e8f0' }} />
                        <p style={{ marginBottom: '1.5rem' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginTop: '2.5rem', marginBottom: '1rem' }}>
                            Key Reflections
                        </h3>
                        <p style={{ marginBottom: '1.5rem' }}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                        <blockquote style={{
                            borderLeft: '4px solid #0ea5e9',
                            paddingLeft: '1.5rem',
                            margin: '2rem 0',
                            fontStyle: 'italic',
                            color: '#475569'
                        }}>
                            "The journey of a thousand miles begins with a single step, but the journey of the heart is infinite."
                        </blockquote>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link href="/#articles" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#64748b',
                        textDecoration: 'none',
                        fontWeight: 600,
                        transition: 'color 0.2s'
                    }}>
                        ← Back to Articles
                    </Link>
                </div>
            </div>
        </main>
    );
}
