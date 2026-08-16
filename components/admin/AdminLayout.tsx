'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [booksExpanded, setBooksExpanded] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Light/Dark Theme Setup
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Authentication States
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const savedTheme = localStorage.getItem('admin-theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(false);
        }

        const storedAuth = sessionStorage.getItem('admin-authenticated');
        if (storedAuth === 'true') {
            setIsAuthenticated(true);
        }
        setAuthLoading(false);
    }, []);

    const toggleTheme = () => {
        const nextTheme = !isDarkMode;
        setIsDarkMode(nextTheme);
        localStorage.setItem('admin-theme', nextTheme ? 'dark' : 'light');
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameInput === 'admin' && passwordInput === 'adminpassword') {
            setIsAuthenticated(true);
            sessionStorage.setItem('admin-authenticated', 'true');
            setErrorMsg('');
        } else {
            setErrorMsg('Invalid administrative credentials. Please try again.');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('admin-authenticated');
        setIsAuthenticated(false);
    };

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0E14] text-slate-400 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Initializing AuthorHub Security...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-[#0B0E14] text-slate-100 p-4">
                <div className="w-full max-w-[420px] mx-4 p-8 bg-[#121824] border border-[#1E293B] rounded-2xl shadow-2xl space-y-6">
                    <div className="text-center space-y-2">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/30 text-xl font-bold">
                            🪶
                        </div>
                        <h2 className="text-2xl font-bold tracking-tight text-white">AuthorHub Portal</h2>
                        <p className="text-xs text-slate-400">Dr. Muhammad Salim • Administration</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Username</label>
                            <input 
                                type="text"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder="admin"
                                className="w-full px-4 py-2.5 bg-[#0B0E14] border border-[#1E293B] rounded-xl text-white focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Password</label>
                            <input 
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-[#0B0E14] border border-[#1E293B] rounded-xl text-white focus:border-indigo-500 focus:outline-none transition-colors text-sm"
                                required
                            />
                        </div>

                        {errorMsg && (
                            <div className="text-[11px] font-bold text-rose-400 bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-lg text-center">
                                {errorMsg}
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                        >
                            Authorize Access
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const mainMenuItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        {
            href: '/admin/books',
            label: 'Books',
            icon: '📖',
            badge: '5',
            submenu: [
                { href: '/admin/books', label: 'All Books' },
                { href: '/admin/series', label: 'Series' },
                { href: '/admin/bundles', label: 'Bundles' },
                { href: '/admin/isbn', label: 'ISBN Info' },
                { href: '/admin/covers', label: 'Covers' },
            ]
        },
        { href: '/admin/reviews', label: 'Reviews', icon: '⭐', badge: '128' },
        { href: '/admin/promotions', label: 'Promotions', icon: '🏷️' },
        { href: '/admin/previews', label: 'Previews', icon: '👁️' },
        { href: '/admin/reading-stats', label: 'Stats & Reports', icon: '📈' },
        { href: '/admin/awards', label: 'Awards', icon: '🎖️' },
        { href: '/admin/articles', label: 'Articles', icon: '📝' },
        { href: '/admin/comments', label: 'Comments', icon: '💬', badge: '56' },
        { href: '/admin/finance', label: 'Finance', icon: '💳' },
        { href: '/admin/analytics', label: 'Analytics', icon: '📊' },
        { href: '/admin/seo', label: 'Programmatic SEO', icon: '🚀', badge: '218 Pages', badgeColor: 'bg-emerald-600 text-white' },
    ];

    const authorTools = [
        { href: '/admin/seo', label: 'Facebook Ads & Groups', icon: '🔵', badge: '978K', badgeColor: 'bg-blue-500/20 text-blue-300' },
        { href: '/admin/seo', label: 'Pinterest Redirects', icon: '📌', badge: '65K', badgeColor: 'bg-rose-500/20 text-rose-300' },
        { href: '/admin/analytics', label: 'AI Assistant', icon: '✨', badge: 'Beta', badgeColor: 'bg-amber-500/20 text-amber-300' },
        { href: '/admin/articles', label: 'Content Planner', icon: '📅' },
        { href: '/admin/reading-stats', label: 'Reader Insights', icon: '👥' },
        { href: '/admin/promotions', label: 'Email Campaigns', icon: '✉️' },
    ];

    // Interactive Top Bar States
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showCommandPalette, setShowCommandPalette] = useState(false);
    const [showAiDrawer, setShowAiDrawer] = useState(false);
    const [aiInput, setAiInput] = useState('');
    const [aiMessages, setAiMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
        { role: 'ai', text: 'Hello Dr. Salim! I am your AuthorHub AI assistant. How can I help optimize your books, SEO, or reader engagement today?' }
    ]);
    const [aiLoading, setAiLoading] = useState(false);

    const [notifications, setNotifications] = useState([
        { id: '1', title: 'PayFast Withdrawal Initiated', desc: '$2,381 USD queued. Processing takes 7 to 10 working days.', time: '10m ago', icon: '⚡', read: false },
        { id: '2', title: 'Facebook Ads Milestone', desc: '978,134 visits reached from Facebook Ads & 18 academic groups.', time: '1h ago', icon: '🔵', read: false },
        { id: '3', title: 'Programmatic SEO Deployed', desc: '218 landing pages indexed with 5,252 link mesh.', time: '3h ago', icon: '🚀', read: false },
        { id: '4', title: '5-Star Review Received', desc: 'New review for "The Evil Web" by Prof. Tariq.', time: '5h ago', icon: '⭐', read: false },
        { id: '5', title: 'MongoDB Synchronized', desc: '1,218,181 total views verified in live cluster.', time: '1d ago', icon: '📊', read: true },
    ]);

    // Command palette search
    const [paletteQuery, setPaletteQuery] = useState('');

    const searchableRoutes = [
        { href: '/admin/dashboard', label: 'Dashboard & Executive Overview', category: 'General', icon: '📊' },
        { href: '/admin/books', label: 'All Books Catalog (5 Volumes)', category: 'Books', icon: '📖' },
        { href: '/admin/series', label: 'Book Series Manager', category: 'Books', icon: '📚' },
        { href: '/admin/bundles', label: 'Bundles & Box Sets', category: 'Books', icon: '📦' },
        { href: '/admin/isbn', label: 'ISBN Official Registry', category: 'Books', icon: '🏷️' },
        { href: '/admin/covers', label: 'Covers & A/B Visuals', category: 'Books', icon: '🖼️' },
        { href: '/admin/seo', label: 'Programmatic SEO (218 Pages & Mesh)', category: 'Marketing', icon: '🚀' },
        { href: '/admin/seo', label: 'Facebook Ads & 18 Groups (978K Visits)', category: 'Marketing', icon: '🔵' },
        { href: '/admin/seo', label: 'Pinterest Visual Redirects (65K Clicks)', category: 'Marketing', icon: '📌' },
        { href: '/admin/finance', label: 'Finance & PayFast Gateway ($2,381)', category: 'Finance', icon: '💳' },
        { href: '/admin/analytics', label: 'Multi-Channel Analytics (1.52M Visits)', category: 'Analytics', icon: '📈' },
        { href: '/admin/articles', label: 'Articles & Essays (1.22M Views)', category: 'Content', icon: '📝' },
        { href: '/admin/comments', label: 'Reader Comments Moderation (1,383)', category: 'Content', icon: '💬' },
        { href: '/admin/reviews', label: 'Editorial & Reader Reviews (4.9★)', category: 'Reviews', icon: '⭐' },
        { href: '/admin/awards', label: 'Presidential Seerat Awards', category: 'Accolades', icon: '🎖️' },
        { href: '/admin/reading-stats', label: 'Reading Stats & Completion Rates', category: 'Insights', icon: '⏱️' },
        { href: '/admin/promotions', label: 'Promotions & Seasonal Campaigns', category: 'Marketing', icon: '🏷️' },
        { href: '/admin/previews', label: 'Sample Chapters & Downloads', category: 'Insights', icon: '👁️' },
    ];

    const filteredPaletteRoutes = searchableRoutes.filter(r => 
        r.label.toLowerCase().includes(paletteQuery.toLowerCase()) || 
        r.category.toLowerCase().includes(paletteQuery.toLowerCase())
    );

    // Global Key Listener for Cmd+K / Ctrl+K & Esc
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setShowCommandPalette(prev => !prev);
            }
            if (e.key === 'Escape') {
                setShowCommandPalette(false);
                setShowProfileDropdown(false);
                setShowNotifications(false);
                setShowMessages(false);
                setShowAiDrawer(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSendAi = (promptText?: string) => {
        const query = promptText || aiInput;
        if (!query.trim()) return;

        const newMessages = [...aiMessages, { role: 'user' as const, text: query }];
        setAiMessages(newMessages);
        setAiInput('');
        setAiLoading(true);

        setTimeout(() => {
            let response = "I've analyzed your request against Dr. Salim's portfolio and live metrics.";
            if (query.toLowerCase().includes('seo') || query.toLowerCase().includes('keyword')) {
                response = "Top SEO Clusters: 'Islamic Epistemology' and 'Tazkiyah Psychological Frameworks'. All 218 programmatic pages are currently indexed with a 5,252 internal link mesh, maintaining a Google SERP average ranking of #2.4.";
            } else if (query.toLowerCase().includes('sales') || query.toLowerCase().includes('finance') || query.toLowerCase().includes('payfast')) {
                response = "Financial Summary: Total Royalties: $2,381.00 USD across 118 copies sold. Your PayFast withdrawal request has been submitted and will arrive in 7 to 10 working days.";
            } else if (query.toLowerCase().includes('traffic') || query.toLowerCase().includes('facebook')) {
                response = "Acquisition Highlights: 1,520,934 Total Visits. Facebook Ads & 18 Academic Groups generated 978,134 visits at $0.0014 CPC. Pinterest redirects contributed 65,145 high-intent clicks.";
            } else {
                response = `AuthorHub AI insight for "${query}": Your books maintain a 4.9★ rating with strong engagement across Cambridge Ethics and Medium. All systems are operating optimally.`;
            }

            setAiMessages([...newMessages, { role: 'ai', text: response }]);
            setAiLoading(false);
        }, 600);
    };

    const unreadNotificationCount = notifications.filter(n => !n.read).length;

    return (
        <div className={`min-h-screen flex ${isDarkMode ? 'bg-[#0B0E14] text-slate-100' : 'bg-[#F4F6F8] text-slate-900'}`}>
            
            {/* LEFT DARK SIDEBAR (AuthorHub Theme) */}
            <aside className={`fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 flex flex-col justify-between
                              ${sidebarExpanded ? 'w-64' : 'w-20'}
                              bg-[#0B0E14] text-slate-300 border-r border-[#1B2230] shadow-2xl`}>
                <div className="overflow-y-auto py-5 px-3 space-y-6">
                    
                    {/* Brand Header */}
                    <div className="flex items-center justify-between px-2">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden select-none">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-600/30 shrink-0">
                                🪶
                            </div>
                            {sidebarExpanded && (
                                <div className="min-w-0">
                                    <div className="font-extrabold text-white text-base tracking-tight leading-tight">AuthorHub</div>
                                    <div className="text-[10px] text-slate-400 font-medium truncate">Publish. Inspire. Impact.</div>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Author Profile Card */}
                    {sidebarExpanded && (
                        <div className="p-3 bg-[#131926] border border-[#1E293B] rounded-xl flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs ring-2 ring-indigo-500/40 shrink-0">
                                MS
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-bold text-white truncate">Dr. Muhammad Salim</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold">Author</span>
                                    <span className="text-[10px] text-slate-400 truncate">admin@salim.com</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MAIN MENU */}
                    <div className="space-y-1">
                        {sidebarExpanded && (
                            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                                MAIN MENU
                            </div>
                        )}
                        {mainMenuItems.map((item) => {
                            const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
                            const hasSubmenu = item.submenu && item.submenu.length > 0;

                            return (
                                <div key={item.label}>
                                    {hasSubmenu ? (
                                        <div>
                                            <button
                                                onClick={() => setBooksExpanded(!booksExpanded)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                                    isActive
                                                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                                                        : 'text-slate-400 hover:text-white hover:bg-[#151C2B]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="text-sm">{item.icon}</span>
                                                    {sidebarExpanded && <span>{item.label}</span>}
                                                </div>
                                                {sidebarExpanded && (
                                                    <span className="text-[10px] text-slate-400">
                                                        {booksExpanded ? '▼' : '▶'}
                                                    </span>
                                                )}
                                            </button>

                                            {booksExpanded && sidebarExpanded && (
                                                <div className="pl-9 pr-2 py-1 space-y-1 mt-1">
                                                    {item.submenu.map((sub) => {
                                                        const isSubActive = pathname === sub.href;
                                                        return (
                                                            <Link
                                                                key={sub.href}
                                                                href={sub.href}
                                                                className={`block px-3 py-1.5 text-xs rounded-lg transition-colors ${
                                                                    isSubActive 
                                                                        ? 'text-indigo-400 font-bold bg-[#131926]' 
                                                                        : 'text-slate-400 hover:text-white hover:bg-[#151C2B]'
                                                                }`}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                                                isActive
                                                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30'
                                                    : 'text-slate-400 hover:text-white hover:bg-[#151C2B]'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-sm">{item.icon}</span>
                                                {sidebarExpanded && <span>{item.label}</span>}
                                            </div>
                                            {sidebarExpanded && item.badge && (
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                    isActive 
                                                        ? 'bg-white/20 text-white' 
                                                        : item.badgeColor || 'bg-[#1E293B] text-slate-300'
                                                }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* AUTHOR TOOLS */}
                    {sidebarExpanded && (
                        <div className="space-y-1 pt-2">
                            <div className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2">
                                AUTHOR TOOLS
                            </div>
                            {authorTools.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-[#151C2B] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm">{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                    {item.badge && (
                                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}

                </div>

                {/* Bottom Section */}
                <div className="p-3 border-t border-[#1B2230] bg-[#0A0D12] space-y-2">
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-[#151C2B] transition-colors cursor-pointer"
                    >
                        <span className="flex items-center gap-2">
                            <span>{isDarkMode ? '☀️' : '🌙'}</span>
                            {sidebarExpanded && <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>}
                        </span>
                        {sidebarExpanded && <span className="text-slate-400 text-xs">⌄</span>}
                    </button>

                    {sidebarExpanded ? (
                        <div className="flex items-center justify-between p-2 rounded-xl bg-[#131926] border border-[#1E293B]">
                            <div className="flex items-center gap-2.5 min-w-0">
                                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    MS
                                </div>
                                <div className="min-w-0">
                                    <div className="text-xs font-bold text-white truncate">Dr. Muhammad Salim</div>
                                    <div className="text-[10px] text-slate-400">admin@salim.com</div>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Sign Out / Logout"
                                className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-semibold cursor-pointer transition-colors"
                            >
                                🚪 Log Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            title="Sign Out / Logout"
                            className="w-full py-2 flex items-center justify-center text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-sm transition-colors cursor-pointer"
                        >
                            🚪
                        </button>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                
                {/* TOP HEADER BAR */}
                <header className={`h-16 px-6 border-b flex items-center justify-between sticky top-0 z-40 transition-colors ${
                    isDarkMode 
                        ? 'bg-[#0E131F] border-[#1B2230] text-slate-100 shadow-md' 
                        : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                }`}>
                    {/* Left: Hamburger & Current Page Title */}
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}
                            title="Toggle Sidebar"
                            className={`p-2 rounded-lg text-lg cursor-pointer transition-colors ${
                                isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            ☰
                        </button>
                        <div className="flex items-center gap-2">
                            <span className={`font-extrabold text-sm capitalize ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                {pathname?.split('/').pop() || 'Dashboard'}
                            </span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 max-sm:hidden">
                                AuthorHub v2.4
                            </span>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-3">
                        {/* Search Bar / Command Palette Trigger */}
                        <div 
                            onClick={() => setShowCommandPalette(true)}
                            className={`relative w-72 max-md:hidden flex items-center gap-2 px-3.5 py-2 border rounded-xl cursor-pointer transition-all ${
                                isDarkMode 
                                    ? 'bg-[#151C2B] border-[#1E293B] hover:border-indigo-500/50 text-slate-400' 
                                    : 'bg-slate-50 border-slate-200 hover:border-indigo-500/50 text-slate-500'
                            }`}
                        >
                            <span className="text-sm">🔍</span>
                            <span className="text-xs flex-1 truncate">Search books, SEO, finance...</span>
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                isDarkMode ? 'bg-[#1F293D] text-slate-300' : 'bg-slate-200 text-slate-700'
                            }`}>
                                ⌘ K
                            </span>
                        </div>

                        {/* Mobile Search Icon */}
                        <button 
                            onClick={() => setShowCommandPalette(true)}
                            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            title="Search"
                        >
                            🔍
                        </button>

                        {/* AI Assistant Button */}
                        <button 
                            onClick={() => setShowAiDrawer(!showAiDrawer)}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                        >
                            <span>✨</span>
                            <span className="max-sm:hidden">AI Assistant</span>
                        </button>

                        {/* Notifications Bell */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setShowNotifications(!showNotifications);
                                    setShowProfileDropdown(false);
                                    setShowMessages(false);
                                }}
                                className={`relative p-2.5 rounded-xl transition-colors cursor-pointer ${
                                    isDarkMode 
                                        ? 'text-slate-300 hover:bg-[#151C2B]' 
                                        : 'text-slate-600 hover:bg-slate-100'
                                }`}
                                title="Notifications"
                            >
                                <span className="text-base">🔔</span>
                                {unreadNotificationCount > 0 && (
                                    <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                                        {unreadNotificationCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className={`absolute right-0 mt-2 w-84 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                                    isDarkMode ? 'bg-[#121824] border-[#1E293B] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                                }`}>
                                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-xs">Notifications</span>
                                            <span className="px-1.5 py-0.2 text-[10px] font-bold bg-indigo-500/20 text-indigo-400 rounded-full">
                                                {unreadNotificationCount} New
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                                            className="text-[11px] font-semibold text-indigo-400 hover:underline cursor-pointer"
                                        >
                                            Mark all read
                                        </button>
                                    </div>
                                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-80 overflow-y-auto my-2">
                                        {notifications.map((item) => (
                                            <div key={item.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-500/5 p-2 rounded-xl transition-colors">
                                                <span className="text-lg shrink-0 mt-0.5">{item.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-xs font-bold truncate">{item.title}</p>
                                                        <span className="text-[10px] text-slate-400">{item.time}</span>
                                                    </div>
                                                    <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <Link 
                                        href="/admin/analytics" 
                                        onClick={() => setShowNotifications(false)}
                                        className="block w-full py-2 text-center text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl transition-colors mt-2"
                                    >
                                        View All Activity Reports →
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Theme Toggle Button */}
                        <button 
                            onClick={toggleTheme}
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                            className={`p-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                                isDarkMode ? 'text-amber-400 hover:bg-[#151C2B]' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                        >
                            {isDarkMode ? '☀️' : '🌙'}
                        </button>

                        {/* Visit Site Button */}
                        <Link 
                            href="/" 
                            target="_blank"
                            className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all max-sm:hidden flex items-center gap-1.5 ${
                                isDarkMode 
                                    ? 'border-[#1E293B] bg-[#131926] text-slate-300 hover:bg-[#1A2234] hover:text-white' 
                                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                            }`}
                        >
                            <span>Live Site</span>
                            <span>↗</span>
                        </Link>

                        {/* User Profile Dropdown & Avatar */}
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setShowProfileDropdown(!showProfileDropdown);
                                    setShowNotifications(false);
                                    setShowMessages(false);
                                }}
                                className="flex items-center gap-2 p-1 rounded-xl hover:ring-2 hover:ring-indigo-500/30 transition-all cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/20 shadow-md">
                                    MS
                                </div>
                                <span className="text-xs font-bold max-lg:hidden">Dr. Salim</span>
                                <span className="text-slate-400 text-[10px] max-lg:hidden">▼</span>
                            </button>

                            {/* Dropdown Menu */}
                            {showProfileDropdown && (
                                <div className={`absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl border p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${
                                    isDarkMode ? 'bg-[#121824] border-[#1E293B] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                                }`}>
                                    <div className="p-3 bg-gradient-to-r from-indigo-900/40 to-violet-900/40 rounded-xl border border-indigo-500/20 mb-2">
                                        <div className="text-xs font-bold text-white">Dr. Muhammad Salim</div>
                                        <div className="text-[10px] text-indigo-300 font-medium">Administrator & Author</div>
                                        <div className="text-[10px] text-slate-400 mt-1">admin@salim.com</div>
                                    </div>

                                    <div className="space-y-1 py-1 text-xs">
                                        <Link 
                                            href="/admin/finance" 
                                            onClick={() => setShowProfileDropdown(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-500/10 transition-colors"
                                        >
                                            <span>💳</span>
                                            <span>Finance & PayFast ($2,381)</span>
                                        </Link>
                                        <Link 
                                            href="/admin/seo" 
                                            onClick={() => setShowProfileDropdown(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-500/10 transition-colors"
                                        >
                                            <span>🚀</span>
                                            <span>Programmatic SEO (218 Pages)</span>
                                        </Link>
                                        <Link 
                                            href="/admin/analytics" 
                                            onClick={() => setShowProfileDropdown(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-500/10 transition-colors"
                                        >
                                            <span>📊</span>
                                            <span>Traffic & Facebook Ads</span>
                                        </Link>
                                        <Link 
                                            href="/" 
                                            target="_blank"
                                            onClick={() => setShowProfileDropdown(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-500/10 transition-colors"
                                        >
                                            <span>🌐</span>
                                            <span>View Public Website</span>
                                        </Link>
                                    </div>

                                    <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-800">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-xs transition-colors cursor-pointer"
                                        >
                                            <span>🚪</span>
                                            <span>Sign Out / Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Top Bar Dedicated Direct Logout Button */}
                        <button 
                            onClick={handleLogout}
                            title="Log Out of Admin Panel"
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 text-xs font-bold border border-rose-500/20 transition-all cursor-pointer"
                        >
                            <span>🚪</span>
                            <span className="max-md:hidden">Log Out</span>
                        </button>
                    </div>
                </header>

                {/* MAIN PAGE BODY */}
                <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
                    {children}
                </main>

            </div>

            {/* COMMAND PALETTE MODAL (⌘ K) */}
            {showCommandPalette && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150">
                    <div className={`w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden ${
                        isDarkMode ? 'bg-[#121824] border-[#1E293B] text-slate-100' : 'bg-white border-slate-200 text-slate-900'
                    }`}>
                        {/* Search Input */}
                        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-lg">🔍</span>
                            <input 
                                type="text"
                                autoFocus
                                value={paletteQuery}
                                onChange={(e) => setPaletteQuery(e.target.value)}
                                placeholder="Type a page, tool, or metric (e.g., SEO, Finance, Facebook Ads)..."
                                className="w-full bg-transparent border-none text-sm font-medium focus:outline-none placeholder-slate-400"
                            />
                            <button 
                                onClick={() => setShowCommandPalette(false)}
                                className="px-2 py-1 rounded-lg text-xs font-mono bg-slate-500/20 text-slate-400 hover:text-white"
                            >
                                ESC
                            </button>
                        </div>

                        {/* Filtered Results */}
                        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
                            {filteredPaletteRoutes.length === 0 ? (
                                <div className="p-8 text-center text-slate-400 text-xs">
                                    No admin section found matching "{paletteQuery}"
                                </div>
                            ) : (
                                filteredPaletteRoutes.map((route, idx) => (
                                    <Link
                                        key={idx}
                                        href={route.href}
                                        onClick={() => setShowCommandPalette(false)}
                                        className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white group transition-colors text-xs font-semibold"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-base">{route.icon}</span>
                                            <span>{route.label}</span>
                                        </div>
                                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-500/10 group-hover:bg-white/20 text-slate-400 group-hover:text-white">
                                            {route.category}
                                        </span>
                                    </Link>
                                ))
                            )}
                        </div>

                        {/* Footer Tips */}
                        <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#0B0E14] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                            <span>Navigation shortcut: <kbd className="font-mono font-bold">⌘ K</kbd> or <kbd className="font-mono font-bold">Ctrl+K</kbd></span>
                            <span>Press <kbd className="font-mono font-bold">ESC</kbd> to close</span>
                        </div>
                    </div>
                </div>
            )}

            {/* AI ASSISTANT SIDE DRAWER */}
            {showAiDrawer && (
                <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#0E131F] text-slate-100 border-l border-[#1E293B] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                    {/* Header */}
                    <div className="p-4 border-b border-[#1E293B] flex items-center justify-between bg-[#121824]">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white text-base">
                                ✨
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white">AuthorHub AI Assistant</h3>
                                <p className="text-[10px] text-indigo-300">Trained on Dr. Salim's Corpus & Metrics</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setShowAiDrawer(false)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                        {aiMessages.map((msg, i) => (
                            <div 
                                key={i} 
                                className={`p-3 rounded-2xl ${
                                    msg.role === 'ai' 
                                        ? 'bg-[#151C2B] border border-[#1E293B] text-slate-200' 
                                        : 'bg-indigo-600 text-white ml-6 font-medium shadow-md shadow-indigo-600/30'
                                }`}
                            >
                                {msg.role === 'ai' && (
                                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <span>✨ AuthorHub AI</span>
                                    </div>
                                )}
                                <p className="leading-relaxed">{msg.text}</p>
                            </div>
                        ))}
                        {aiLoading && (
                            <div className="p-3 bg-[#151C2B] border border-[#1E293B] rounded-2xl flex items-center gap-2 text-indigo-400 text-xs">
                                <span className="animate-spin">🔄</span>
                                <span>Generating insights...</span>
                            </div>
                        )}
                    </div>

                    {/* Quick Prompts */}
                    <div className="px-4 py-2 bg-[#0B0E14] border-t border-[#1E293B] flex gap-1.5 overflow-x-auto">
                        {[
                            '📊 Sales & PayFast Summary',
                            '🚀 SEO 218 Pages Health',
                            '🔵 Facebook 978K Ads Audit'
                        ].map((prompt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleSendAi(prompt)}
                                className="px-2.5 py-1 rounded-lg bg-[#151C2B] hover:bg-indigo-600 hover:text-white text-slate-300 text-[10px] font-semibold whitespace-nowrap transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <div className="p-3 border-t border-[#1E293B] bg-[#121824] flex items-center gap-2">
                        <input 
                            type="text"
                            value={aiInput}
                            onChange={(e) => setAiInput(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') handleSendAi(); }}
                            placeholder="Ask AI about book sales, SEO clusters, or reviews..."
                            className="flex-1 px-3 py-2 bg-[#0B0E14] border border-[#1E293B] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                            onClick={() => handleSendAi()}
                            className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer hover:opacity-90 transition-opacity"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
