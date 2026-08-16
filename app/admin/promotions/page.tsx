'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Promotion {
    id: string;
    title: string;
    bookTitle: string;
    type: 'discount' | 'bundle' | 'free';
    discountPercent?: number;
    code: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'scheduled' | 'expired';
    uses: number;
    maxUses: number;
}

export default function PromotionsPage() {
    const [promotions] = useState<Promotion[]>([
        { id: '1', title: 'Facebook Ad: Justice & Islamic Ethics', bookTitle: 'Justice & Evil Web Treatises', type: 'discount', discountPercent: 20, code: 'METAJUSTICE', startDate: '2026-02-01', endDate: '2026-08-31', status: 'active', uses: 3421, maxUses: 5000 },
        { id: '2', title: 'Facebook Group Seeding (18 Academic Groups)', bookTitle: 'Spiritual Diseases + Brotherhood', type: 'bundle', discountPercent: 25, code: 'SCHOLARS25', startDate: '2026-01-15', endDate: '2026-08-31', status: 'active', uses: 2845, maxUses: 4000 },
        { id: '3', title: 'New Year Sale', bookTitle: 'Brotherhood', type: 'discount', discountPercent: 25, code: 'NEWYEAR25', startDate: '2026-01-01', endDate: '2026-01-15', status: 'active', uses: 47, maxUses: 100 },
        { id: '4', title: 'Spiritual Growth Bundle', bookTitle: 'Spiritual Diseases + Human Journey', type: 'bundle', discountPercent: 30, code: 'SPIRITUAL30', startDate: '2026-01-05', endDate: '2026-01-31', status: 'active', uses: 18, maxUses: 50 },
        { id: '5', title: 'Free Preview Week', bookTitle: 'Divine Providence Vol 2', type: 'free', code: 'PREVIEW2026', startDate: '2026-01-10', endDate: '2026-01-17', status: 'scheduled', uses: 0, maxUses: 200 },
        { id: '6', title: 'Brotherhood Launch', bookTitle: 'Brotherhood', type: 'discount', discountPercent: 20, code: 'LAUNCH20', startDate: '2025-12-01', endDate: '2025-12-31', status: 'expired', uses: 156, maxUses: 200 },
    ]);

    const stats = {
        active: promotions.filter(p => p.status === 'active').length,
        scheduled: promotions.filter(p => p.status === 'scheduled').length,
        totalUses: promotions.reduce((sum, p) => sum + p.uses, 0),
        revenue: 2381 * 0.28
    };

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🏷️ Book Promotions & Campaigns
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Discounts, special bundles, and paid promotional campaign tracking
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Create Promotion
                    </button>
                </div>
            </div>

            {/* Top 4 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">{stats.active}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Running Online</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled</div>
                    <div className="text-3xl font-extrabold text-amber-600 mt-1">{stats.scheduled}</div>
                    <div className="text-[10px] text-amber-600 font-semibold mt-1">Upcoming Launches</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Redemptions</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">{stats.totalUses.toLocaleString()}</div>
                    <div className="text-[10px] text-indigo-600 font-semibold mt-1">Coupon Uses</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Attributed Royalties</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">${stats.revenue.toFixed(0)} <span className="text-xs font-normal text-slate-400">USD</span></div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">From Promos</div>
                </div>
            </div>

            {/* Promotions List Cards */}
            <div className="space-y-4">
                {promotions.map(promo => (
                    <div key={promo.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">{promo.title}</h3>
                                <p className="text-xs text-slate-500 font-semibold mt-0.5">{promo.bookTitle}</p>
                                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{promo.startDate} ➔ {promo.endDate}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto ${
                                promo.status === 'active' 
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                    : promo.status === 'scheduled'
                                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                                {promo.status.toUpperCase()}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Discount Benefit</div>
                                <div className="text-xl font-extrabold text-emerald-600 mt-0.5">
                                    {promo.discountPercent ? `${promo.discountPercent}% OFF` : promo.type === 'free' ? 'FREE CHAPTER' : 'BUNDLE SPECIAL'}
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Promo Code</div>
                                <div className="text-lg font-mono font-bold text-slate-900 mt-0.5">
                                    {promo.code}
                                </div>
                            </div>
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                                <div className="text-[10px] uppercase font-bold text-slate-400">Uses / Capacity</div>
                                <div className="text-lg font-mono font-bold text-indigo-600 mt-0.5">
                                    {promo.uses.toLocaleString()} / {promo.maxUses.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full" 
                                style={{ width: `${Math.min(100, (promo.uses / promo.maxUses) * 100)}%` }} 
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
                                Edit Promo
                            </button>
                            <Link href="/admin/seo" className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 cursor-pointer">
                                View Traffic Attribution →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
