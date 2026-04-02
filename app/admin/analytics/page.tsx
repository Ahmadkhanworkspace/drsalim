'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
    const [analytics] = useState({
        totalBookSales: 195,
        bookSalesGrowth: '+22.5%',
        totalBlogViews: 9095687,
        blogViewsGrowth: '+14.2%',
        todaysViews: 19700,
        todaysGrowth: '+20.5%',
        last6MonthsViews: 9095687,
        last6MonthsGrowth: '+28.4%',
        totalBlogComments: 1348,
        commentsGrowth: '+9.1%',
        totalBlogLikes: 10597,
        likesGrowth: '+24.6%',
        bookSales: [
            { name: 'Brotherhood', sales: 112 },
            { name: 'Divine Providence', sales: 48 },
            { name: 'Human Journey', sales: 9 },
            { name: 'Divine Providence Vol 2', sales: 0 },
            { name: 'Spiritual Diseases', sales: 26 }
        ],
        totalEarnings: 2142,
        totalPayouts: 0,
        monthlyRevenue: [
            { month: 'Oct', revenue: 210, sales: 19 },
            { month: 'Nov', revenue: 242, sales: 22 },
            { month: 'Dec', revenue: 310, sales: 28 },
            { month: 'Jan', revenue: 385, sales: 35 },
            { month: 'Feb', revenue: 462, sales: 42 },
            { month: 'Mar', revenue: 533, sales: 49 },
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
