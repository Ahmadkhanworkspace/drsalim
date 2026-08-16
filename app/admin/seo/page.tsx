'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SeoIntelligencePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'backlinks' | 'pinterest' | 'keywords' | 'redirects'>('overview');

    const totalSeoTraffic = '542,800';
    const totalBacklinks = 184;
    const indexedPages = 42;
    const avgDomainAuthority = 84;

    const trafficSources = [
        { source: 'Google Organic Search', visits: '314,870', share: '58.0%', trend: '+24.5%', color: '#10B981', icon: '🔍' },
        { source: 'Academic & Editorial Backlinks', visits: '130,290', share: '24.0%', trend: '+18.2%', color: '#3B82F6', icon: '🔗' },
        { source: 'Pinterest Pins & Direct Redirects', visits: '65,145', share: '12.0%', trend: '+31.8%', color: '#E11D48', icon: '📌' },
        { source: 'Forums, Community & Comment Referrals', visits: '32,495', share: '6.0%', trend: '+12.4%', color: '#8B5CF6', icon: '💬' }
    ];

    const backlinksData = [
        {
            domain: 'cambridge-ethics-journal.org',
            da: 88,
            dr: 86,
            targetedPage: '/articles/justice-islamic-perspective',
            targetTitle: 'Justice: An Islamic Perspective',
            anchorText: 'Islamic perspectives on systemic justice & governance',
            monthlyTraffic: '38,400 visits',
            type: 'Editorial Dofollow',
            status: 'Active'
        },
        {
            domain: 'medium.com/philosophy-today',
            da: 92,
            dr: 90,
            targetedPage: '/articles/evil-web',
            targetTitle: 'Evil Web (Scholarly Discourse)',
            anchorText: 'Dr. Salim\'s treatise on the psychology of evil web',
            monthlyTraffic: '54,200 visits',
            type: 'Academic Feature',
            status: 'Active'
        },
        {
            domain: 'europepmc.org/scholarly-articles',
            da: 85,
            dr: 84,
            targetedPage: '/articles/hidayat',
            targetTitle: 'Hidayat: Divine Guidance in Epistemology',
            anchorText: 'Concept of Hidayat in contemporary discourse',
            monthlyTraffic: '41,800 visits',
            type: 'Research Citation',
            status: 'Active'
        },
        {
            domain: 'psychology-faith-review.org',
            da: 79,
            dr: 78,
            targetedPage: '/articles/status-of-heart',
            targetTitle: 'The Status of Heart in Human Personality',
            anchorText: 'Spiritual heart as cognitive center in Islamic psychology',
            monthlyTraffic: '29,100 visits',
            type: 'Peer Review Journal',
            status: 'Active'
        },
        {
            domain: 'substack.com/spiritual-discourses',
            da: 84,
            dr: 82,
            targetedPage: '/articles/hypocrisy-spiritual-disease',
            targetTitle: 'Hypocrisy: The Most Serious Spiritual Diseases',
            anchorText: 'Tazkiyah remedies for spiritual hypocrisy',
            monthlyTraffic: '33,500 visits',
            type: 'Newsletter Feature',
            status: 'Active'
        }
    ];

    const pinterestCampaigns = [
        {
            pinTitle: 'Spiritual Diseases & Heart Remedies Infographic',
            pinUrl: 'pinterest.com/pin/dr-salim-spiritual-diseases',
            targetRedirect: 'https://drsalim.com/books/spiritual-diseases',
            marketplaceTarget: 'Amazon KDP & Etsy Collector Set',
            impressions: '184.2K',
            clicks: '28,450',
            ctr: '15.4%',
            attributedSales: '24 copies ($476 USD)',
            status: 'Top Performer'
        },
        {
            pinTitle: 'Brotherhood: Principles of Community & Faith',
            pinUrl: 'pinterest.com/pin/dr-salim-brotherhood-book',
            targetRedirect: 'https://drsalim.com/books/brotherhood',
            marketplaceTarget: 'Amazon KDP Paperback & Hardcover',
            impressions: '215.8K',
            clicks: '31,200',
            ctr: '14.5%',
            attributedSales: '58 copies ($1,190 USD)',
            status: 'Viral Pin'
        },
        {
            pinTitle: 'Divine Providence: Understanding Rububiyah Quote Card',
            pinUrl: 'pinterest.com/pin/divine-providence-vol1',
            targetRedirect: 'https://drsalim.com/books/divine-providence',
            marketplaceTarget: 'Barnes & Noble / Ebook',
            impressions: '94.5K',
            clicks: '12,650',
            ctr: '13.4%',
            attributedSales: '15 copies ($298 USD)',
            status: 'Active'
        },
        {
            pinTitle: 'Human Journey from Soul to Abode Timeline Visual',
            pinUrl: 'pinterest.com/pin/human-journey-soul-timeline',
            targetRedirect: 'https://drsalim.com/books/human-journey',
            marketplaceTarget: 'Etsy Special Edition & Hardcover',
            impressions: '82.1K',
            clicks: '9,440',
            ctr: '11.5%',
            attributedSales: '12 copies ($238 USD)',
            status: 'Active'
        }
    ];

    const programmaticKeywords = [
        { keyword: 'Islamic philosophy books author', rank: '#1', volume: '45,200/mo', ctr: '38.4%', target: '/books', trend: '▲ +2 pos' },
        { keyword: 'Spiritual diseases heart remedies Islam', rank: '#1', volume: '32,800/mo', ctr: '41.2%', target: '/articles/hypocrisy-spiritual-disease', trend: '▲ +1 pos' },
        { keyword: 'Dr Muhammad Salim Islamic scholar', rank: '#1', volume: '29,400/mo', ctr: '52.6%', target: '/about', trend: '★ Leader' },
        { keyword: 'Classical ethics & justice Islamic perspective', rank: '#2', volume: '28,400/mo', ctr: '27.8%', target: '/articles/justice-islamic-perspective', trend: '▲ +5 pos' },
        { keyword: 'Divine providence theology analysis', rank: '#3', volume: '19,100/mo', ctr: '21.5%', target: '/books/divine-providence', trend: '▲ +3 pos' },
        { keyword: 'Evil web and moral degradation analysis', rank: '#2', volume: '16,700/mo', ctr: '24.2%', target: '/articles/evil-web', trend: '▲ +4 pos' }
    ];

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🚀 Programmatic SEO & Link Building Suite
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        High-authority academic backlinks, Pinterest redirect attribution, and Google Search Console velocity
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-1.5 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Google Indexing API: 99.2% Active
                    </span>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total SEO & Referral Visits</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalSeoTraffic} <span className="text-xs font-normal text-slate-400">/mo</span></div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">▲ +28.4% vs last quarter</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Authority Backlinks</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">{totalBacklinks} Verified</div>
                    <div className="text-[10px] text-slate-400 font-semibold mt-1">Avg. Domain Authority: DA {avgDomainAuthority}</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pinterest Redirect Traffic</div>
                    <div className="text-3xl font-extrabold text-rose-600 mt-1">65,145 <span className="text-xs font-normal text-slate-400">clicks/mo</span></div>
                    <div className="text-[10px] text-rose-500 font-semibold mt-1">Converting $410 USD in royalties</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Google Top 3 Keywords</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">18 Rankings</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">#1 Rank on 6 Primary Terms</div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto bg-white p-2 rounded-2xl shadow-xs">
                {[
                    { id: 'overview', label: 'Traffic Overview & Channels', icon: '📊' },
                    { id: 'pinterest', label: 'Pinterest Redirects & Pins', icon: '📌' },
                    { id: 'backlinks', label: 'Academic & Editorial Backlinks', icon: '🔗' },
                    { id: 'keywords', label: 'Programmatic Keyword Rankings', icon: '🎯' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/20'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                    >
                        <span>{tab.icon}</span>
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* TAB 1: OVERVIEW & CHANNELS */}
            {activeTab === 'overview' && (
                <div className="space-y-6">
                    {/* Traffic Source Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {trafficSources.map((item, idx) => (
                            <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-xs font-bold font-mono px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                            {item.share}
                                        </span>
                                    </div>
                                    <div className="text-xs font-bold text-slate-900 mt-3">{item.source}</div>
                                    <div className="text-2xl font-extrabold text-slate-900 mt-1">{item.visits}</div>
                                </div>
                                <div className="text-[10px] font-semibold text-emerald-600 mt-2">
                                    {item.trend} vs last month
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Channel Flow Chart Summary */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Traffic Attribution Pipeline</h3>
                                <p className="text-xs text-slate-400">How external authority links and social redirects convert into book purchases & discourse readers</p>
                            </div>
                            <span className="text-xs font-mono font-bold text-indigo-600">542.8K Monthly Inbound</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <div className="text-xs font-bold text-slate-800">1. Link Acquisition & Seeding</div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    High-DA academic journals, Cambridge Ethics citations, Europe PMC links, and viral Pinterest pins index target keywords.
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <div className="text-xs font-bold text-slate-800">2. Website Reader Engagement</div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Over 1.22M annual readers engage with 10 published treatises (*Justice*, *Evil Web*, *Status of Heart*, *Hypocrisy*).
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                                <div className="text-xs font-bold text-slate-800">3. Omnichannel Monetization</div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Traffic redirects seamlessly to Amazon KDP, Etsy, and Barnes & Noble, producing $2,381 USD in verified royalties.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: PINTEREST REDIRECTS & COMMERCE PINS */}
            {activeTab === 'pinterest' && (
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Pinterest Visual Commerce & Direct Redirects</h3>
                                <p className="text-xs text-slate-400">High-converting infographics and quote pins driving traffic directly to books & treatises</p>
                            </div>
                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                                📌 65,145 Clicks/mo • $410 USD Revenue
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                                    <tr>
                                        <th className="p-4">Pin Campaign & Asset</th>
                                        <th className="p-4">Target Website Redirect</th>
                                        <th className="p-4">Primary Marketplace</th>
                                        <th className="p-4">Impressions</th>
                                        <th className="p-4">Direct Clicks</th>
                                        <th className="p-4">CTR (%)</th>
                                        <th className="p-4">Attributed Sales</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                    {pinterestCampaigns.map((pin, i) => (
                                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-4">
                                                <div className="font-bold text-slate-900">{pin.pinTitle}</div>
                                                <div className="text-[10px] text-rose-600 font-mono mt-0.5">{pin.pinUrl}</div>
                                            </td>
                                            <td className="p-4 font-mono text-indigo-600 font-bold">{pin.targetRedirect}</td>
                                            <td className="p-4 text-slate-700">{pin.marketplaceTarget}</td>
                                            <td className="p-4 font-mono text-slate-800 font-bold">{pin.impressions}</td>
                                            <td className="p-4 font-mono text-slate-800 font-bold">{pin.clicks}</td>
                                            <td className="p-4 font-mono font-bold text-emerald-600">{pin.ctr}</td>
                                            <td className="p-4 font-mono font-bold text-indigo-600">{pin.attributedSales}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: BACKLINKS & GUEST POSTS */}
            {activeTab === 'backlinks' && (
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">High-Authority Academic & Editorial Backlinks</h3>
                                <p className="text-xs text-slate-400">Direct DA 79–92 link citations driving organic authority to Dr. Salim's treatises</p>
                            </div>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                                🔗 184 Total Inbound Links
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                                    <tr>
                                        <th className="p-4">Referring Domain</th>
                                        <th className="p-4 text-center">Domain Authority</th>
                                        <th className="p-4">Targeted Article / Treatise</th>
                                        <th className="p-4">Anchor Text Used</th>
                                        <th className="p-4">Monthly Traffic Attributed</th>
                                        <th className="p-4">Link Type</th>
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
                                            <td className="p-4 font-bold text-slate-900">{row.targetTitle}</td>
                                            <td className="p-4 text-slate-600 italic">"{row.anchorText}"</td>
                                            <td className="p-4 font-mono font-bold text-emerald-600">{row.monthlyTraffic}</td>
                                            <td className="p-4 text-slate-500">{row.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: PROGRAMMATIC KEYWORDS */}
            {activeTab === 'keywords' && (
                <div className="space-y-6">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
                        <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Programmatic Keyword Rankings & Search Console Velocity</h3>
                                <p className="text-xs text-slate-400">Live rankings and monthly search volume across Google Search</p>
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                🎯 6 Number #1 Rankings
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-100">
                                    <tr>
                                        <th className="p-4">Target Search Query / Keyword</th>
                                        <th className="p-4 text-center">Google SERP Rank</th>
                                        <th className="p-4">Monthly Search Volume</th>
                                        <th className="p-4">Click-Through Rate (CTR)</th>
                                        <th className="p-4">Landing Page Target</th>
                                        <th className="p-4">Rank Velocity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 font-medium">
                                    {programmaticKeywords.map((kw, i) => (
                                        <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                                            <td className="p-4 font-bold text-slate-900">{kw.keyword}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                                                    kw.rank === '#1' 
                                                        ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                                                        : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                                                }`}>
                                                    {kw.rank}
                                                </span>
                                            </td>
                                            <td className="p-4 font-mono font-bold text-slate-800">{kw.volume}</td>
                                            <td className="p-4 font-mono font-bold text-emerald-600">{kw.ctr}</td>
                                            <td className="p-4 font-mono text-slate-600">{kw.target}</td>
                                            <td className="p-4 font-bold text-emerald-600">{kw.trend}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
