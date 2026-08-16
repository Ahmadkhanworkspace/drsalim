'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('@/components/admin/Globe3D'), { ssr: false });

export default function AdminDashboardPage() {
    const [timeframe, setTimeframe] = useState('This Year');
    const [chartMode, setChartMode] = useState<'line' | 'bar'>('line');
    const [realtimeUsers, setRealtimeUsers] = useState(247);
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [aiPrompt, setAiPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [aiGenerating, setAiGenerating] = useState(false);

    useEffect(() => {
        const handleToggleAi = () => setIsAiOpen(prev => !prev);
        window.addEventListener('toggle-ai-assistant', handleToggleAi);

        const fluctuation = setInterval(() => {
            setRealtimeUsers(prev => {
                const change = Math.floor(Math.random() * 7) - 3;
                return Math.max(119, Math.min(432, prev + change));
            });
        }, 4000);

        return () => {
            window.removeEventListener('toggle-ai-assistant', handleToggleAi);
            clearInterval(fluctuation);
        };
    }, []);

    const handleAiGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!aiPrompt) return;
        setAiGenerating(true);
        setAiResponse('');
        setTimeout(() => {
            setAiResponse(`Draft excerpt for "${aiPrompt}":\n\nIn the classical tradition of spiritual purification (Tazkiyah), the intellect and heart must harmonize to reflect divine light. When we address moral and societal challenges, we must return to the primordial principles of justice, brotherhood, and sincere contemplation...`);
            setAiGenerating(false);
        }, 1200);
    };

    const kpiCards = [
        {
            title: 'Total Revenue',
            value: '$2,381',
            change: '+34.2% vs last month',
            icon: '$',
            iconBg: 'bg-purple-100 text-purple-600',
            strokeColor: '#8B5CF6',
            path: 'M0,25 Q30,5 60,20 T120,8 T180,18 T240,4',
        },
        {
            title: 'Books Sold',
            value: '118',
            change: '+28.5% vs last month',
            icon: '📖',
            iconBg: 'bg-blue-100 text-blue-600',
            strokeColor: '#3B82F6',
            path: 'M0,22 Q30,12 60,18 T120,10 T180,14 T240,2',
        },
        {
            title: 'Total Readers',
            value: '12.4K',
            change: '+18.7% vs last month',
            icon: '👥',
            iconBg: 'bg-pink-100 text-pink-600',
            strokeColor: '#EC4899',
            path: 'M0,20 Q30,15 60,25 T120,12 T180,16 T240,6',
        },
        {
            title: 'Page Views',
            value: '1.20M',
            change: '+42.1% vs last month',
            icon: '👁️',
            iconBg: 'bg-emerald-100 text-emerald-600',
            strokeColor: '#10B981',
            path: 'M0,26 Q30,18 60,20 T120,8 T180,10 T240,4',
        },
        {
            title: 'Reviews',
            value: '1,348',
            change: '+31.4% vs last month',
            icon: '⭐',
            iconBg: 'bg-amber-100 text-amber-600',
            strokeColor: '#F59E0B',
            path: 'M0,24 Q30,10 60,18 T120,6 T180,14 T240,2',
        },
        {
            title: 'Active Campaigns',
            value: '4 Channels',
            badge: 'Synced',
            badgeColor: 'bg-emerald-100 text-emerald-700',
            icon: '📢',
            iconBg: 'bg-indigo-100 text-indigo-600',
            strokeColor: '#10B981',
            path: 'M0,18 Q30,24 60,12 T120,20 T180,8 T240,14',
        }
    ];

    const revenueSources = [
        { name: 'Amazon KDP & FBA', share: '47.5%', amount: '$1,130', color: '#4F46E5' },
        { name: 'Etsy Marketplace', share: '25.4%', amount: '$605', color: '#06B6D4' },
        { name: 'Pinterest Commerce', share: '17.2%', amount: '$410', color: '#F59E0B' },
        { name: 'Barnes & Noble', share: '9.9%', amount: '$236', color: '#10B981' }
    ];

    const topBooks = [
        { rank: 1, title: 'Brotherhood (Spiritual Foundations)', format: '58 Copies', amount: '$1,190', change: '50.0% Share', icon: '📘' },
        { rank: 2, title: 'Spiritual Diseases & Management', format: '24 Copies', amount: '$476', change: '20.0% Share', icon: '📗' },
        { rank: 3, title: 'Divine Providence (Vol 1)', format: '15 Copies', amount: '$298', change: '12.5% Share', icon: '📙' },
        { rank: 4, title: 'Human Journey from Soul to Abode', format: '12 Copies', amount: '$238', change: '10.0% Share', icon: '📕' },
        { rank: 5, title: 'Divine Providence (Vol 2)', format: '9 Copies', amount: '$179', change: '7.5% Share', icon: '📓' },
    ];

    const formatSales = [
        { format: 'Paperback', count: '56', share: '47.5%', height: '85%', color: '#4F46E5' },
        { format: 'Ebook / Kindle', count: '30', share: '25.4%', height: '58%', color: '#38BDF8' },
        { format: 'Hardcover Set', count: '20', share: '17.2%', height: '40%', color: '#10B981' },
        { format: 'Audio Briefs', count: '12', share: '9.9%', height: '26%', color: '#F97316' },
    ];

    const recentActivities = [
        { icon: '🟣', title: 'New book "Divine Providence Vol 3" in preparation', time: '2 hours ago' },
        { icon: '⭐', title: '5-star review on "Brotherhood" from UK reader', time: '5 hours ago' },
        { icon: '📢', title: 'Omnichannel marketplace sync confirmed ($2,381.00 USD)', time: '1 day ago' },
        { icon: '💬', title: 'New comment on "Justice: An Islamic Perspective"', time: '2 days ago' },
        { icon: '💵', title: 'Payout of $1,248 completed via Bank transfer', time: '3 days ago' },
    ];

    const liveCountries = [
        { name: 'United States', count: '1,248', flag: '🇺🇸', percent: '42%' },
        { name: 'United Kingdom', count: '856', flag: '🇬🇧', percent: '22%' },
        { name: 'Canada', count: '432', flag: '🇨🇦', percent: '15%' },
        { name: 'Australia', count: '321', flag: '🇦🇺', percent: '11%' },
        { name: 'United Arab Emirates', count: '210', flag: '🇦🇪', percent: '10%' },
    ];

    return (
        <div className="space-y-6">
            
            {/* GREETING HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        Good Morning, Dr. Muhammad Salim 👋
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Welcome back! Here's what's happening with your author hub today.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-xs">
                        <span>📅</span>
                        <span>May 20, 2026</span>
                        <span className="text-slate-400">⌄</span>
                    </div>
                </div>
            </div>

            {/* OMNICHANNEL MARKETPLACE SYNC BANNER */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-start gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                    <div>
                        <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-2">
                            Omnichannel Marketplace Sync: Active & Synced
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-normal">
                                Amazon KDP • Etsy • Pinterest • B&N
                            </span>
                        </h4>
                        <p className="text-xs text-emerald-700 font-mono mt-0.5">
                            Live API & webhook feeds connected. Aggregate revenue of $2,381.00 USD tracked across 4 external selling channels.
                        </p>
                    </div>
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700">
                    🟢 Live Feeds Connected
                </div>
            </div>

            {/* ROW 1: 6 KPI METRIC CARDS WITH SPARKLINES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpiCards.map((card, idx) => (
                    <div 
                        key={idx} 
                        className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-bold text-slate-500">{card.title}</span>
                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${card.iconBg}`}>
                                    {card.icon}
                                </div>
                            </div>
                            <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                {card.value}
                            </div>
                            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
                                {card.change && (
                                    <span className="text-emerald-600 font-semibold">{card.change}</span>
                                )}
                                {card.badge && (
                                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${card.badgeColor}`}>
                                        {card.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Mini Sparkline Graph */}
                        <div className="mt-3 pt-2">
                            <svg className="w-full h-8 overflow-visible" viewBox="0 0 240 30">
                                <path 
                                    d={card.path} 
                                    fill="none" 
                                    stroke={card.strokeColor} 
                                    strokeWidth="2.5" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* ROW 2: 3 ANALYTICS VISUALIZATIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. REVENUE OVERVIEW (LINE CHART) */}
                <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Revenue Overview</h3>
                            <p className="text-xs text-slate-400">Total earnings from book sales and prints</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                                {timeframe} ⌄
                            </div>
                            <div className="flex bg-slate-100 p-0.5 rounded-lg">
                                <button 
                                    onClick={() => setChartMode('line')}
                                    className={`px-2 py-1 rounded text-xs ${chartMode === 'line' ? 'bg-white shadow-xs font-bold text-indigo-600' : 'text-slate-500'}`}
                                >
                                    📈
                                </button>
                                <button 
                                    onClick={() => setChartMode('bar')}
                                    className={`px-2 py-1 rounded text-xs ${chartMode === 'bar' ? 'bg-white shadow-xs font-bold text-indigo-600' : 'text-slate-500'}`}
                                >
                                    📊
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chart Container */}
                    <div className="relative h-64 pt-4">
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono pointer-events-none">
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$600</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$500</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$400</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$300</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$200</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$100</span></div>
                            <div className="border-b border-slate-100 pb-1 flex justify-between"><span>$0</span></div>
                        </div>

                        {/* Vector Area Curve */}
                        <svg className="w-full h-full pt-2 pb-6 px-8 overflow-visible" viewBox="0 0 500 200" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.35" />
                                    <stop offset="100%" stopColor="#818CF8" stopOpacity="0.0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0,130 C80,110 120,80 200,65 C280,55 350,35 420,25 L500,15 L500,200 L0,200 Z" 
                                fill="url(#purpleGrad)" 
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
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                            <span>Aug</span>
                        </div>
                    </div>
                </div>

                {/* 2. REVENUE SOURCES (DONUT CHART) */}
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Revenue Sources</h3>
                            <p className="text-xs text-slate-400">Distribution by source</p>
                        </div>
                        <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                            {timeframe} ⌄
                        </div>
                    </div>

                    {/* Donut Visual */}
                    <div className="relative my-4 flex items-center justify-center">
                        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#4F46E5" strokeWidth="4.5" strokeDasharray="47.5 100" strokeDashoffset="0" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#06B6D4" strokeWidth="4.5" strokeDasharray="25.4 100" strokeDashoffset="-47.5" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="17.2 100" strokeDashoffset="-72.9" />
                            <circle cx="18" cy="18" r="14" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="9.9 100" strokeDashoffset="-90.1" />
                        </svg>
                        <div className="absolute text-center">
                            <span className="text-base font-extrabold text-slate-900 block">$2,381</span>
                            <span className="text-[10px] text-slate-400 font-semibold">Total</span>
                        </div>
                    </div>

                    {/* Donut Legend Table */}
                    <div className="space-y-1.5 text-xs">
                        {revenueSources.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-slate-600">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span>{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-slate-400">{item.share}</span>
                                    <span className="font-bold text-slate-900">{item.amount}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Link href="/admin/finance" className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700 border-t border-slate-100">
                        View Full Finance Report →
                    </Link>
                </div>

                {/* 3. LIVE READER ACTIVITY (3D GLOBE / WORLD HEATMAP) */}
                <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Live Reader Activity</h3>
                            <p className="text-xs text-slate-400">Real-time reader activity</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 text-[10px] font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" /> {realtimeUsers} Live
                        </span>
                    </div>

                    {/* 3D Globe Visual Container */}
                    <div className="h-44 relative my-2 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <Globe3D realtimeUsers={realtimeUsers} />
                    </div>

                    {/* Country List */}
                    <div className="space-y-1.5 text-xs">
                        {liveCountries.map((c, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span>{c.flag}</span>
                                    <span className="text-slate-700 font-medium truncate max-w-[100px]">{c.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-slate-400">{c.percent}</span>
                                    <span className="font-bold text-slate-900 font-mono">{c.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ROW 3: 3 DETAILED BREAKDOWN WIDGETS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* 1. TOP PERFORMING BOOKS */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Top Performing Books</h3>
                            <p className="text-xs text-slate-400">Best selling books by revenue</p>
                        </div>
                        <Link href="/admin/books" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {topBooks.map((b) => (
                            <div key={b.rank} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3 min-w-0">
                                    <span className="text-xs font-bold text-slate-400 w-3">{b.rank}</span>
                                    <div className="w-9 h-11 rounded bg-slate-900 flex items-center justify-center text-base shadow-xs shrink-0">
                                        {b.icon}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold text-slate-900 truncate">{b.title}</div>
                                        <div className="text-[10px] text-slate-400">{b.format}</div>
                                    </div>
                                </div>
                                <div className="text-right shrink-0">
                                    <div className="text-xs font-bold text-slate-900">{b.amount}</div>
                                    <div className="text-[10px] font-bold text-emerald-600">{b.change}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. SALES BY FORMAT (VERTICAL BARS) */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Sales by Format</h3>
                            <p className="text-xs text-slate-400">Performance by book format</p>
                        </div>
                        <div className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                            {timeframe} ⌄
                        </div>
                    </div>

                    {/* Bar Chart Visual */}
                    <div className="h-56 flex items-end justify-around pt-6 pb-2 border-b border-slate-100">
                        {formatSales.map((item, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end w-14">
                                <div className="text-center">
                                    <span className="text-[11px] font-bold text-slate-900 font-mono block">{item.count}</span>
                                    <span className="text-[9px] font-semibold text-slate-400 font-mono">{item.share}</span>
                                </div>
                                <div 
                                    className="w-full rounded-t-lg transition-all duration-500 shadow-xs" 
                                    style={{ height: item.height, backgroundColor: item.color }} 
                                />
                            </div>
                        ))}
                    </div>

                    {/* Labels */}
                    <div className="flex justify-around text-center text-xs text-slate-600 font-medium">
                        {formatSales.map((item, i) => (
                            <div key={i} className="w-16 text-[11px] font-semibold truncate">{item.format}</div>
                        ))}
                    </div>
                </div>

                {/* 3. RECENT ACTIVITY FEED */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
                            <p className="text-xs text-slate-400">Latest updates from your hub</p>
                        </div>
                        <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                            View All
                        </button>
                    </div>

                    <div className="space-y-3.5">
                        {recentActivities.map((act, i) => (
                            <div key={i} className="flex items-start gap-3 text-xs">
                                <span className="text-sm mt-0.5">{act.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-slate-800 font-medium leading-snug">{act.title}</p>
                                    <span className="text-[10px] text-slate-400 font-mono">{act.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ROW 4: AI ASSISTANT PROMOTION & WRITING ENGINE */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg shadow-indigo-600/20">
                <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl shrink-0 backdrop-blur-sm">
                        🔮
                    </div>
                    <div>
                        <h4 className="text-lg font-bold">Boost Your Author Impact with AI</h4>
                        <p className="text-xs text-indigo-100/80 font-light">
                            Generate scholarly article outlines, optimize SEO tags, and analyze reader questions instantly.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsAiOpen(!isAiOpen)}
                        className="px-6 py-3 rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all whitespace-nowrap cursor-pointer"
                    >
                        {isAiOpen ? 'Close AI Engine' : 'Open AI Insights →'}
                    </button>
                </div>
            </div>

            {/* EXPANDABLE AI GENERATION MODAL/DRAWER */}
            {isAiOpen && (
                <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-md space-y-4 animate-fadeIn">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <h4 className="text-sm font-bold text-slate-900">Dr. Salim Scholarly AI Writing Companion</h4>
                        </div>
                        <button onClick={() => setIsAiOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs">
                            ✕
                        </button>
                    </div>

                    <form onSubmit={handleAiGenerate} className="space-y-3">
                        <input
                            type="text"
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="Enter a topic, e.g. 'The Role of Sincerity in Social Justice'..."
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={aiGenerating}
                                className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                            >
                                {aiGenerating ? 'Generating Draft...' : 'Generate Insight'}
                            </button>
                        </div>
                    </form>

                    {aiResponse && (
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed font-serif whitespace-pre-wrap">
                            {aiResponse}
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
