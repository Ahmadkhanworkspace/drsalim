'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticle } from '@/app/lib/actions';

export default function NewArticlePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Islamic Studies');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [published, setPublished] = useState(false);
    const [saving, setSaving] = useState(false);

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
        try {
            const res = await createArticle({
                title,
                category,
                content,
                published,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                featuredImage: imagePreview // Saving data URL for now. In production, use file upload.
            });

            if (res.success) {
                alert('Article saved successfully!');
                router.push('/admin/articles');
                router.refresh();
            } else {
                alert('Failed to save article');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setSaving(false);
        }
    };

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
                        Write New Article
                    </h1>
                    <p style={{
                        color: '#64748b',
                        fontSize: '1rem',
                        fontWeight: 500
                    }}>
                        Create and publish a new blog article
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
                        {saving ? 'Saving...' : published ? 'Publish Article' : 'Save Draft'}
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
                            Publish immediately
                        </div>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.85rem'
                        }}>
                            Make this article visible to readers right away
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
