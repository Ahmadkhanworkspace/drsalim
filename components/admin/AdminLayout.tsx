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
        { href: '/admin/analytics', label: 'Analytics', icon: '📊', badge: 'New', badgeColor: 'bg-indigo-600 text-white' },
    ];

    const authorTools = [
        { href: '/admin/analytics', label: 'AI Assistant', icon: '✨', badge: 'Beta', badgeColor: 'bg-amber-500/20 text-amber-300' },
        { href: '/admin/articles', label: 'Content Planner', icon: '📅' },
        { href: '/admin/reading-stats', label: 'Reader Insights', icon: '👥' },
        { href: '/admin/promotions', label: 'Email Campaigns', icon: '✉️' },
    ];

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
                                    <div className="text-[10px] text-slate-400">View Profile</div>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="Sign Out"
                                className="text-slate-400 hover:text-rose-400 text-xs p-1 cursor-pointer"
                            >
                                ⋮
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleLogout}
                            title="Sign Out"
                            className="w-full py-2 flex items-center justify-center text-slate-400 hover:text-rose-400 text-xs"
                        >
                            🚪
                        </button>
                    )}
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarExpanded ? 'ml-64' : 'ml-20'}`}>
                
                {/* TOP HEADER BAR */}
                <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarExpanded(!sidebarExpanded)}
                            className="text-slate-500 hover:text-slate-800 text-lg cursor-pointer"
                        >
                            ☰
                        </button>
                        <span className="font-bold text-sm text-slate-800 capitalize">
                            {pathname?.split('/').pop() || 'Dashboard'}
                        </span>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="relative w-80 max-md:hidden">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search books, stats, reviews..."
                                className="w-full pl-9 pr-12 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-mono font-semibold">
                                ⌘ K
                            </span>
                        </div>

                        {/* AI Assistant Button */}
                        <button 
                            onClick={() => {
                                const event = new CustomEvent('toggle-ai-assistant');
                                window.dispatchEvent(event);
                            }}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-md shadow-indigo-600/20 hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            <span>✨</span>
                            <span className="max-sm:hidden">AI Assistant</span>
                        </button>

                        {/* Bell Notification */}
                        <button className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="text-base">🔔</span>
                            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                5
                            </span>
                        </button>

                        {/* Messages */}
                        <button className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors">
                            <span className="text-base">💬</span>
                        </button>

                        {/* View Live Site */}
                        <Link 
                            href="/" 
                            target="_blank"
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                        >
                            View Site ↗
                        </Link>

                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-amber-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-indigo-500/20">
                            MS
                        </div>
                    </div>
                </header>

                {/* MAIN PAGE BODY */}
                <main className="flex-1 p-6 sm:p-8 max-w-[1600px] w-full mx-auto space-y-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
