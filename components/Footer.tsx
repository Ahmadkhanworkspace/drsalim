'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin')) return null;

    const books = [
        { name: 'Brotherhood (#1 Bestseller)', href: '/books/4' },
        { name: 'Spiritual Diseases & Management', href: '/books/5' },
        { name: 'Divine Providence (Vol. 1)', href: '/books/1' },
        { name: 'Human Journey: Soul to Abode', href: '/books/2' },
        { name: 'Divine Providence (Vol. 2)', href: '/books/3' }
    ];

    const articles = [
        { name: 'Justice: An Islamic Perspective', href: '/articles/9' },
        { name: 'Evil Web', href: '/articles/1' },
        { name: 'The Status of Heart', href: '/articles/2' },
        { name: 'Moderation: An Analysis', href: '/articles/8' },
        { name: 'Hidayat (Guidance)', href: '/articles/10' }
    ];

    const links = [
        { name: 'Home', href: '/' },
        { name: 'Ask Dr. Salim (Q&A)', href: '/qa' },
        { name: 'About Biography', href: '/about' },
        { name: 'Bookstore', href: '/store' },
        { name: 'Contact', href: '/contact' },
        { name: 'Suggestion Box', href: '/suggestions' }
    ];

    return (
        <footer className="bg-[#FAF7F2] border-t border-[#E3DBD0] pt-16 pb-12 text-[#554E48]">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                {/* Main 4-Column Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Brand Info (Cols 1-4) */}
                    <div className="lg:col-span-4 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-xl font-bold tracking-tight text-stone-900 font-heading">
                                Dr. Muhammad Salim
                            </span>
                        </Link>
                        
                        <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
                            Author and Islamic scholar. Conferred 5 Presidential and Prime Ministerial Seerat Awards for contributions to literature and religious thought.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-2 text-xs font-medium text-stone-700">
                            <a 
                                href="https://www.amazon.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors inline-flex items-center gap-1.5"
                            >
                                <span>Amazon Author Page</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </div>

                    {/* Books (Cols 5-7) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                            Published Books
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {books.map((book, i) => (
                                <li key={i}>
                                    <Link href={book.href} className="text-stone-600 hover:text-crimson-800 transition-colors">
                                        {book.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Articles (Cols 8-10) */}
                    <div className="lg:col-span-3 space-y-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                            Selected Articles
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {articles.map((art, i) => (
                                <li key={i}>
                                    <Link href={art.href} className="text-stone-600 hover:text-crimson-800 transition-colors">
                                        {art.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navigation Links (Cols 11-12) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-900">
                            Explore
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {links.map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-stone-600 hover:text-crimson-800 transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* Bottom Row */}
                <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
                    <p>© {new Date().getFullYear()} Dr. Muhammad Salim. All rights reserved.</p>
                    
                    <div className="flex items-center gap-6">
                        <Link href="/about" className="hover:text-stone-900 transition-colors">
                            About
                        </Link>
                        <Link href="/#books" className="hover:text-stone-900 transition-colors">
                            Books
                        </Link>
                        <Link href="/#articles" className="hover:text-stone-900 transition-colors">
                            Articles
                        </Link>
                        <Link href="/admin/dashboard" className="text-stone-400 hover:text-stone-700 transition-colors">
                            Admin Login
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}
