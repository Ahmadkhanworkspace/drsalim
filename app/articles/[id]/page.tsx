'use client';

import { getArticle, getCommentsForArticle, submitComment } from '@/app/lib/actions';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Article } from '@/data/articles';

export default function ArticlePage() {
    const params = useParams();
    const [article, setArticle] = useState<Article | undefined>(undefined);
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Comment Form State
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const articleId = parseInt(Array.isArray(params.id) ? params.id[0] : params.id || '0');
            const articleData = await getArticle(articleId);
            if (articleData) {
                setArticle(articleData);
                // Fetch comments using the DB _id of the article
                const commentsData = await getCommentsForArticle(articleData._id);
                setComments(commentsData || []);
            }
            setLoading(false);
        };
        fetchData();
    }, [params.id]);

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
            <div className="bg-charcoal-950 text-stone-200 min-h-screen flex items-center justify-center font-black tracking-widest text-xs">
                LOADING DISCOURSE...
            </div>
        );
    }

    if (!article) {
        return (
            <div className="bg-charcoal-950 text-stone-200 min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
                <h1 className="text-8xl font-black text-crimson-500 mb-6 font-heading">404</h1>
                <p className="text-stone-400 max-w-sm mb-12">The discourse you are seeking does not exist or has been archived.</p>
                <Link href="/#articles" className="btn btn-outline hover:shadow-[0_0_50px_rgba(153,0,0,0.2)]">
                    Return to Library
                </Link>
            </div>
        );
    }

    return (
        <main className="bg-charcoal-950 min-h-screen pb-24 text-stone-100 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(circle_at_top,rgba(153,0,0,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

            {/* Hero Header */}
            <div className="relative z-10 pt-32 pb-16 border-b border-white/5">
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    {/* Category Badge */}
                    <div 
                        className="inline-block px-5 py-1.5 text-[9px] font-black uppercase tracking-[0.3em] text-white mb-8"
                        style={{ backgroundColor: 'hsl(var(--crimson-500))' }}
                    >
                        {article.category}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 font-heading text-white tracking-tighter">
                        {article.title}
                    </h1>

                    {/* Meta info */}
                    <div className="flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">
                        <span>📅 {article.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson-500/50" />
                        <span>👁️ {article.views.toLocaleString()} Views</span>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container relative z-10" style={{ maxWidth: '1200px', margin: '3rem auto 0', padding: '0 1.5rem' }}>
                <div className="glass-card p-8 md:p-16 border border-white/5" style={{ backgroundColor: 'rgba(20, 20, 20, 0.6)' }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                        .article-body {
                            font-size: 1.15rem;
                            line-height: 1.9;
                            color: hsl(0 0% 80%);
                            font-family: var(--font-body), sans-serif;
                        }
                        .article-body p {
                            margin-bottom: 1.8rem;
                        }
                        .article-body h1, .article-body h2, .article-body h3, .article-body h4 {
                            color: #ffffff;
                            font-weight: 700;
                            margin-top: 3rem;
                            margin-bottom: 1.2rem;
                            line-height: 1.25;
                            font-family: var(--font-heading), serif;
                            letter-spacing: -0.02em;
                        }
                        .article-body h1 { font-size: 2.25rem; }
                        .article-body h2 { 
                            font-size: 1.85rem; 
                            border-left: 3px solid hsl(0 100% 30%); 
                            padding-left: 1rem; 
                            margin-left: -1rem;
                        }
                        .article-body h3 { font-size: 1.5rem; }
                        .article-body h4 { font-size: 1.25rem; }
                        .article-body blockquote {
                            border-left: 4px solid hsl(0 100% 30%);
                            padding: 1.25rem 2rem;
                            margin: 2.5rem 0;
                            font-style: italic;
                            color: hsl(0 0% 65%);
                            background-color: rgba(255, 255, 255, 0.02);
                            line-height: 1.8;
                        }
                        .article-body ul, .article-body ol {
                            margin-bottom: 1.8rem;
                            padding-left: 2rem;
                        }
                        .article-body ul {
                            list-style-type: disc;
                        }
                        .article-body ol {
                            list-style-type: decimal;
                        }
                        .article-body li {
                            margin-bottom: 0.6rem;
                        }
                        .article-body strong {
                            color: #ffffff;
                            font-weight: 700;
                        }
                        .article-body a {
                            color: hsl(0 100% 35%);
                            text-decoration: underline;
                            transition: color 0.2s;
                        }
                        .article-body a:hover {
                            color: hsl(0 100% 45%);
                        }
                        .article-body hr {
                            margin: 3rem 0;
                            border-color: rgba(255, 255, 255, 0.1);
                        }
                    `}} />
                    {article.content ? (
                        <div 
                            className="article-body"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />
                    ) : (
                        <div className="article-body">
                            <p>No content available for this article.</p>
                        </div>
                    )}
                </div>

                {/* Comments Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-white mb-8 font-heading tracking-tight border-b border-white/5 pb-4">
                        Comments ({comments.length})
                    </h2>

                    {/* Comments List */}
                    <div className="flex flex-col gap-6 mb-12">
                        {comments.length === 0 ? (
                            <p className="text-stone-400 italic text-sm">No approved comments yet. Be the first to share your comment.</p>
                        ) : (
                            comments.map((comment, index) => (
                                <div 
                                    key={comment._id || index} 
                                    className="border border-white/5 p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start"
                                    style={{ backgroundColor: 'rgba(20, 20, 20, 0.4)' }}
                                >
                                    {/* Initials Avatar */}
                                    <div 
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xs font-black text-white shrink-0 border border-white/10"
                                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}
                                    >
                                        {comment.author.substring(0, 2).toUpperCase()}
                                    </div>
                                    
                                    <div className="w-full flex-1">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4 mb-3">
                                            <span className="font-bold text-stone-200 text-sm">{comment.author}</span>
                                            <span className="text-[10px] text-stone-500 font-bold uppercase tracking-wider">
                                                {new Date(comment.createdAt).toLocaleDateString(undefined, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <p className="text-stone-300 leading-relaxed text-sm white-space-pre-line">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Comment Form */}
                    <div className="glass-card p-6 md:p-12 border border-white/5" style={{ backgroundColor: 'rgba(20, 20, 20, 0.6)' }}>
                        <h3 className="text-lg font-bold text-white mb-8 font-heading">
                            Share Your Comment
                        </h3>
                        
                        {submitSuccess ? (
                            <div className="p-6 border border-emerald-500/20 text-emerald-400 font-bold text-xs tracking-wider" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)' }}>
                                ✓ SUBMITTED SUCCESSFULLY. IT WILL BE VISIBLE ONCE APPROVED BY THE MODERATOR.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitComment} className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Name *</label>
                                        <input 
                                            type="text" 
                                            required 
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)}
                                            className="bg-black/30 border border-white/10 px-4 py-3 text-stone-200 text-sm outline-none focus:border-crimson-500 transition-colors duration-300"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email *</label>
                                        <input 
                                            type="email" 
                                            required 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-black/30 border border-white/10 px-4 py-3 text-stone-200 text-sm outline-none focus:border-crimson-500 transition-colors duration-300"
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Comment *</label>
                                    <textarea 
                                        required 
                                        rows={6}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        className="bg-black/30 border border-white/10 px-4 py-3 text-stone-200 text-sm outline-none focus:border-crimson-500 transition-colors duration-300 resize-y"
                                    />
                                </div>
                                
                                {submitError && (
                                    <p className="text-red-400 text-xs font-bold uppercase tracking-wider">{submitError}</p>
                                )}
                                
                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="btn btn-primary self-start border-none"
                                >
                                    {submitting ? 'SUBMITTING...' : 'SUBMIT COMMENT'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Back button */}
                <div className="text-center mt-12">
                    <Link href="/#articles" className="btn btn-outline hover:shadow-[0_0_50px_rgba(153,0,0,0.2)]">
                        ← Back to Articles
                    </Link>
                </div>
            </div>
        </main>
    );
}
