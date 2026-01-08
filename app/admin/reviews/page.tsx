'use client';

import { useState } from 'react';

interface Review {
    id: string;
    bookTitle: string;
    bookId: number;
    author: string;
    rating: number;
    comment: string;
    date: string;
    status: 'pending' | 'approved' | 'rejected';
    featured: boolean;
}

export default function ReviewsPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [reviews, setReviews] = useState<Review[]>([
        { id: '1', bookTitle: 'Brotherhood', bookId: 4, author: 'Ahmed Khan', rating: 5, comment: 'Absolutely transformative! This book changed my understanding of community and brotherhood in Islam. Dr. Salim\'s insights are profound and practical.', date: '2026-01-05', status: 'approved', featured: true },
        { id: '2', bookTitle: 'Brotherhood', bookId: 4, author: 'Fatima Ali', rating: 5, comment: 'A must-read for anyone seeking to strengthen their bonds with fellow Muslims. The examples are relatable and the guidance is clear.', date: '2026-01-04', status: 'approved', featured: false },
        { id: '3', bookTitle: 'Divine Providence', bookId: 1, author: 'Omar Hassan', rating: 4, comment: 'Deep theological insights presented in an accessible way. Some sections require multiple readings to fully grasp.', date: '2026-01-03', status: 'approved', featured: true },
        { id: '4', bookTitle: 'Spiritual Diseases', bookId: 5, author: 'Aisha Rahman', rating: 5, comment: 'This book is like a mirror for the soul. It helped me identify and work on my spiritual weaknesses. Highly recommended!', date: '2026-01-02', status: 'pending', featured: false },
        { id: '5', bookTitle: 'Human Journey', bookId: 2, author: 'Yusuf Ibrahim', rating: 4, comment: 'Thought-provoking exploration of life\'s purpose. The philosophical depth is impressive.', date: '2026-01-01', status: 'pending', featured: false },
        { id: '6', bookTitle: 'Brotherhood', bookId: 4, author: 'Maryam Siddiqui', rating: 3, comment: 'Good content but could be more concise. Some repetition in the middle chapters.', date: '2025-12-30', status: 'rejected', featured: false },
        { id: '7', bookTitle: 'Divine Providence', bookId: 1, author: 'Hassan Malik', rating: 5, comment: 'Dr. Salim\'s explanation of Rububiyah is unparalleled. This book deepened my faith and understanding of Allah\'s divine providence in every aspect of life.', date: '2025-12-29', status: 'approved', featured: true },
        { id: '8', bookTitle: 'Spiritual Diseases', bookId: 5, author: 'Zainab Ahmed', rating: 5, comment: 'A practical guide to spiritual purification. The remedies provided are actionable and rooted in authentic Islamic teachings. Every Muslim should read this!', date: '2025-12-28', status: 'approved', featured: false },
    ]);

    const stats = {
        total: reviews.length,
        pending: reviews.filter(r => r.status === 'pending').length,
        approved: reviews.filter(r => r.status === 'approved').length,
        rejected: reviews.filter(r => r.status === 'rejected').length,
        avgRating: (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    };

    const handleApprove = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    };

    const handleReject = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, status: 'rejected' as const } : r));
    };

    const handleToggleFeatured = (id: string) => {
        setReviews(reviews.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
    };

    const filteredReviews = activeTab === 'all' ? reviews : reviews.filter(r => r.status === activeTab);

    return (
        <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '4px'
                }}>
                    Reviews & Ratings
                </h1>
                <p style={{
                    color: '#565959',
                    fontSize: '0.875rem',
                    margin: 0
                }}>
                    Manage book reviews and reader feedback
                </p>
            </div>

            {/* Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Total Reviews</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>{stats.total}</div>
                </div>
                <div style={{ padding: '14px', background: '#FFF4E5', border: '1px solid #FF9900', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Pending</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF9900' }}>{stats.pending}</div>
                </div>
                <div style={{ padding: '14px', background: '#D1F4E0', border: '1px solid #067D62', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Approved</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#067D62' }}>{stats.approved}</div>
                </div>
                <div style={{ padding: '14px', background: '#fff', border: '1px solid #D5D9D9', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.75rem', color: '#565959', marginBottom: '4px', textTransform: 'uppercase' }}>Avg Rating</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0F1111' }}>⭐ {stats.avgRating}</div>
                </div>
            </div>

            {/* Tabs */}
            <div style={{
                background: '#fff',
                borderRadius: '8px 8px 0 0',
                border: '1px solid #D5D9D9',
                borderBottom: 'none',
                padding: '0',
                marginBottom: '0'
            }}>
                <div style={{ display: 'flex', gap: '0' }}>
                    {[
                        { id: 'all', label: 'All Reviews' },
                        { id: 'pending', label: 'Pending' },
                        { id: 'approved', label: 'Approved' },
                        { id: 'rejected', label: 'Rejected' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '12px 20px',
                                background: activeTab === tab.id ? '#fff' : '#F7FAFA',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid #FF9900' : '2px solid transparent',
                                color: activeTab === tab.id ? '#0F1111' : '#565959',
                                fontSize: '0.8125rem',
                                fontWeight: activeTab === tab.id ? 600 : 400,
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Reviews List */}
            <div style={{
                background: '#fff',
                border: '1px solid #D5D9D9',
                borderRadius: '0 0 8px 8px',
                padding: '20px'
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredReviews.map(review => (
                        <div key={review.id} style={{
                            padding: '16px',
                            background: '#F7FAFA',
                            border: '1px solid #D5D9D9',
                            borderRadius: '8px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                                <div>
                                    <div style={{ fontSize: '1rem', fontWeight: 600, color: '#0F1111', marginBottom: '4px' }}>
                                        {review.bookTitle}
                                    </div>
                                    <div style={{ fontSize: '0.75rem', color: '#565959' }}>
                                        by {review.author} • {review.date}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ fontSize: '1rem' }}>
                                        {'⭐'.repeat(review.rating)}
                                    </div>
                                    {review.featured && (
                                        <span style={{
                                            padding: '4px 8px',
                                            background: '#FFD814',
                                            color: '#0F1111',
                                            fontSize: '0.6875rem',
                                            fontWeight: 600,
                                            borderRadius: '4px'
                                        }}>
                                            FEATURED
                                        </span>
                                    )}
                                    <span style={{
                                        padding: '4px 8px',
                                        background: review.status === 'approved' ? '#D1F4E0' : review.status === 'pending' ? '#FFF4E5' : '#FFE5E5',
                                        color: review.status === 'approved' ? '#067D62' : review.status === 'pending' ? '#FF9900' : '#C7511F',
                                        fontSize: '0.6875rem',
                                        fontWeight: 600,
                                        borderRadius: '4px',
                                        textTransform: 'uppercase'
                                    }}>
                                        {review.status}
                                    </span>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.875rem', color: '#0F1111', lineHeight: '1.6', margin: '0 0 12px 0' }}>
                                {review.comment}
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {review.status === 'pending' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(review.id)}
                                            style={{
                                                padding: '6px 14px',
                                                background: '#067D62',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#fff',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ✓ Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(review.id)}
                                            style={{
                                                padding: '6px 14px',
                                                background: '#C7511F',
                                                border: 'none',
                                                borderRadius: '4px',
                                                color: '#fff',
                                                fontSize: '0.75rem',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            ✗ Reject
                                        </button>
                                    </>
                                )}
                                {review.status === 'approved' && (
                                    <button
                                        onClick={() => handleToggleFeatured(review.id)}
                                        style={{
                                            padding: '6px 14px',
                                            background: review.featured ? '#fff' : '#FFD814',
                                            border: '1px solid #D5D9D9',
                                            borderRadius: '4px',
                                            color: '#0F1111',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {review.featured ? '★ Unfeature' : '☆ Feature'}
                                    </button>
                                )}
                                <button
                                    style={{
                                        padding: '6px 14px',
                                        background: '#fff',
                                        border: '1px solid #D5D9D9',
                                        borderRadius: '4px',
                                        color: '#0F1111',
                                        fontSize: '0.75rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    💬 Respond
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
