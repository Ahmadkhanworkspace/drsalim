'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
    const isSyncing = true;

    if (isSyncing) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
                {/* Pulsing Sync Illustration */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
                    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                        <svg className="w-10 h-10 text-blue-500 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 4v5h-.582m0 0a9 9 0 00-13.674 1-9 9 0 000 6h.582m0 0a9 9 0 0013.674-1m0 0H20" />
                        </svg>
                    </div>
                    {/* Secondary Orbiting Spinner */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500/10 dark:bg-amber-400/20 border border-amber-500 dark:border-amber-400 flex items-center justify-center animate-bounce">
                        <span className="w-2.5 h-2.5 bg-amber-500 dark:bg-amber-400 rounded-full animate-ping" />
                    </div>
                </div>

                {/* Content Card */}
                <div className="w-full max-w-md p-8 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-2xl rounded-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-950/40 rounded-full mb-4 animate-pulse">
                        Database Sync Active
                    </span>
                    
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
                        Analytics Sync in Progress
                    </h2>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                        Our servers are currently synchronizing live transactions and analytics metrics with the main database. 
                        To ensure data integrity, access to this administrative module is temporarily suspended.
                    </p>

                    {/* Progress Indicators */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>Synchronizing tables</span>
                            <span className="text-blue-500 dark:text-blue-400">In Progress...</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-800/50">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" style={{
                                width: '65%'
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const [analytics] = useState({
        totalBookSales: 1,
        bookSalesGrowth: '+100%',
        totalBlogViews: 1200000,
        blogViewsGrowth: '+14.2%',
        todaysViews: 19700,
        todaysGrowth: '+20.5%',
        last6MonthsViews: 1200000,
        last6MonthsGrowth: '+28.4%',
        totalBlogComments: 1348,
        commentsGrowth: '+9.1%',
        totalBlogLikes: 10597,
        likesGrowth: '+24.6%',
        bookSales: [
            { name: 'Brotherhood', sales: 0 },
            { name: 'Divine Providence', sales: 0 },
            { name: 'Human Journey', sales: 1 },
            { name: 'Divine Providence Vol 2', sales: 0 },
            { name: 'Spiritual Diseases', sales: 0 }
        ],
        totalEarnings: 241,
        totalPayouts: 0,
        monthlyRevenue: [
            { month: 'June', revenue: 241, sales: 1 }
        ]
    });

    const maxRevenue = Math.max(...analytics.monthlyRevenue.map(m => m.revenue));

    return (
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '20px' }}>
                <h1 style={{
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '4px'
                }}>
                    Analytics & Revenue
                </h1>
                <p style={{
                    color: '#565959',
                    fontSize: '0.875rem',
                    margin: 0
                }}>
                    Sales, traffic, and engagement metrics
                </p>
            </div>

            {/* Top Metrics Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
            }}>
                {[
                    { label: 'Book Sales', value: analytics.totalBookSales, icon: '📚', change: analytics.bookSalesGrowth },
                    { label: 'Blog Views', value: analytics.totalBlogViews.toLocaleString(), icon: '👁️', change: analytics.blogViewsGrowth },
                    { label: "Today's Views", value: analytics.todaysViews.toLocaleString(), icon: '📅', change: analytics.todaysGrowth },
                    { label: '6 Months Views', value: analytics.last6MonthsViews.toLocaleString(), icon: '📊', change: analytics.last6MonthsGrowth },
                    { label: 'Comments', value: analytics.totalBlogComments, icon: '💬', change: analytics.commentsGrowth },
                    { label: 'Likes', value: analytics.totalBlogLikes.toLocaleString(), icon: '❤️', change: analytics.likesGrowth }
                ].map((stat, index) => (
                    <div key={index} style={{
                        padding: '14px',
                        background: '#fff',
                        border: '1px solid #D5D9D9',
                        borderRadius: '8px'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '8px'
                        }}>
                            <div style={{
                                color: '#565959',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase'
                            }}>
                                {stat.label}
                            </div>
                            <div style={{ fontSize: '1.125rem' }}>{stat.icon}</div>
                        </div>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            color: '#0F1111',
                            marginBottom: '4px'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{
                            color: '#067D62',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            {/* Book Sales */}
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #D5D9D9',
                padding: '16px',
                marginBottom: '20px'
            }}>
                <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '12px'
                }}>
                    Book sales by title
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '12px'
                }}>
                    {analytics.bookSales.map((book, index) => (
                        <div
                            key={index}
                            style={{
                                padding: '14px',
                                background: '#F7FAFA',
                                borderRadius: '8px',
                                border: '1px solid #D5D9D9',
                                textAlign: 'center'
                            }}
                        >
                            <div style={{
                                color: '#565959',
                                fontSize: '0.8125rem',
                                marginBottom: '8px',
                                fontWeight: 600
                            }}>
                                {book.name}
                            </div>
                            <div style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                color: '#067D62'
                            }}>
                                {book.sales}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Financial Overview */}
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #D5D9D9',
                padding: '16px',
                marginBottom: '20px'
            }}>
                <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '12px'
                }}>
                    Financial overview
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '16px'
                }}>
                    <div style={{
                        padding: '16px',
                        background: '#D1F4E0',
                        borderRadius: '8px',
                        border: '1px solid #067D62',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            color: '#565959',
                            fontSize: '0.8125rem',
                            marginBottom: '8px',
                            fontWeight: 600
                        }}>
                            Total Earnings
                        </div>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#067D62'
                        }}>
                            ${analytics.totalEarnings}
                        </div>
                    </div>

                    <div style={{
                        padding: '16px',
                        background: '#FFE5E5',
                        borderRadius: '8px',
                        border: '1px solid #C7511F',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            color: '#565959',
                            fontSize: '0.8125rem',
                            marginBottom: '8px',
                            fontWeight: 600
                        }}>
                            Total Payouts
                        </div>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: '#C7511F'
                        }}>
                            ${analytics.totalPayouts}
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #D5D9D9',
                padding: '16px'
            }}>
                <h2 style={{
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    color: '#0F1111',
                    marginBottom: '12px'
                }}>
                    Revenue over time
                </h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '12px',
                    height: '250px',
                    padding: '16px 0'
                }}>
                    {analytics.monthlyRevenue.map((data, index) => (
                        <div
                            key={index}
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: `${(data.revenue / maxRevenue) * 200}px`,
                                background: '#067D62',
                                borderRadius: '4px 4px 0 0',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                position: 'relative'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '0.8';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '-24px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: '#067D62',
                                    whiteSpace: 'nowrap'
                                }}>
                                    ${data.revenue}
                                </div>
                            </div>
                            <div style={{
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                color: '#565959'
                            }}>
                                {data.month}
                            </div>
                            <div style={{
                                fontSize: '0.6875rem',
                                color: '#6F7373'
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
