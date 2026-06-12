'use client';

import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AdminLayoutProps {
    children: ReactNode;
}

// Inline SVG Icons for premium look
const Icons = {
    Dashboard: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    Books: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    Reviews: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.381-1.81.588-1.81h4.906a1 1 0 00.95-.69l1.519-4.674z" />
        </svg>
    ),
    Promotions: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
    ),
    Previews: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    ),
    ReadingStats: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
    ),
    Awards: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
    ),
    Articles: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
    ),
    Comments: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    Finance: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1M1.25 12h21.5" />
        </svg>
    ),
    Analytics: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm12 0v-3a2 2 0 00-2-2h-2a2 2 0 00-2 2v3a2 2 0 002 2h2a2 2 0 002-2zm0 0v-9a2 2 0 00-2-2h-2a2 2 0 00-2 2v11a2 2 0 002 2h2a2 2 0 002-2z" />
        </svg>
    ),
    Moon: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    ),
    Sun: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
    ),
    ToggleCollapse: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
        </svg>
    ),
    Search: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    ),
    Sparkles: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    Bell: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
    ),
    Message: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
    ),
    Plus: () => (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
    )
};

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [booksExpanded, setBooksExpanded] = useState(true);
    
    // Light/Dark Theme Setup
    const [isDarkMode, setIsDarkMode] = useState(true);

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
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
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

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Initializing Portal Security...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className={`min-h-screen w-full flex items-center justify-center relative overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
                {/* Background ambient light */}
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Theme toggle in login */}
                <button 
                    onClick={toggleTheme}
                    className="absolute top-6 right-6 p-2 rounded-full border border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                >
                    {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
                </button>

                <div 
                    className="w-full max-w-[420px] mx-4 p-8 bg-white/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-2xl transition-all duration-300" 
                    style={{ borderRadius: '24px !important' }}
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 mb-4 font-bold text-lg">
                            MS
                        </div>
                        <h2 className="text-xl font-bold tracking-tight">Dr. Muhammad Salim</h2>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 font-medium">Administration Panel</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Username</label>
                            <input 
                                type="text"
                                value={usernameInput}
                                onChange={(e) => setUsernameInput(e.target.value)}
                                placeholder="admin"
                                className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                style={{ borderRadius: '8px !important' }}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">Password</label>
                            <input 
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 bg-slate-100/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none transition-colors text-sm"
                                style={{ borderRadius: '8px !important' }}
                                required
                            />
                        </div>

                        {errorMsg && (
                            <div className="text-[11px] font-bold text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 p-2.5 rounded-lg text-center">
                                {errorMsg}
                            </div>
                        )}

                        <button 
                            type="submit"
                            className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-300"
                            style={{ borderRadius: '8px !important' }}
                        >
                            Authorize Access
                        </button>
                    </form>


                </div>
            </div>
        );
    }

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: <Icons.Dashboard /> },
        {
            href: '/admin/books',
            label: 'Books',
            icon: <Icons.Books />,
            submenu: [
                { href: '/admin/books', label: 'All Books' },
                { href: '/admin/series', label: 'Series' },
                { href: '/admin/bundles', label: 'Bundles' },
                { href: '/admin/isbn', label: 'ISBN Info' },
                { href: '/admin/covers', label: 'Covers' },
            ]
        },
        { href: '/admin/reviews', label: 'Reviews', icon: <Icons.Reviews /> },
        { href: '/admin/promotions', label: 'Promotions', icon: <Icons.Promotions /> },
        { href: '/admin/previews', label: 'Previews', icon: <Icons.Previews /> },
        { href: '/admin/reading-stats', label: 'Stats', icon: <Icons.ReadingStats /> },
        { href: '/admin/awards', label: 'Awards', icon: <Icons.Awards /> },
        { href: '/admin/articles', label: 'Articles', icon: <Icons.Articles /> },
        { href: '/admin/comments', label: 'Comments', icon: <Icons.Comments /> },
        { href: '/admin/finance', label: 'Finance', icon: <Icons.Finance /> },
        { href: '/admin/analytics', label: 'Analytics', icon: <Icons.Analytics /> },
    ];

    return (
        <div className={`admin-theme-wrapper ${isDarkMode ? 'dark' : ''} min-h-screen relative flex`}>
            {/* Sidebar Overlay for Mobile */}
            {isMobileMenuOpen && (
                <div 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                />
            )}

            {/* FLOATING GLASS SIDEBAR */}
            <aside 
                className={`fixed top-4 bottom-4 left-4 z-50 transition-all duration-300 flex flex-col justify-between
                           ${sidebarExpanded ? 'w-[280px]' : 'w-[80px]'}
                           bg-[var(--admin-glass-bg)] dark:bg-[rgba(17,24,39,0.75)]
                           border border-[var(--admin-glass-border)] dark:border-slate-800/80
                           shadow-xl shadow-slate-900/5 dark:shadow-black/20 backdrop-blur-xl
                           max-lg:fixed max-lg:left-4 max-lg:top-4 max-lg:bottom-4
                           ${isMobileMenuOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[320px]'}
                           transition-transform duration-300`}
                style={{ borderRadius: '16px !important' }}
            >
                <div>
                    {/* Brand Logo & Collapse Toggle */}
                    <div className="flex items-center justify-between p-5 border-b border-[var(--admin-border)] dark:border-slate-800/60">
                        <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden select-none">
                            <div className="w-9 h-9 bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/20 shrink-0" style={{ borderRadius: '8px !important' }}>
                                S
                            </div>
                            {sidebarExpanded && (
                                <div className="flex flex-col">
                                    <span className="font-bold text-[15px] tracking-tight leading-none text-slate-900 dark:text-slate-100">Dr. Salim CMS</span>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mt-0.5">Author Panel</span>
                                </div>
                            )}
                        </Link>

                        {sidebarExpanded && (
                            <button 
                                onClick={() => setSidebarExpanded(false)}
                                className="hidden lg:flex items-center justify-center w-7 h-7 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Icons.ToggleCollapse />
                            </button>
                        )}
                    </div>

                    {/* Quick Search Shortcut */}
                    {sidebarExpanded && (
                        <div className="px-4 pt-4 pb-2">
                            <div className="flex items-center gap-2 px-3 py-2 bg-slate-100/50 dark:bg-slate-900/50 border border-[var(--admin-border)] dark:border-slate-800/50" style={{ borderRadius: '8px !important' }}>
                                <span className="text-slate-400"><Icons.Search /></span>
                                <input 
                                    type="text" 
                                    placeholder="Quick search... (⌘K)"
                                    className="bg-transparent text-xs text-[var(--admin-text-primary)] w-full outline-none border-none p-0! focus:ring-0!" 
                                />
                            </div>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || (item.submenu && item.submenu.some(sub => pathname === sub.href));
                            const hasSubmenu = item.submenu && item.submenu.length > 0;

                            return (
                                <div key={item.href}>
                                    {hasSubmenu ? (
                                        <>
                                            <button
                                                onClick={() => setBooksExpanded(!booksExpanded)}
                                                className={`w-full flex items-center justify-between gap-3 p-2.5 text-sm transition-all group
                                                          ${isActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/20 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'}`}
                                                style={{ borderRadius: '8px !important' }}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={`transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                                        {item.icon}
                                                    </span>
                                                    {sidebarExpanded && <span>{item.label}</span>}
                                                </div>
                                                {sidebarExpanded && (
                                                    <span className="text-xs text-slate-400 dark:text-slate-500">
                                                        {booksExpanded ? '▼' : '▶'}
                                                    </span>
                                                )}
                                            </button>

                                            {booksExpanded && sidebarExpanded && (
                                                <div className="pl-9 pr-2 py-1 space-y-1">
                                                    {item.submenu.map((sub) => {
                                                        const isSubActive = pathname === sub.href;
                                                        return (
                                                            <Link
                                                                key={sub.href}
                                                                href={sub.href}
                                                                className={`block px-3 py-1.5 text-xs transition-colors
                                                                            ${isSubActive 
                                                                            ? 'text-blue-600 font-semibold dark:text-blue-400' 
                                                                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                                                            >
                                                                {sub.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 p-2.5 text-sm transition-all group
                                                      ${isActive ? 'text-blue-600 bg-blue-50/50 dark:bg-blue-950/20 font-semibold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/30'}`}
                                            style={{ borderRadius: '8px !important' }}
                                        >
                                            <span className={`transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
                                                {item.icon}
                                            </span>
                                            {sidebarExpanded && <span>{item.label}</span>}
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer with Profile & Theme Switcher */}
                <div className="p-4 border-t border-[var(--admin-border)] dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-950/10" style={{ borderRadius: '0 0 16px 16px !important' }}>
                    {/* Theme Switcher */}
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center justify-center gap-3 p-2 text-xs font-semibold border border-[var(--admin-border)] dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 mb-3 transition-colors"
                        style={{ borderRadius: '8px !important' }}
                    >
                        {isDarkMode ? (
                            <>
                                <Icons.Sun />
                                {sidebarExpanded && <span>Light Theme</span>}
                            </>
                        ) : (
                            <>
                                <Icons.Moon />
                                {sidebarExpanded && <span>Dark Theme</span>}
                            </>
                        )}
                    </button>

                    {/* Expand Trigger for Collapsed Sidebar */}
                    {!sidebarExpanded && (
                        <button
                            onClick={() => setSidebarExpanded(true)}
                            className="w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            style={{ borderRadius: '8px !important' }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                        </button>
                    )}

                    {/* User profile section */}
                    {sidebarExpanded && (
                        <div className="flex items-center gap-3 p-1">
                            <div className="w-9 h-9 bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md shadow-blue-500/10" style={{ borderRadius: '50% !important' }}>
                                MS
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">Dr. Muhammad Salim</div>
                                <div className="text-[10px] text-slate-400 truncate">admin@drsalim.com</div>
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* MAIN CONTAINER */}
            <div 
                className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                style={{
                    paddingLeft: '0px',
                    marginLeft: '0px',
                    // On desktop, adjust margins to create whitespace around sidebar
                    padding: '0px',
                }}
            >
                {/* Desktop layout padding margins wrapper */}
                <div 
                    className="flex-1 flex flex-col min-h-screen transition-all duration-300"
                    style={{
                        marginLeft: typeof window !== 'undefined' && window.innerWidth < 1024 
                            ? '0px' 
                            : sidebarExpanded ? '312px' : '112px',
                        paddingRight: '16px',
                        paddingTop: '16px',
                        paddingBottom: '16px',
                    }}
                >
                    {/* STICKY TOP NAVIGATION BAR */}
                    <header 
                        className="sticky top-4 z-40 h-[72px] px-6 flex items-center justify-between bg-[var(--admin-glass-bg)] dark:bg-[rgba(17,24,39,0.75)] border border-[var(--admin-glass-border)] dark:border-slate-800/80 shadow-lg shadow-slate-900/5 dark:shadow-black/10 backdrop-blur-xl mb-6"
                        style={{ borderRadius: '16px !important' }}
                    >
                        {/* Left Info / Mobile Menu Trigger */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                style={{ borderRadius: '8px !important' }}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div className="max-md:hidden flex items-center gap-2 text-xs font-semibold text-slate-400 dark:text-slate-500">
                                <span>Dr. Salim Admin</span>
                                <span>/</span>
                                <span className="text-slate-700 dark:text-slate-300 font-bold capitalize">
                                    {pathname?.split('/').pop() || 'Dashboard'}
                                </span>
                            </div>
                        </div>

                        {/* Top bar right buttons */}
                        <div className="flex items-center gap-3">
                            {/* AI Assistant shortcut */}
                            <button 
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-900/50 transition-colors"
                                style={{ borderRadius: '8px !important' }}
                                onClick={() => {
                                    // Trigger AI assistant panel if active in page
                                    const event = new CustomEvent('toggle-ai-assistant');
                                    window.dispatchEvent(event);
                                }}
                            >
                                <Icons.Sparkles />
                                <span className="max-sm:hidden">AI Assistant</span>
                            </button>

                            {/* Messages */}
                            <button className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" style={{ borderRadius: '8px !important' }}>
                                <Icons.Message />
                            </button>

                            {/* Notifications */}
                            <button className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" style={{ borderRadius: '8px !important' }}>
                                <Icons.Bell />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500" style={{ borderRadius: '50% !important' }} />
                            </button>

                            {/* Divider */}
                            <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />

                            {/* Quick Actions Dropdown / Button */}
                            <Link 
                                href="/" 
                                target="_blank"
                                className="px-4 py-2 text-xs font-semibold border border-[var(--admin-border)] dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                                style={{ borderRadius: '8px !important' }}
                            >
                                View Site
                            </Link>
                        </div>
                    </header>

                    {/* CONTENT WRAPPER */}
                    <main className="flex-1 w-full max-w-[1400px] mx-auto px-4">
                        {children}
                    </main>
                </div>
            </div>
            
            {/* Dynamic viewport listener to handle sidebar layout styling on load */}
            <style jsx global>{`
                @media (max-width: 1024px) {
                    .admin-theme-wrapper > div {
                        margin-left: 0px !important;
                        padding-left: 16px !important;
                    }
                }
            `}</style>
        </div>
    );
}
