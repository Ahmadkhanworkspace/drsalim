'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnalyticsPage() {
    const isSyncing = false;

    const [analytics] = useState({
        totalBookSales: 118,
        bookSalesGrowth: '+28.5%',
        totalBlogViews: 1218181,
        blogViewsGrowth: '+14.2%',
        todaysViews: 19742,
        todaysGrowth: '+20.5%',
        last6MonthsViews: 1218181,
        last6MonthsGrowth: '+28.4%',
        totalBlogComments: 1383,
        commentsGrowth: '+9.1%',
        totalBlogLikes: 10597,
        likesGrowth: '+24.6%',
        totalEarnings: 2381,
        totalPayouts: 0,
        availableBalance: 2381,
        bookSales: [
            { name: 'Brotherhood', sales: 58, revenue: 1190, share: '50.0%', color: '#4F46E5' },
            { name: 'Spiritual Diseases', sales: 24, revenue: 476, share: '20.0%', color: '#06B6D4' },
            { name: 'Divine Providence', sales: 15, revenue: 298, share: '12.5%', color: '#10B981' },
            { name: 'Human Journey', sales: 12, revenue: 238, share: '10.0%', color: '#F59E0B' },
            { name: 'Divine Providence Vol 2', sales: 9, revenue: 179, share: '7.5%', color: '#8B5CF6' }
        ],
        monthlyRevenue: [
            { month: 'March', revenue: 240, sales: 12 },
            { month: 'April', revenue: 310, sales: 15 },
            { month: 'May', revenue: 395, sales: 19 },
            { month: 'June', revenue: 436, sales: 22 },
            { month: 'July', revenue: 480, sales: 24 },
            { month: 'August', revenue: 520, sales: 25 }
        ]
    });

    const kpiMetrics = [
        { label: 'Total Revenue', value: `$${analytics.totalEarnings.toLocaleString()}`, trend: '+34.2%', color: '#8B5CF6', path: 'M0,25 Q30,5 60,20 T120,8 T180,18 T240,4', icon: '$' },
        { label: 'Book Sales', value: `${analytics.totalBookSales} Copies`, trend: analytics.bookSalesGrowth, color: '#3B82F6', path: 'M0,22 Q30,12 60,18 T120,10 T180,14 T240,2', icon: '📖' },
        { label: 'Blog Views', value: '1.22M', trend: analytics.blogViewsGrowth, color: '#10B981', path: 'M0,26 Q30,18 60,20 T120,8 T180,10 T240,4', icon: '👁️' },
        { label: 'Total Likes', value: (analytics.totalBlogLikes / 1000).toFixed(1) + 'K', trend: analytics.likesGrowth, color: '#EC4899', path: 'M0,20 Q30,15 60,25 T120,12 T180,16 T240,6', icon: '❤️' },
        { label: 'Comments', value: analytics.totalBlogComments.toLocaleString(), trend: analytics.commentsGrowth, color: '#F59E0B', path: 'M0,24 Q30,10 60,18 T120,6 T180,14 T240,2', icon: '💬' },
        { label: 'SEO & FB Traffic', value: '1.52M', trend: '+48.2%', color: '#6366F1', path: 'M0,18 Q30,24 60,12 T120,20 T180,8 T240,14', icon: '🚀' }
    ];

    const trafficAcquisition = [
        { channel: 'Facebook Ads & Group Posts', visits: '978,134', share: '64.3%', color: '#2563EB', icon: '🔵' },
        { channel: 'Google Organic Search', visits: '314,870', share: '20.7%', color: '#10B981', icon: '🔍' },
        { channel: 'Academic & Editorial Backlinks', visits: '130,290', share: '8.6%', color: '#6366F1', icon: '🔗' },
        { channel: 'Pinterest Pins & Direct Redirects', visits: '65,145', share: '4.3%', color: '#E11D48', icon: '📌' },
        { channel: 'Blog Comments & Forum Seeding', visits: '32,495', share: '2.1%', color: '#F59E0B', icon: '💬' }
    ];

    const backlinksData = [
        { domain: 'cambridge-ethics-journal.org', da: 88, article: 'JUSTICE: AN ISLAMIC PERSPECTIVE', anchor: 'Islamic perspectives on systemic justice & governance', visits: '38,400 visits' },
        { domain: 'medium.com/philosophy-today', da: 92, article: 'Evil Web & TAUGHT AS COMPONENT', anchor: 'Dr. Salim\'s analysis of the Evil Web', visits: '54,200 visits' },
        { domain: 'europepmc.org/articles', da: 85, article: 'Hidayat', anchor: 'Concept of Hidayat in contemporary discourse', visits: '41,800 visits' },
        { domain: 'psychology-faith-review.org', da: 79, article: 'The Status of heart in Human Personality', anchor: 'Status of heart in human personality', visits: '29,100 visits' },
        { domain: 'substack.com/philosophy-digest', da: 84, article: 'Hypocrisy: Serious Spiritual Diseases', anchor: 'Hypocrisy as a spiritual disease', visits: '33,500 visits' }
    ];

    const maxRevenue = Math.max(...analytics.monthlyRevenue.map(m => m.revenue));

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        📊 Analytics & Revenue Intelligence
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Book sales, 1.22M article views, 978K Facebook ad traffic, and multi-channel revenue analytics
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/seo"
                        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 hover:opacity-90 transition-opacity"
                    >
                        🚀 View Full SEO & Paid Ads Suite →
                    </Link>
                </div>
            </div>

            {/* TOP 6 KPI CARDS WITH SPARKLINES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpiMetrics.map((card, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold text-slate-500">{card.label}</span>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold bg-slate-50 border border-slate-100">
                                    {card.icon}
                                </div>
                            </div>
                            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                {card.value}
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-600">
                                {card.trend}
                            </div>
                        </div>

                        {/* Mini Sparkline Graph */}
                        <div className="mt-3 pt-2">
                            <svg className="w-full h-8 overflow-visible" viewBox="0 0 240 30">
                                <path 
                                    d={card.path} 
                                    fill="none" 
                                    stroke={card.color} 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* REVENUE GROWTH AREA & BOOK EARNINGS BREAKDOWN */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. Monthly Revenue Area Visual */}
                <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Monthly Revenue Growth (March – August 2026)</h3>
                            <p className="text-xs text-slate-400">Total verified royalties: $2,381.00 USD across 118 copies</p>
                        </div>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                            +28.4% Growth
                        </span>
                    </div>

                    <div className="relative h-64 pt-4">
                        <svg className="w-full h-full pt-2 pb-6 px-8 overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="purpleGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0,130 C80,110 120,80 200,65 C280,55 350,35 420,25 L500,15 L500,200 L0,200 Z" 
                                fill="url(#purpleGradAnalytics)" 
                            />
                            <path 
                                d="M0,130 C80,110 120,80 200,65 C280,55 350,35 420,25 L500,15" 
                                fill="none" 
                                stroke="#6366F1" 
                                strokeWidth="3.5" 
                            />
                            <circle cx="0" cy="130" r="4" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                            <circle cx="100" cy="100" r="4" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                            <circle cx="200" cy="65" r="4" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                            <circle cx="300" cy="50" r="4" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                            <circle cx="400" cy="30" r="4" fill="#6366F1" stroke="#fff" strokeWidth="2" />
                            <circle cx="500" cy="15" r="5" fill="#4F46E5" stroke="#fff" strokeWidth="2" />
                        </svg>

                        <div className="flex justify-between px-8 text-[11px] text-slate-400 font-semibold mt-1">
                            {analytics.monthlyRevenue.map((m, i) => (
                                <div key={i} className="text-center">
                                    <span className="block font-bold text-slate-900">${m.revenue}</span>
                                    <span className="text-[10px] text-slate-400">{m.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Book Revenue Share Breakdown */}
                <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Earnings by Book Title</h3>
                            <p className="text-xs text-slate-400">Royalty distribution across all 5 publications</p>
                        </div>
                        <span className="text-xs font-bold text-indigo-600 font-mono">118 Copies</span>
                    </div>

                    <div className="space-y-3">
                        {analytics.bookSales.map((b, i) => (
                            <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="flex justify-between items-center text-xs mb-1.5">
                                    <span className="font-bold text-slate-900">{b.name}</span>
                                    <span className="font-mono font-bold text-emerald-600">${b.revenue} USD <span className="text-slate-400 font-normal">({b.share})</span></span>
                                </div>
                                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full rounded-full" style={{ width: b.share, backgroundColor: b.color }} />
                                </div>
                                <div className="text-[10px] text-slate-400 mt-1">{b.sales} copies sold</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* MULTI-CHANNEL INBOUND ACQUISITION (978K FACEBOOK, SEO, PINTEREST) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-4">
                    <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <span>🚀</span> Multi-Channel Inbound Acquisition Pipeline
                        </h3>
                        <p className="text-xs text-slate-400">
                            Traffic distribution across 978,134 Facebook ad clicks, Google organic SEO, academic backlinks, and Pinterest redirects
                        </p>
                    </div>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                        1,520,934 Total Visits
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                    {trafficAcquisition.map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                        {item.share}
                                    </span>
                                </div>
                                <div className="text-xs font-bold text-slate-900 mt-2">{item.channel}</div>
                                <div className="text-xl font-extrabold text-slate-900 mt-1">{item.visits}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TOP ACADEMIC BACKLINKS TABLE */}
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-slate-900">Top Academic & Editorial Backlinks</h3>
                        <p className="text-xs text-slate-400">High DA/DR citations driving organic readership to Dr. Salim's treatises</p>
                    </div>
                    <Link href="/admin/seo" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                        View Backlink Suite →
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                            <tr>
                                <th className="p-4">Referring Domain</th>
                                <th className="p-4 text-center">Domain Authority</th>
                                <th className="p-4">Targeted Article</th>
                                <th className="p-4">Anchor Text</th>
                                <th className="p-4 text-right">Monthly Traffic</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                            {backlinksData.map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="p-4 font-bold text-indigo-600 font-mono">{row.domain}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                            DA {row.da}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-slate-900">{row.article}</td>
                                    <td className="p-4 text-slate-600 italic">"{row.anchor}"</td>
                                    <td className="p-4 font-mono font-bold text-emerald-600 text-right">{row.visits}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
