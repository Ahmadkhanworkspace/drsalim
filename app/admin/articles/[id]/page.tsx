'use client';

import { useState, useEffect } from 'react';
import { getArticle, updateArticle } from '@/app/lib/actions';
import { useParams, useRouter } from 'next/navigation';
// Removed: import { articles as actualArticles } from '@/data/articles';

export default function EditArticlePage() {
    const router = useRouter();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Islamic Studies');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [published, setPublished] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            const articleId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '0');
            const article = await getArticle(articleId);

            if (article) {
                setTitle(article.title);
                setCategory(article.category);
                setContent(`Content for ${article.title}...\n\nThis is a placeholder for the actual article content properly fetched from the database.`);
                setPublished(true);
                setLoading(false);
            } else {
                alert('Article not found');
                router.push('/admin/articles');
            }
        };
        fetchArticle();
    }, [params.id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFeaturedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        const articleId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '0');

        const result = await updateArticle(articleId, {
            title,
            category,
            // In a real app we'd save content too, but we need a content field in data model first
        });

        if (result.success) {
            alert('Article updated successfully and saved to file!');
            router.push('/admin/articles');
        } else {
            alert('Failed to save article.');
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem' }}>Loading article...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#0f172a',
                        marginBottom: '0.5rem',
                        letterSpacing: '-0.5px'
                    }}>
                        Edit Article
                    </h1>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        fontWeight: 500
                    }}>
                        Edit content, images, and settings for this article
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <button
                        onClick={() => router.push('/admin/articles')}
                        style={{
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            background: '#f1f5f9',
                            border: 'none',
                            borderRadius: '10px',
                            color: '#475569',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            padding: 'var(--spacing-md) var(--spacing-xl)',
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            fontWeight: 700,
                            cursor: saving ? 'not-allowed' : 'pointer',
                            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)'
                        }}
                    >
                        {saving ? 'Saving...' : 'Update Article'}
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: 'var(--spacing-2xl)'
            }}>
                {/* Title */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{
                        display: 'block',
                        color: '#0f172a',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '0.95rem'
                    }}>
                        Article Title *
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter article title..."
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#0f172a'
                        }}
                    />
                </div>

                {/* Category */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{
                        display: 'block',
                        color: '#0f172a',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '0.95rem'
                    }}>
                        Category *
                    </label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-md)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#0f172a'
                        }}
                    >
                        <option>Islamic Studies</option>
                        <option>Spirituality</option>
                        <option>Philosophy</option>
                        <option>Quranic Studies</option>
                        <option>Faith & Practice</option>
                        <option>Men & Evil Web</option>
                    </select>
                </div>

                {/* Featured Image */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{
                        display: 'block',
                        color: '#0f172a',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '0.95rem'
                    }}>
                        Featured Image
                    </label>

                    {imagePreview ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                    marginBottom: 'var(--spacing-md)'
                                }}
                            />
                            <button
                                onClick={() => {
                                    setFeaturedImage(null);
                                    setImagePreview('');
                                }}
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    padding: '0.5rem 1rem',
                                    background: '#ef4444',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                border: '2px dashed #cbd5e1',
                                borderRadius: '12px',
                                padding: 'var(--spacing-2xl)',
                                textAlign: 'center',
                                background: '#f8fafc',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                        >
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🖼️</div>
                            <div style={{
                                color: '#0f172a',
                                fontWeight: 600,
                                marginBottom: '0.5rem'
                            }}>
                                Click to upload featured image
                            </div>
                            <div style={{
                                color: '#64748b',
                                fontSize: '0.85rem'
                            }}>
                                PNG, JPG or WEBP (max. 5MB)
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    opacity: 0,
                                    cursor: 'pointer'
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Content Editor */}
                <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{
                        display: 'block',
                        color: '#0f172a',
                        fontWeight: 700,
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: '0.95rem'
                    }}>
                        Article Content *
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your article content here..."
                        rows={15}
                        style={{
                            width: '100%',
                            padding: 'var(--spacing-lg)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            lineHeight: 1.8,
                            color: '#0f172a',
                            fontFamily: 'inherit',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {/* Publish Toggle */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-lg)',
                    background: '#f8fafc',
                    borderRadius: '12px'
                }}>
                    <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        style={{
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer'
                        }}
                    />
                    <div>
                        <div style={{
                            color: '#0f172a',
                            fontWeight: 700,
                            marginBottom: '0.25rem'
                        }}>
                            Publish status
                        </div>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.85rem'
                        }}>
                            Toggle to change publication status
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
