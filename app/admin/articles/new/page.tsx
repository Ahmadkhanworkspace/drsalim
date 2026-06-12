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
        if (!title.trim()) {
            alert('Article Title is required.');
            return;
        }
        setSaving(true);
        try {
            const res = await createArticle({
                title,
                category,
                content,
                published,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                slug: title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                featuredImage: imagePreview
            });

            if (res.success) {
                alert('Article created successfully!');
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
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-semibold mb-1">
                        Dr. Salim Admin / Articles / New
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-850 dark:text-slate-100">
                        Write New Article
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
                        Compose and structure a new scholarly article or literary blog post
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => router.push('/admin/articles')}
                        className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-350 transition-colors"
                        style={{ borderRadius: '8px !important' }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/10 disabled:opacity-50"
                        style={{ borderRadius: '8px !important' }}
                    >
                        {saving ? 'Creating...' : published ? 'Publish Article' : 'Save Draft'}
                    </button>
                </div>
            </div>

            {/* Editor Workspace Container */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Side: Title, Content, Image Upload */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6" style={{ borderRadius: '16px !important' }}>
                        
                        {/* Title input */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Article Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter a descriptive scholarly title..."
                                className="w-full px-4 py-2.5 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white text-slate-855 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-semibold"
                                style={{ borderRadius: '8px !important' }}
                            />
                        </div>

                        {/* Rich Content Area */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Article Content
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write the body of the article here..."
                                rows={20}
                                className="w-full px-4 py-3 text-sm border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white text-slate-855 dark:text-slate-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all leading-relaxed font-sans resize-vertical"
                                style={{ borderRadius: '8px !important' }}
                            />
                        </div>

                    </div>
                </div>

                {/* Right Side: Options, Featured Image, Category, Status */}
                <div className="space-y-6">
                    
                    {/* Settings Panel */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6" style={{ borderRadius: '16px !important' }}>
                        <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Taxonomy & Status</h3>
                        
                        {/* Category Selector */}
                        <div className="space-y-2">
                            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-3 py-2.5 text-xs border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-855 dark:text-slate-100 outline-none"
                                style={{ borderRadius: '8px !important' }}
                            >
                                <option>Islamic Studies</option>
                                <option>Spirituality</option>
                                <option>Philosophy</option>
                                <option>Quranic Studies</option>
                                <option>Faith & Practice</option>
                                <option>Men & Evil Web</option>
                                <option>Articles</option>
                                <option>Blog</option>
                            </select>
                        </div>

                        {/* Status Checkbox Wrapper */}
                        <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-3" style={{ borderRadius: '12px !important' }}>
                            <input
                                id="published-checkbox"
                                type="checkbox"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <div>
                                <label htmlFor="published-checkbox" className="block text-xs font-bold text-slate-855 dark:text-slate-200 cursor-pointer">
                                    Publish immediately
                                </label>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5">
                                    Make this article visible to public visitors right away
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Featured Image Panel */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4" style={{ borderRadius: '16px !important' }}>
                        <h3 className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">Featured Image</h3>
                        
                        {imagePreview ? (
                            <div className="relative border border-slate-200 dark:border-slate-800 overflow-hidden" style={{ borderRadius: '12px !important' }}>
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-full h-40 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFeaturedImage(null);
                                        setImagePreview('');
                                    }}
                                    className="absolute top-2 right-2 px-2.5 py-1 text-[10px] font-bold text-white bg-red-650 hover:bg-red-700 transition-colors shadow-md"
                                    style={{ borderRadius: '6px !important' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-350 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-center p-6 relative hover:bg-slate-100/50 dark:hover:bg-slate-950/50 transition-all cursor-pointer" style={{ borderRadius: '12px !important' }}>
                                <div className="text-2xl mb-2">🖼️</div>
                                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Click to upload image</div>
                                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">PNG, JPG or WEBP (max. 5MB)</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
