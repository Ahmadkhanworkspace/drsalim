'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
    // Sample data - will be replaced with real MongoDB data
    const [analytics] = useState({
        // Book Sales
        totalBookSales: 86,
        bookSalesGrowth: '+12.5% from last month',

        // Blog Metrics
        totalBlogViews: 4175625,
        blogViewsGrowth: '+8.3% from last month',
        todaysViews: 14449,
        todaysGrowth: '+15.2% from yesterday',
        last6MonthsViews: 4175625,
        last6MonthsGrowth: '+22.1% growth',

        // Engagement
        totalBlogComments: 741,
        commentsGrowth: '+5.7% from last month',
        totalBlogLikes: 4889,
        likesGrowth: '+18.9% from last month',

        // Individual Book Sales
        bookSales: [
            { name: 'Brotherhood', sales: 47 },
            { name: 'Divine Providence', sales: 21 },
            { name: 'Human Journey', sales: 5 },
            { name: 'Divine Providence Vol 2', sales: 0 },
            { name: 'Spiritual Diseases', sales: 13 }
        ],

        // Financial
        totalEarnings: 942,
        totalPayouts: 49,

        // Monthly Revenue - totals to $942 with 86 sales
        monthlyRevenue: [
            { month: 'Jan', revenue: 120, sales: 11 },
            { month: 'Feb', revenue: 135, sales: 13 },
            { month: 'Mar', revenue: 150, sales: 14 },
            { month: 'Apr', revenue: 125, sales: 12 },
            { month: 'May', revenue: 140, sales: 13 },
            { month: 'Jun', revenue: 272, sales: 23 },
        ]
    });

    const maxRevenue = Math.max(...analytics.monthlyRevenue.map(m => m.revenue));

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: '#0f172a',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.5px'
                }}>
                    Analytics & Revenue
                </h1>
                <p style={{
                    color: '#64748b',
                    fontSize: '1rem',
                    fontWeight: 500
                }}>
                    Comprehensive overview of your sales, traffic, and engagement metrics
                </p>
            </div>

            {/* Top Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                {/* Total Book Sales */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        📚 Total Book Sales
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.totalBookSales}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.bookSalesGrowth}
                    </div>
                </div>

                {/* Total Blog Views */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        👁️ Total Blog Views
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.totalBlogViews.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.blogViewsGrowth}
                    </div>
                </div>

                {/* Today's Views */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        📅 Today's Views
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.todaysViews.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.todaysGrowth}
                    </div>
                </div>

                {/* Last 6 Months Views */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        📊 Last 6 Months Views
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.last6MonthsViews.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.last6MonthsGrowth}
                    </div>
                </div>

                {/* Total Blog Comments */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        💬 Total Blog Comments
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.totalBlogComments}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.commentsGrowth}
                    </div>
                </div>

                {/* Total Blog Likes */}
                <div style={{
                    padding: 'var(--spacing-xl)',
                    background: 'white',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        color: '#64748b',
                        fontSize: '0.75rem',
                        marginBottom: '0.5rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontWeight: 600
                    }}>
                        ❤️ Total Blog Likes
                    </div>
                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        marginBottom: 'var(--spacing-sm)'
                    }}>
                        {analytics.totalBlogLikes.toLocaleString()}
                    </div>
                    <div style={{
                        color: '#10b981',
                        fontSize: '0.85rem',
                        fontWeight: 600
                    }}>
                        {analytics.likesGrowth}
                    </div>
                </div>
            </div>

            {/* Your Book Sales */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                }}>
                    📚 Your Book Sales
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {analytics.bookSales.map((book, index) => (
                        <div
                            key={index}
                            style={{
                                padding: 'var(--spacing-lg)',
                                background: '#f8fafc',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                color: '#64748b',
                                fontSize: '0.9rem',
                                marginBottom: 'var(--spacing-sm)',
                                fontWeight: 600
                            }}>
                                {book.name}
                            </div>
                            <div style={{
                                fontSize: '2.5rem',
                                fontWeight: 900,
                                color: '#3b82f6'
                            }}>
                                {book.sales}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Overview */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)'
                }}>
                    💰 Financial Overview
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-xl)'
                }}>
                    <div style={{
                        padding: 'var(--spacing-xl)',
                        background: 'linear-gradient(135deg, #10b98115 0%, #10b98105 100%)',
                        borderRadius: '12px',
                        border: '1px solid #86efac',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.9rem',
                            marginBottom: 'var(--spacing-md)',
                            fontWeight: 600
                        }}>
                            Total Earnings from Books
                        </div>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            color: '#10b981',
                            letterSpacing: '-1px'
                        }}>
                            ${analytics.totalEarnings}
                        </div>
                    </div>

                    <div style={{
                        padding: 'var(--spacing-xl)',
                        background: 'linear-gradient(135deg, #ef444415 0%, #ef444405 100%)',
                        borderRadius: '12px',
                        border: '1px solid #fecaca',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            color: '#64748b',
                            fontSize: '0.9rem',
                            marginBottom: 'var(--spacing-md)',
                            fontWeight: 600
                        }}>
                            Total Payouts
                        </div>
                        <div style={{
                            fontSize: '3rem',
                            fontWeight: 900,
                            color: '#ef4444',
                            letterSpacing: '-1px'
                        }}>
                            ${analytics.totalPayouts}
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div style={{
                background: 'white',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                padding: 'var(--spacing-xl)'
            }}>
                <h2 style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    marginBottom: 'var(--spacing-lg)',
                    letterSpacing: '-0.3px'
                }}>
                    Revenue Over Time
                </h2>

                {/* Simple Bar Chart */}
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 'var(--spacing-md)',
                    height: '300px',
                    padding: 'var(--spacing-lg) 0'
                }}>
                    {analytics.monthlyRevenue.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: `${(data.revenue / maxRevenue) * 250}px`,
                                background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)',
                                borderRadius: '8px 8px 0 0',
                                transition: 'all 0.3s',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scaleY(1.05)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scaleY(1)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '-30px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.85rem',
                                    fontWeight: 700,
                                    color: '#10b981',
                                    whiteSpace: 'nowrap'
                                }}>
                                    ${data.revenue}
                                </div>
                            </div>
                            <div style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: '#64748b'
                            }}>
                                {data.month}
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                color: '#94a3b8'
                            }}>
                                {data.sales} sales
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
