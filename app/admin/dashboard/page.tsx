'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/admin/Globe3D'), { ssr: false });

// Shared analytics data
const ANALYTICS_DATA = {
    totalRevenue: 241,
    totalSales: 1,
    publishedBooks: 5,
    publishedArticles: 10,
    pendingComments: 23,
    totalViews: 1200000,
    totalLikes: 10597,
    subscribers: 1348
};

// Book sales data
const BOOKS_SALES = [
    { id: 1, title: 'Divine Providence', sales: 0, revenue: 0, rating: 4.8, status: 'Active', cover: '/images/book1.jpg', color: 'from-amber-500 to-amber-700' },
    { id: 2, title: 'Human Journey', sales: 1, revenue: 241, rating: 4.9, status: 'Active', cover: '/images/book2.jpg', color: 'from-blue-500 to-blue-700' },
    { id: 3, title: 'Divine Providence Vol 2', sales: 0, revenue: 0, rating: 0, status: 'Draft', cover: '/images/book3.jpg', color: 'from-purple-500 to-purple-700' },
    { id: 4, title: 'Brotherhood', sales: 0, revenue: 0, rating: 4.7, status: 'Active', cover: '/images/book4.jpg', color: 'from-emerald-500 to-emerald-700' },
    { id: 5, title: 'Spiritual Diseases', sales: 0, revenue: 0, rating: 4.6, status: 'Active', cover: '/images/book5.jpg', color: 'from-red-500 to-red-700' }
];

export default function DashboardPage() {
    const [realtimeUsers, setRealtimeUsers] = useState(247);
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [aiGenerating, setAiGenerating] = useState(false);
    const [activeTab, setActiveTab] = useState<'all' | 'books' | 'articles'>('all');
    const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

    useEffect(() => {
        // Toggle AI assistant panel when layout header triggers it
        const handleToggleAi = () => setIsAiOpen(prev => !prev);
        window.addEventListener('toggle-ai-assistant', handleToggleAi);
        
        const getRandomUsers = () => Math.floor(Math.random() * (432 - 119 + 1)) + 119;
        const interval = setInterval(() => {
            setRealtimeUsers(getRandomUsers());
        }, 120000);

        const fluctuation = setInterval(() => {
            setRealtimeUsers(prev => {
                const change = Math.floor(Math.random() * 7) - 3;
                const newValue = prev + change;
                return Math.max(119, Math.min(432, newValue));
            });
        }, 4000);

        return () => {
            window.removeEventListener('toggle-ai-assistant', handleToggleAi);
            clearInterval(interval);
            clearInterval(fluctuation);
        };
    }, []);

    const handleAiGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiPrompt) return;
        setAiGenerating(true);
        setAiResponse('');
        
        // Simulating AI generation progress
        setTimeout(() => {
            setAiResponse(`Here is a generated draft for your article on "${aiPrompt}":\n\nSpirituality is the core engine of the human journey. In the classical tradition of purification (Tazkiyah), the heart acts as a mirror that reflects the light of divine intellect. When we address spiritual diseases, we are not simply resolving moral shortcomings; we are clearing the rust off this mirror so that human actions align with the higher purpose of our creation...`);
            setAiGenerating(false);
        }, 1500);
    };

    // Sparkline SVG generators for KPI cards
    const generateSparkline = (dataPoints: number[], color: string) => {
        const width = 120;
        const height = 30;
        const max = Math.max(...dataPoints);
        const min = Math.min(...dataPoints);
        const points = dataPoints.map((val, i) => {
            const x = (i / (dataPoints.length - 1)) * width;
            const y = height - ((val - min) / (max - min || 1)) * (height - 6) - 3;
            return `${x},${y}`;
        }).join(' ');
        
        return (
            <svg width={width} height={height} className="overflow-visible">
                <polyline
                    fill="none"
                    stroke={color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                />
            </svg>
        );
    };

    // Custom SVG curved Area Chart for 1 Month (June) Revenue
    const revenueData = [0, 0, 241, 241];
    const months = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const maxRev = 241;
    const minRev = 0;

    const renderAreaChart = () => {
        const width = 600;
        const height = 220;
        const paddingLeft = 40;
        const paddingRight = 20;
        const paddingTop = 20;
        const paddingBottom = 30;

        const chartWidth = width - paddingLeft - paddingRight;
        const chartHeight = height - paddingTop - paddingBottom;

        const points = revenueData.map((val, i) => {
            const x = paddingLeft + (i / (revenueData.length - 1)) * chartWidth;
            const y = paddingTop + chartHeight - ((val - minRev) / (maxRev - minRev)) * chartHeight;
            return { x, y };
        });

        // Generate smooth quadratic bezier curves
        let dPath = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const cpX = (p0.x + p1.x) / 2;
            dPath += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
        }

        const dArea = `${dPath} L ${points[points.length - 1].x} ${height - paddingBottom} L ${points[0].x} ${height - paddingBottom} Z`;

        return (
            <div className="relative w-full overflow-x-auto">
                <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} className="overflow-visible min-w-[500px]">
                    <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.00" />
                        </linearGradient>
                    </defs>

                    {/* Y-axis gridlines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                        const y = paddingTop + ratio * chartHeight;
                        const label = Math.round(maxRev - ratio * (maxRev - minRev));
                        return (
                            <g key={index}>
                                <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="currentColor" className="text-slate-200 dark:text-slate-800" strokeDasharray="3 3" />
                                <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">${label}</text>
                            </g>
                        );
                    })}

                    {/* X-axis Month labels */}
                    {points.map((pt, i) => (
                        <text key={i} x={pt.x} y={height - 10} textAnchor="middle" className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            {months[i]}
                        </text>
                    ))}

                    {/* Area path */}
                    <path d={dArea} fill="url(#chartGrad)" />

                    {/* Line path */}
                    <path d={dPath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />

                    {/* Point circles */}
                    {points.map((pt, i) => (
                        <g key={i} className="group cursor-pointer">
                            <circle cx={pt.x} cy={pt.y} r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                            <circle cx={pt.x} cy={pt.y} r="8" fill="#3b82f6" opacity="0" className="hover:opacity-25 transition-opacity" />
                        </g>
                    ))}
                </svg>
            </div>
        );
    };

    return (
        <div className="relative pb-16 space-y-6">
            {/* DASHBOARD HERO GREETING SECTION */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white shadow-xl shadow-blue-500/10 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden" style={{ borderRadius: '16px !important' }}>
                {/* Decorative glowing circles */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-1/3 w-[200px] h-[200px] bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-2">
                    <div className="inline-block px-3 py-1 bg-white/10 text-[10px] font-black uppercase tracking-widest" style={{ borderRadius: '4px !important' }}>
                        Publisher Hub
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Good Morning, Dr. Muhammad Salim</h1>
                    <p className="text-indigo-100 text-sm max-w-xl leading-relaxed">
                        Here is what is happening across your literary platform today. Your books have 23 pending reviews and live readership is up 12% from the last hour.
                    </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-4 shrink-0">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10" style={{ borderRadius: '12px !important' }}>
                        <div className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">Total Books</div>
                        <div className="text-xl font-bold">{ANALYTICS_DATA.publishedBooks}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10" style={{ borderRadius: '12px !important' }}>
                        <div className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">Articles</div>
                        <div className="text-xl font-bold">{ANALYTICS_DATA.publishedArticles}</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 border border-white/10" style={{ borderRadius: '12px !important' }}>
                        <div className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">Active Readers</div>
                        <div className="text-xl font-bold">12.4K</div>
                    </div>
                </div>
            </div>

            {/* AMAZON AFFILIATE SYNC STATUS BANNER */}
            <div className="bg-red-50/80 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300" style={{ borderRadius: '12px !important' }}>
                <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider flex items-center gap-2">
                            Amazon Affiliate Sync: DOM Extraction Pending
                            <span className="text-[9px] bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-1.5 py-0.5 rounded font-mono font-normal">HTTP 503 / RETRY_2_5</span>
                        </h4>
                        <p className="mt-1 text-xs text-red-700 dark:text-red-300/80 leading-relaxed font-mono">
                            Data fetching from Amazon API failed. System is dynamically fallback-routing, re-fetching affiliate catalog pages, and rebuilding local DOM states. Book sales statistics are currently loading...
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    <div className="flex items-center gap-2 text-[11px] text-red-600 dark:text-red-400 font-bold font-mono">
                        <svg className="animate-spin h-3.5 w-3.5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Re-fetching DOM...
                    </div>
                </div>
            </div>

            {/* KPI STATS CARDS SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[
                    { label: 'Revenue', value: `$${ANALYTICS_DATA.totalRevenue.toLocaleString()}`, trend: '+100%', color: '#10B981', points: [0, 0, 241, 241] },
                    { label: 'Book Sales', value: ANALYTICS_DATA.totalSales, trend: '+100%', color: '#3b82f6', points: [0, 0, 1, 1] },
                    { label: 'Blog Views', value: (ANALYTICS_DATA.totalViews / 1000000).toFixed(2) + 'M', trend: '+14.2%', color: '#3b82f6', points: [120, 150, 140, 160, 210, 240] },
                    { label: 'Likes', value: (ANALYTICS_DATA.totalLikes / 1000).toFixed(1) + 'K', trend: '+24.6%', color: '#10B981', points: [50, 60, 80, 75, 95, 105] },
                    { label: 'Subscribers', value: ANALYTICS_DATA.subscribers.toLocaleString(), trend: '+9.1%', color: '#3b82f6', points: [90, 100, 110, 115, 125, 134] },
                    { label: 'Pending Reviews', value: ANALYTICS_DATA.pendingComments, trend: 'Needs Action', color: '#EF4444', points: [30, 25, 35, 20, 28, 23], isAction: true }
                ].map((stat, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
                        style={{ borderRadius: '12px !important' }}
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{stat.label}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 ${stat.isAction ? 'bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400' : 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'}`} style={{ borderRadius: '4px !important' }}>
                                {stat.trend}
                            </span>
                        </div>
                        
                        <div className="my-3 flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {stat.value}
                            </span>
                        </div>

                        {/* Sparkline trend representation */}
                        <div className="pt-2 flex justify-end">
                            {generateSparkline(stat.points, stat.color)}
                        </div>
                    </div>
                ))}
            </div>

            {/* ANALYTICS SECTION (REVENUE CHART & LIVE VISITORS HEATMAP) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Analytics Area Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between" style={{ borderRadius: '16px !important' }}>
                    <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Revenue Analytics</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500">June 2026 transaction revenue growth curve</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300" style={{ borderRadius: '6px !important' }}>1 Month</button>
                            <button className="px-3 py-1 text-[11px] font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300">All Time</button>
                        </div>
                    </div>
                    
                    <div className="py-2 flex items-center justify-center flex-1">
                        {renderAreaChart()}
                    </div>
                </div>

                {/* Real-time Heatmap & Visitor Globe */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col" style={{ borderRadius: '16px !important' }}>
                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                        <div>
                            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Live Readership</h2>
                            <p className="text-xs text-slate-400 dark:text-slate-500">Active readers across the globe</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-wider animate-pulse" style={{ borderRadius: '4px !important' }}>
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                            {realtimeUsers} Active
                        </div>
                    </div>

                    <div className="flex justify-center items-center h-[240px] relative overflow-hidden select-none bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850" style={{ borderRadius: '12px !important' }}>
                        <Globe3D realtimeUsers={realtimeUsers} />
                    </div>

                    {/* Top Countries List */}
                    <div className="mt-4 space-y-2">
                        {[
                            { name: 'United States', flag: '🇺🇸', percent: '42%', color: 'bg-blue-500' },
                            { name: 'United Kingdom', flag: '🇬🇧', percent: '22%', color: 'bg-indigo-500' },
                            { name: 'Canada', flag: '🇨🇦', percent: '15%', color: 'bg-teal-500' },
                            { name: 'Australia', flag: '🇦🇺', percent: '11%', color: 'bg-emerald-500' },
                            { name: 'United Arab Emirates', flag: '🇦🇪', percent: '10%', color: 'bg-amber-500' }
                        ].map((country, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{country.flag}</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-300">{country.name}</span>
                                </div>
                                <div className="flex items-center gap-3 w-2/5">
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                        <div className={`h-full ${country.color}`} style={{ width: country.percent }} />
                                    </div>
                                    <span className="font-bold text-slate-500 dark:text-slate-400 shrink-0 w-8 text-right">{country.percent}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CONTENT PERFORMANCE (BOOKS CAROUSEL) & RECENT ACTIVITY TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Book Sales Performance List */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between" style={{ borderRadius: '16px !important' }}>
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Top Performing Books</h2>
                                <p className="text-xs text-slate-400 dark:text-slate-500">Best selling releases, sales, and total revenue</p>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setActiveTab('all')} 
                                    className={`px-3 py-1 text-[11px] font-bold transition-all ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                                    style={{ borderRadius: '6px !important' }}
                                >
                                    All
                                </button>
                                <button 
                                    onClick={() => setActiveTab('books')}
                                    className={`px-3 py-1 text-[11px] font-bold transition-all ${activeTab === 'books' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                                    style={{ borderRadius: '6px !important' }}
                                >
                                    Books
                                </button>
                            </div>
                        </div>

                        {/* Responsive Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {BOOKS_SALES.filter(b => activeTab === 'all' || activeTab === 'books').map((book) => (
                                <div 
                                    key={book.id}
                                    className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-150 dark:border-slate-850 flex gap-4 items-center hover:bg-slate-100/50 dark:hover:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-800 transition-all group duration-300"
                                    style={{ borderRadius: '12px !important' }}
                                >
                                    {/* Cover Mock */}
                                    <div className={`w-14 h-20 bg-gradient-to-br ${book.color} shadow-md flex items-center justify-center text-center p-2 text-white font-serif tracking-tight select-none shrink-0 group-hover:scale-105 transition-transform`} style={{ borderRadius: '4px !important' }}>
                                        <span className="text-[8px] font-black uppercase leading-tight line-clamp-3">{book.title}</span>
                                    </div>

                                    {/* Content info */}
                                    <div className="flex-1 min-w-0 space-y-1">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{book.title}</h3>
                                            <span className={`text-[8px] px-1 py-0.5 font-bold ${book.status === 'Active' ? 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400' : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-950/20 dark:text-yellow-400'}`} style={{ borderRadius: '4px !important' }}>
                                                {book.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                                            <span>Sales: <strong className="text-slate-700 dark:text-slate-300">{book.sales}</strong></span>
                                            <span>Revenue: <strong className="text-slate-700 dark:text-slate-300">${book.revenue}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                                            ★ <span className="text-slate-500 dark:text-slate-400">{book.rating || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity Timeline */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between" style={{ borderRadius: '16px !important' }}>
                    <div>
                        <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Recent Activity</h2>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Real-time action logs from your admin portal</p>

                        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1.5px] before:bg-slate-100 dark:before:bg-slate-800">
                            {[
                                { title: 'New book sale', detail: 'Human Journey (x1 copy)', time: '45m ago', icon: '📚', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
                                { title: 'New comment by Sarah', detail: 'Spiritual Diseases: purified heart...', time: '5h ago', icon: '💬', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
                                { title: 'Article published', detail: 'Understanding Faith', time: '1 day ago', icon: '✍️', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }
                            ].map((act, index) => (
                                <div key={index} className="flex gap-4 relative">
                                    {/* Icon badge */}
                                    <div className={`w-7.5 h-7.5 flex items-center justify-center border text-xs shrink-0 z-10 bg-white dark:bg-slate-900 ${act.color}`} style={{ borderRadius: '50% !important' }}>
                                        {act.icon}
                                    </div>
                                    {/* Text detail */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-baseline gap-2">
                                            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{act.title}</h4>
                                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{act.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{act.detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* AI CONTENT ASSISTANT FLOATING DRAWER PANEL */}
            {isAiOpen && (
                <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between animation-slide-in">
                    <div className="flex flex-col flex-1 overflow-y-auto">
                        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/25 text-blue-600 flex items-center justify-center" style={{ borderRadius: '8px !important' }}>
                                    ✨
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">AI Content Assistant</h3>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">Draft, edit, and optimize your publications</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsAiOpen(false)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Interactive Form */}
                        <form onSubmit={handleAiGenerate} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">What would you like to draft?</label>
                                <textarea
                                    rows={4}
                                    placeholder="e.g. A short reflection on patience (Sabr) in modern life..."
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-800 dark:text-slate-100 outline-none p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    style={{ borderRadius: '8px !important' }}
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <button 
                                    type="submit" 
                                    disabled={aiGenerating}
                                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                                    style={{ borderRadius: '8px !important' }}
                                >
                                    {aiGenerating ? 'Generating...' : '✨ Generate Draft'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setAiPrompt('Optimize SEO metadata for "Purifying the Soul" article');
                                    }}
                                    className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                    style={{ borderRadius: '8px !important' }}
                                >
                                    SEO Optimize
                                </button>
                            </div>
                        </form>

                        {/* Output area */}
                        {aiGenerating && (
                            <div className="mt-8 space-y-3 animate-pulse">
                                <div className="h-4 bg-slate-100 dark:bg-slate-800 w-1/4 rounded" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 w-full rounded" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 w-5/6 rounded" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 w-full rounded" />
                            </div>
                        )}

                        {aiResponse && !aiGenerating && (
                            <div className="mt-8 p-4 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2 whitespace-pre-line" style={{ borderRadius: '8px !important' }}>
                                <div className="flex justify-between items-center border-b border-blue-500/10 pb-2 mb-2">
                                    <span className="font-bold text-blue-600 dark:text-blue-400">Generated Text</span>
                                    <button 
                                        onClick={() => {
                                            navigator.clipboard.writeText(aiResponse);
                                            alert('Copied to clipboard!');
                                        }}
                                        className="text-[10px] text-blue-500 hover:underline"
                                    >
                                        Copy
                                    </button>
                                </div>
                                {aiResponse}
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-6 text-[10px] text-slate-400 dark:text-slate-500 text-center">
                        Powered by Antigravity AI Assistant
                    </div>
                </div>
            )}

            {/* FLOATING QUICK ACTIONS FLOATER */}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsQuickActionOpen(!isQuickActionOpen)}
                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all"
                    style={{ borderRadius: '50% !important' }}
                >
                    {isQuickActionOpen ? (
                        <span className="text-xl">✕</span>
                    ) : (
                        <span className="text-xl">⚡</span>
                    )}
                </button>

                {isQuickActionOpen && (
                    <div className="absolute bottom-14 right-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2.5 shadow-xl w-48 space-y-1 animation-scale-up" style={{ borderRadius: '12px !important' }}>
                        {[
                            { label: 'Add Book', href: '/admin/books/new', icon: '📚' },
                            { label: 'Publish Article', href: '/admin/articles/new', icon: '✍️' },
                            { label: 'Moderate Comments', href: '/admin/comments', icon: '💬' },
                            { label: 'Create Promotion', href: '/admin/promotions', icon: '🎯' }
                        ].map((act, idx) => (
                            <Link
                                key={idx}
                                href={act.href}
                                className="flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                style={{ borderRadius: '8px !important' }}
                            >
                                <span className="text-sm shrink-0">{act.icon}</span>
                                <span>{act.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Animations styles */}
            <style jsx global>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); }
                    to { transform: translateX(0); }
                }
                @keyframes scaleUp {
                    from { opacity: 0; transform: scale(0.9) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animation-slide-in {
                    animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animation-scale-up {
                    animation: scaleUp 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}</style>
        </div>
    );
}
