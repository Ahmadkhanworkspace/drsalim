'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getArticles, deleteArticle } from '@/app/lib/actions';
import { Article } from '@/data/articles';

// Extended interface for Admin view which has extra UI state
interface AdminArticle extends Article {
    published?: boolean;
    createdAt?: string;
    featuredImage?: any;
}

export default function ArticlesPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<AdminArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getArticles();
            const mappedData: AdminArticle[] = data.map(a => ({
                ...a,
                published: true, // Default to true
                createdAt: a.date
            }));
            setArticles(mappedData);
            setLoading(false);
        };
        fetchArticles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this article?')) return;

        try {
            const res = await deleteArticle(id);
            if (res.success) {
                // Refresh list locally to avoid full re-fetch
                setArticles(prev => prev.filter(a => a.id !== id));
            } else {
                alert('Failed to delete article');
            }
        } catch (error) {
            console.error(error);
            alert('Error deleting article');
        }
    };

    if (loading) return <div style={{ padding: '2rem' }}>Loading articles...</div>;

    const publishedCount = articles.filter(a => a.published).length;
    const draftCount = articles.filter(a => !a.published).length;
    const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-2xl)',
                flexWrap: 'wrap',
                gap: '12px'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Articles Management
                    </h1>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        fontWeight: 500
                    }}>
                        Create and manage blog articles with featured images and rich content
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/articles/new')}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)',
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 212, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 212, 255, 0.3)';
                    }}
                >
                    ➕ Write New Article
                </button>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Published
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#10b981'
                    }}>
                        {publishedCount}
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Drafts
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a'
                    }}>
                        {draftCount}
                    </div>
                </div>

                <div style={{
                    padding: 'var(--spacing-lg)',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        Total Views
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a'
                    }}>
                        {totalViews.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Articles Table */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                overflow: 'hidden'
            }}>
                <div style={{
                    overflowX: 'auto'
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'collapse'
                    }}>
                        <thead>
                            <tr style={{
                                background: '#f8fafc',
                                borderBottom: '1px solid #e2e8f0'
                            }}>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'left',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Article Title
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'left',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Category
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Status
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Views
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'center',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Comments
                                </th>
                                <th style={{
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    textAlign: 'right',
                                    color: '#64748b',
                                    fontWeight: 700,
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map((article, index) => (
                                <tr
                                    key={article.id}
                                    style={{
                                        borderBottom: index < articles.length - 1 ? '1px solid #f1f5f9' : 'none',
                                        transition: 'background 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f8fafc';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                    }}
                                >
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        color: '#0f172a',
                                        fontWeight: 600
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-md)'
                                        }}>
                                            {/* Featured Image Placeholder */}
                                            <div style={{
                                                width: '60px',
                                                height: '60px',
                                                borderRadius: '8px',
                                                background: 'linear-gradient(135deg, #f59e0b15 0%, #f59e0b05 100%)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '1.5rem',
                                                flexShrink: 0,
                                                border: '1px solid #fef3c7'
                                            }}>
                                                📝
                                            </div>
                                            <div>
                                                <div style={{ marginBottom: '4px' }}>{article.title}</div>
                                                <div style={{
                                                    fontSize: '0.75rem',
                                                    color: '#64748b',
                                                    fontWeight: 500
                                                }}>
                                                    {article.createdAt}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        color: '#64748b'
                                    }}>
                                        <span style={{
                                            padding: '0.4rem 0.8rem',
                                            background: '#f1f5f9',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            color: '#475569'
                                        }}>
                                            {article.category}
                                        </span>
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center'
                                    }}>
                                        <span style={{
                                            padding: '0.4rem 1rem',
                                            background: article.published ? '#dcfce715' : '#fef2f215',
                                            color: article.published ? '#10b981' : '#ef4444',
                                            borderRadius: '6px',
                                            fontSize: '0.85rem',
                                            fontWeight: 700,
                                            border: `1px solid ${article.published ? '#10b981' : '#ef4444'}20`
                                        }}>
                                            {article.published ? '✓ Published' : '○ Draft'}
                                        </span>
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#64748b',
                                        fontWeight: 600
                                    }}>
                                        {article.views.toLocaleString()}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'center',
                                        color: '#64748b',
                                        fontWeight: 600
                                    }}>
                                        {article.comments}
                                    </td>
                                    <td style={{
                                        padding: 'var(--spacing-lg)',
                                        textAlign: 'right'
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            gap: 'var(--spacing-sm)',
                                            justifyContent: 'flex-end'
                                        }}>
                                            <button
                                                onClick={() => router.push(`/admin/articles/${article.id}`)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#f1f5f9',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#475569',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#00d4ff';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#f1f5f9';
                                                    e.currentTarget.style.color = '#475569';
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#fef2f2',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: '#ef4444',
                                                    cursor: 'pointer',
                                                    fontWeight: 600,
                                                    fontSize: '0.85rem',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#ef4444';
                                                    e.currentTarget.style.color = 'white';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#fef2f2';
                                                    e.currentTarget.style.color = '#ef4444';
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Featured Image Upload Info */}
            <div style={{
                padding: 'var(--spacing-xl)',
                marginTop: 'var(--spacing-xl)',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
            }}>
                <h3 style={{
                    color: '#0f172a',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    marginBottom: 'var(--spacing-md)'
                }}>
                    💡 Article Management Features
                </h3>
                <ul style={{
                    color: '#64748b',
                    lineHeight: 2,
                    paddingLeft: 'var(--spacing-lg)',
                    fontWeight: 500
                }}>
                    <li>✓ Upload featured images for each article</li>
                    <li>✓ Rich text editor for content creation</li>
                    <li>✓ SEO fields (meta title, description, keywords)</li>
                    <li>✓ Category and tag management</li>
                    <li>✓ Publish/unpublish toggle</li>
                    <li>✓ View and moderate comments</li>
                </ul>
            </div>
        </div>
    );
}
