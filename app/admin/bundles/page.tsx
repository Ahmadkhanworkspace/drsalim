'use client';

import { useState } from 'react';

export default function BundlesPage() {
    const bundles = [
        {
            id: '1',
            name: 'Complete Spiritual Growth 3-Volume Boxset',
            books: ['Brotherhood', 'Spiritual Diseases', 'Human Journey'],
            regularPrice: 59,
            bundlePrice: 45,
            discount: 24,
            sales: 20,
            revenue: 900
        },
        {
            id: '2',
            name: 'Divine Providence 2-Volume Complete Theological Set',
            books: ['Divine Providence Vol 1', 'Divine Providence Vol 2'],
            regularPrice: 40,
            bundlePrice: 32,
            discount: 20,
            sales: 12,
            revenue: 384
        },
        {
            id: '3',
            name: 'Islamic Ethics & Community Collector Bundle',
            books: ['Brotherhood', 'Human Journey'],
            regularPrice: 38,
            bundlePrice: 29,
            discount: 24,
            sales: 18,
            revenue: 522
        }
    ];

    const totalBundles = bundles.length;
    const totalSales = bundles.reduce((sum, b) => sum + b.sales, 0);
    const totalRevenue = bundles.reduce((sum, b) => sum + b.revenue, 0);

    return (
        <div className="space-y-6">
            
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        🎁 Multi-Book Bundles & Boxsets
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Create discounted multi-volume collections across Amazon KDP, Etsy, and web store
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer">
                        + Create Boxset Bundle
                    </button>
                </div>
            </div>

            {/* Top 3 KPI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Boxsets</div>
                    <div className="text-3xl font-extrabold text-slate-900 mt-1">{totalBundles} Bundles</div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Available Globally</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Sets Sold</div>
                    <div className="text-3xl font-extrabold text-indigo-600 mt-1">{totalSales} Boxsets</div>
                    <div className="text-[10px] text-indigo-500 font-semibold mt-1">Paperback & Hardcover</div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bundle Revenue</div>
                    <div className="text-3xl font-extrabold text-emerald-600 mt-1">${totalRevenue.toLocaleString()} <span className="text-xs font-normal text-slate-400">USD</span></div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-1">Attributed Royalties</div>
                </div>
            </div>

            {/* Bundles Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bundles.map(bundle => (
                    <div key={bundle.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
                        <div>
                            <div className="flex justify-between items-start gap-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                                    {bundle.discount}% SAVINGS
                                </span>
                                <span className="text-xs font-bold text-slate-400">ID #{bundle.id}</span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900 mt-3">{bundle.name}</h3>

                            <div className="mt-3 p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                                <div className="text-[10px] font-bold uppercase text-slate-400">Included Volumes:</div>
                                {bundle.books.map((b, i) => (
                                    <div key={i} className="text-xs text-slate-700 font-medium flex items-center gap-1">
                                        <span>•</span> {b}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-2xl font-extrabold text-slate-900">${bundle.bundlePrice}</span>
                                <span className="text-sm line-through text-slate-400">${bundle.regularPrice}</span>
                                <span className="text-xs text-slate-500 font-semibold ml-auto">{bundle.sales} sold</span>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex gap-2">
                            <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 transition-colors cursor-pointer">
                                Edit Bundle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
