'use client';

import { getArticle, getCommentsForArticle, submitComment } from '@/app/lib/actions';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';
import { getReadingStats } from '@/app/lib/readingTime';

export default function ArticlePage() {
    const params = useParams();
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Reading Progress & Reader Controls
    const [scrollProgress, setScrollProgress] = useState(0);
    const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
    const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('sans');
    const [copiedLink, setCopiedLink] = useState(false);

    // Comment Form State
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const currentProgress = (window.scrollY / totalHeight) * 100;
                setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const articleId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '0');
            const articleData = await getArticle(articleId);
            if (articleData) {
                setArticle(articleData);
                const commentsData = await getCommentsForArticle(articleData._id);
                setComments(commentsData || []);
            }
            setLoading(false);
        };
        fetchData();
    }, [params.id]);

    const handleCopyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopiedLink(true);
            setTimeout(() => setCopiedLink(false), 2500);
        }
    };

    const handleShare = async () => {
        if (typeof window !== 'undefined') {
            if (navigator.share && article) {
                try {
                    await navigator.share({
                        title: article.title,
                        text: `Read "${article.title}" by Dr. Muhammad Salim:`,
                        url: window.location.href
                    });
                    return;
                } catch {
                    // Fallback to copy link
                }
            }
            handleCopyLink();
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!author || !email || !content) {
            setSubmitError('Please fill in all fields.');
            return;
        }
        setSubmitting(true);
        setSubmitError('');
        try {
            const res = await submitComment(article?._id || '', author, email, content);
            if (res.success) {
                setSubmitSuccess(true);
                setAuthor('');
                setEmail('');
                setContent('');
            } else {
                setSubmitError(res.error || 'Failed to submit comment. Please try again.');
            }
        } catch (err) {
            setSubmitError('An unexpected error occurred.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white text-stone-900 min-h-screen flex items-center justify-center font-mono font-bold tracking-widest text-xs">
                LOADING ARTICLE...
            </div>
        );
    }

    if (!article) {
        return (
            <div className="bg-white text-stone-900 min-h-[80vh] flex flex-col items-center justify-center text-center p-6 sm:p-8">
                <h1 className="text-6xl sm:text-8xl font-black text-crimson-700 mb-4 font-heading">404</h1>
                <p className="text-stone-600 max-w-sm mb-8">The article you are seeking does not exist or has been archived.</p>
                <Link href="/#articles" className="btn btn-primary">
                    Return to Articles
                </Link>
            </div>
        );
    }

    const readingStats = getReadingStats(article.content);

    // Font size classes
    const fontSizeMap = {
        sm: 'text-sm leading-relaxed',
        base: 'text-base sm:text-lg leading-relaxed sm:leading-loose',
        lg: 'text-lg sm:text-xl leading-loose',
        xl: 'text-xl sm:text-2xl leading-loose'
    };

    return (
        <main className="bg-[#FAF7F2] min-h-screen pb-24 text-[#1A1715] relative">
            {/* Top Fixed Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-[#E3DBD0]">
                <div
                    className="h-full bg-[#7A1C1C] transition-all duration-150 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Ambient Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[#EFE8DC]/60 rounded-full blur-[140px] pointer-events-none z-0" />

            {/* Header */}
            <div className="relative z-10 pt-32 sm:pt-40 pb-10 sm:pb-14 border-b border-[#E3DBD0] bg-gradient-to-b from-[#F7F4EE] via-[#FAF7F2] to-[#FAF7F2]">
                <div className="container px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-4">
                    {/* Category Badge & Reading Time */}
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="px-3.5 py-1 text-[11px] font-mono font-bold uppercase tracking-widest text-[#7A1C1C] bg-[#7A1C1C]/10 border border-[#7A1C1C]/20 rounded-full">
                            {article.category}
                        </span>
                        <span className="text-xs font-mono font-medium text-[#7A726A] bg-white px-3 py-1 rounded-full border border-[#D9CEBA]">
                            ⏱️ {readingStats.text}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight font-heading text-[#1A1715] tracking-tight max-w-3xl mx-auto">
                        {article.title}
                    </h1>

                    {/* Author & Publication Details */}
                    <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs font-mono text-[#7A726A] pt-2">
                        <span>📅 {article.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C1C]/40" />
                        <span>👁️ {article.views.toLocaleString()} Readers</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C1C]/40" />
                        <span className="font-semibold text-[#1A1715]">✍️ Dr. Muhammad Salim</span>
                    </div>
                </div>
            </div>

            {/* Content Container & Sticky Comfort Bar */}
            <div className="container relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
                
                {/* Reader Comfort Toolbar */}
                <div className="sticky top-20 z-30 mb-8 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
                    
                    {/* Left: Font Size Adjusters */}
                    <div className="flex items-center gap-1.5">
                        <span className="font-mono text-stone-500 text-[11px] uppercase mr-1">Text:</span>
                        <button
                            onClick={() => setFontSize(prev => prev === 'xl' ? 'lg' : prev === 'lg' ? 'base' : 'sm')}
                            title="Decrease text size"
                            className="w-8 h-8 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                        >
                            A−
                        </button>
                        <span className="px-2 py-1 font-mono text-[11px] text-stone-600 uppercase font-semibold">
                            {fontSize.toUpperCase()}
                        </span>
                        <button
                            onClick={() => setFontSize(prev => prev === 'sm' ? 'base' : prev === 'base' ? 'lg' : 'xl')}
                            title="Increase text size"
                            className="w-8 h-8 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold flex items-center justify-center transition-colors cursor-pointer"
                        >
                            A+
                        </button>
                    </div>

                    {/* Middle: Font Family Switcher */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                        <button
                            onClick={() => setFontFamily('sans')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                fontFamily === 'sans' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600 hover:text-stone-900'
                            }`}
                        >
                            Sans (Clean)
                        </button>
                        <button
                            onClick={() => setFontFamily('serif')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                                fontFamily === 'serif' ? 'bg-white text-stone-900 shadow-2xs font-bold' : 'text-stone-600 hover:text-stone-900'
                            }`}
                        >
                            Serif (Book)
                        </button>
                    </div>

                    {/* Right: Quick Share Tools */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Share Article"
                        >
                            <span>↗ Share Article</span>
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className="px-3 py-1.5 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                            title="Copy link to clipboard"
                        >
                            <span>{copiedLink ? '✓ Copied' : '🔗 Copy Link'}</span>
                        </button>
                    </div>
                </div>

                {/* Article Body */}
                <article className="bg-white p-6 sm:p-12 md:p-16 border border-[#E3DBD0] rounded-3xl shadow-sm">
                    <style dangerouslySetInnerHTML={{ __html: `
                        .article-body {
                            color: #292524;
                        }
                        .article-body p {
                            margin-bottom: 1.6rem;
                        }
                        .article-body h1, .article-body h2, .article-body h3, .article-body h4 {
                            color: #1c1917;
                            font-weight: 700;
                            margin-top: 2.5rem;
                            margin-bottom: 1rem;
                            line-height: 1.3;
                            letter-spacing: -0.02em;
                        }
                        .article-body h1 { font-size: 2rem; }
                        .article-body h2 { 
                            font-size: 1.6rem; 
                            border-left: 3px solid #991b1b; 
                            padding-left: 0.85rem; 
                        }
                        .article-body h3 { font-size: 1.35rem; }
                        .article-body h4 { font-size: 1.15rem; }
                        .article-body blockquote {
                            border-left: 4px solid #b45309;
                            padding: 1.25rem 1.75rem;
                            margin: 2rem 0;
                            font-style: italic;
                            color: #451a03;
                            background-color: #fefce8;
                            border-radius: 0 0.75rem 0.75rem 0;
                            line-height: 1.75;
                        }
                        .article-body ul, .article-body ol {
                            margin-bottom: 1.6rem;
                            padding-left: 1.75rem;
                        }
                        .article-body ul { list-style-type: disc; }
                        .article-body ol { list-style-type: decimal; }
                        .article-body li { margin-bottom: 0.5rem; }
                        .article-body strong { color: #1c1917; font-weight: 700; }
                        .article-body em { color: #44403c; }
                        .article-body a {
                            color: #991b1b;
                            text-decoration: underline;
                            transition: color 0.2s;
                        }
                        .article-body a:hover { color: #dc2626; }
                        .article-body hr { margin: 2.5rem 0; border-color: #e7e5e4; }
                    `}} />

                    <div className={`article-body ${fontSizeMap[fontSize]} ${fontFamily === 'serif' ? 'font-serif' : 'font-sans'}`}>
                        {article.content ? (
                            <div dangerouslySetInnerHTML={{ __html: article.content }} />
                        ) : (
                            <p>No content available for this article.</p>
                        )}
                    </div>
                </article>

                {/* Article Bottom Actions */}
                <div className="mt-8 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-stone-700 text-sm">
                        Enjoyed this article by <strong>Dr. Muhammad Salim</strong>? Share it with your friends and family.
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleShare}
                            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors cursor-pointer"
                        >
                            ↗ Share Article
                        </button>
                        <button
                            onClick={handleCopyLink}
                            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 font-semibold text-xs transition-colors cursor-pointer"
                        >
                            {copiedLink ? '✓ Copied' : 'Copy Link'}
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12 sm:mt-16">
                    <h2 className="text-2xl font-bold text-stone-900 mb-6 font-heading tracking-tight border-b border-stone-200 pb-3">
                        Reader Reflections & Comments ({comments.length})
                    </h2>

                    {/* Comments List */}
                    <div className="flex flex-col gap-4 mb-10">
                        {comments.length === 0 ? (
                            <p className="text-stone-500 italic text-sm">No comments yet. Be the first to share your reflection on this article.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div 
                                    key={comment._id || index} 
                                    className="border border-stone-200/90 rounded-2xl p-4 sm:p-6 bg-stone-50/70 flex flex-col sm:flex-row gap-4 items-start"
                                >
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-crimson-700 to-amber-700 shrink-0 shadow-2xs">
                                        {comment.author.substring(0, 2).toUpperCase()}
                                    </div>
                                    
                                    <div className="w-full flex-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-2">
                                            <span className="font-bold text-stone-900 text-sm">{comment.author}</span>
                                            <span className="text-[10px] text-stone-500 font-mono">
                                                {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-line">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Comment Form */}
                    <div className="bg-white p-6 sm:p-10 border border-stone-200/90 rounded-2xl sm:rounded-3xl shadow-xs">
                        <h3 className="text-lg font-bold text-stone-900 mb-6 font-heading">
                            Leave a Reflection
                        </h3>
                        
                        {submitSuccess ? (
                            <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 font-bold text-xs tracking-wider">
                                ✓ Submitted successfully. Your comment will appear once reviewed.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitComment} className="flex flex-col gap-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Name *</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            placeholder="Your name"
                                            className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Email *</label>
                                        <input 
                                            type="email" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="email@example.com"
                                            className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-stone-600">Your Reflection *</label>
                                    <textarea 
                                        required 
                                        rows={5}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your thoughts or reflections here..."
                                        className="bg-stone-50 border border-stone-300 rounded-xl px-4 py-3 text-stone-900 text-sm outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-700 transition-all resize-y"
                                    />
                                </div>
                                
                                {submitError && (
                                    <p className="text-rose-600 text-xs font-bold uppercase tracking-wider">{submitError}</p>
                                )}
                                
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="self-start px-6 py-3.5 rounded-xl bg-crimson-800 hover:bg-crimson-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Post Reflection →'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Back button */}
                <div className="text-center mt-12">
                    <Link href="/#articles" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all">
                        ← Back to Articles List
                    </Link>
                </div>
            </div>
        </main>
    );
}
