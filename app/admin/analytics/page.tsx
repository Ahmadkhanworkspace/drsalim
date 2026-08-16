'use client';

import { useState } from 'react';

export default function AnalyticsPage() {
    const isSyncing = false;

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
            { name: 'Brotherhood', sales: 58 },
            { name: 'Spiritual Diseases', sales: 24 },
            { name: 'Divine Providence', sales: 15 },
            { name: 'Human Journey', sales: 12 },
            { name: 'Divine Providence Vol 2', sales: 9 }
        ],
        totalEarnings: 2381,
        totalPayouts: 0,
        monthlyRevenue: [
            { month: 'March', revenue: 240, sales: 12 },
            { month: 'April', revenue: 310, sales: 15 },
            { month: 'May', revenue: 395, sales: 19 },
            { month: 'June', revenue: 436, sales: 22 },
            { month: 'July', revenue: 480, sales: 24 },
            { month: 'August', revenue: 520, sales: 25 }
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

            {/* PROGRAMMATIC SEO & BACKLINK INTELLIGENCE MODULE */}
            <div style={{
                background: '#fff',
                borderRadius: '8px',
                border: '1px solid #D5D9D9',
                padding: '20px',
                marginTop: '20px',
                marginBottom: '20px'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #E3E6E6', paddingBottom: '12px' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F1111', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>🚀</span> Programmatic SEO & Backlink Intelligence (542.8K Monthly Traffic)
                        </h2>
                        <p style={{ fontSize: '0.8125rem', color: '#565959', margin: '4px 0 0 0' }}>
                            Attribution tracking across guest posts, DA/DR authority backlinks, blog comment referrals, and Search Console indexing
                        </p>
                    </div>
                    <span style={{ background: '#D1F4E0', color: '#067D62', fontSize: '0.75rem', fontWeight: 700, padding: '4px 10px', borderRadius: '12px' }}>
                        Google Indexing API: 99.2% Active
                    </span>
                </div>

                {/* SEO Traffic Channels Split */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                        { channel: 'Google Organic Search', visits: '314,870', share: '58.0%', color: '#067D62', icon: '🔍' },
                        { channel: 'Guest Post & Academic Backlinks', visits: '130,290', share: '24.0%', color: '#0066c0', icon: '🔗' },
                        { channel: 'Social Pins & Community', visits: '65,145', share: '12.0%', color: '#c7511f', icon: '📌' },
                        { channel: 'Blog Comments & Forum Seeding', visits: '32,585', share: '6.0%', color: '#8844ee', icon: '💬' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ padding: '12px', background: '#F7FAFA', border: '1px solid #D5D9D9', borderRadius: '6px' }}>
                            <div style={{ fontSize: '0.75rem', color: '#565959', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                                <span>{item.icon} {item.channel}</span>
                                <span style={{ color: item.color, fontWeight: 700 }}>{item.share}</span>
                            </div>
                            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F1111', marginTop: '6px' }}>
                                {item.visits} <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#6F7373' }}>visits/mo</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Backlinks & Guest Post Attribution Table */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F1111', marginBottom: '10px' }}>
                    Top Academic & Editorial Backlinks (Targeting Dr. Saleem Articles)
                </h3>
                <div style={{ overflowX: 'auto', border: '1px solid #E3E6E6', borderRadius: '6px', marginBottom: '20px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
                        <thead>
                            <tr style={{ background: '#F0F2F2', borderBottom: '1px solid #D5D9D9', textTransform: 'uppercase', fontSize: '0.6875rem', color: '#565959' }}>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Referring Domain</th>
                                <th style={{ padding: '10px', textAlign: 'center' }}>Domain Authority (DA)</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Targeted Article</th>
                                <th style={{ padding: '10px', textAlign: 'left' }}>Anchor Text</th>
                                <th style={{ padding: '10px', textAlign: 'right' }}>Monthly Traffic Attributed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { domain: 'cambridge-ethics-journal.org', da: 88, article: 'JUSTICE: AN ISLAMIC PERSPECTIVE', anchor: 'Islamic perspectives on systemic justice', visits: '38,400 visits' },
                                { domain: 'medium.com/philosophy-today', da: 92, article: 'Evil Web & TAUGHT AS COMPONENT', anchor: 'Dr. Saleem\'s analysis of the Evil Web', visits: '54,200 visits' },
                                { domain: 'europepmc.org/articles', da: 85, article: 'Hidayat', anchor: 'Concept of Hidayat in contemporary discourse', visits: '41,800 visits' },
                                { domain: 'psychology-faith-review.org', da: 79, article: 'The Status of heart in Human Personality', anchor: 'Status of heart in human personality', visits: '29,100 visits' },
                                { domain: 'substack.com/philosophy-digest', da: 84, article: 'Hypocrisy: Serious Spiritual Diseases', anchor: 'Hypocrisy as a spiritual disease', visits: '33,500 visits' }
                            ].map((row, i) => (
                                <tr key={i} style={{ borderBottom: '1px solid #F0F2F2' }}>
                                    <td style={{ padding: '10px', fontWeight: 600, color: '#0066c0' }}>{row.domain}</td>
                                    <td style={{ padding: '10px', textAlign: 'center' }}>
                                        <span style={{ background: '#D1F4E0', color: '#067D62', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>DA {row.da}</span>
                                    </td>
                                    <td style={{ padding: '10px', fontWeight: 600, color: '#0F1111' }}>{row.article}</td>
                                    <td style={{ padding: '10px', color: '#565959', fontStyle: 'italic' }}>"{row.anchor}"</td>
                                    <td style={{ padding: '10px', textAlign: 'right', fontWeight: 700, color: '#067D62' }}>{row.visits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Programmatic Keyword Ranking Matrix */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F1111', marginBottom: '10px' }}>
                    Programmatic Keyword Rankings & Search Console Velocity
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {[
                        { keyword: 'Islamic philosophy books', rank: '#1', impressions: '45.2k/mo', trend: '▲ +2 pos' },
                        { keyword: 'Spiritual diseases heart remedies', rank: '#1', impressions: '32.8k/mo', trend: '▲ +1 pos' },
                        { keyword: 'Classical ethics history summary', rank: '#2', impressions: '28.4k/mo', trend: '▲ +5 pos' },
                        { keyword: 'Divine providence theology analysis', rank: '#3', impressions: '19.1k/mo', trend: '▲ +3 pos' }
                    ].map((kw, i) => (
                        <div key={i} style={{ padding: '10px 14px', background: '#F7FAFA', border: '1px solid #D5D9D9', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0F1111' }}>{kw.keyword}</div>
                                <div style={{ fontSize: '0.6875rem', color: '#565959' }}>{kw.impressions} search volume</div>
                            </div>
                            <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#067D62' }}>{kw.rank}</div>
                                <div style={{ fontSize: '0.6875rem', color: '#067D62', fontWeight: 700 }}>{kw.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
