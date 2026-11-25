import Link from 'next/link';
import { curatedQA } from '@/data/qa';

export default function QACallout() {
    // Pick 2 top questions for the homepage teaser
    const teaserQA = curatedQA.slice(0, 2);

    return (
        <section className="py-20 sm:py-24 bg-[#F5F1E8] border-b border-[#E3DBD0]">
            <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-14">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] mb-2 block">
                        Scholarly Inquiries & Guidance
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1715] mb-3 tracking-tight font-heading">
                        Ask <span className="text-[#7A1C1C] font-serif italic font-normal">Dr. Muhammad Salim</span>
                    </h2>
                    <div className="w-16 h-1 bg-[#7A1C1C] mx-auto mb-4 rounded-full" />
                    <p className="text-[#554E48] text-sm sm:text-base leading-relaxed font-light">
                        Guidance and answers on personal growth, overcoming spiritual illnesses, and living with purpose.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-10">
                    {teaserQA.map((item) => (
                        <div
                            key={item.id}
                            className="p-7 rounded-3xl bg-white border border-[#E3DBD0] hover:border-[#C5A059]/60 hover:shadow-lg transition-all flex flex-col justify-between"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-mono">
                                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 font-bold text-[10px] uppercase">
                                        {item.category}
                                    </span>
                                    <span className="text-stone-400 text-[11px]">{item.askedBy}</span>
                                </div>
                                <h3 className="font-bold text-stone-900 text-base font-heading leading-snug">
                                    "{item.question}"
                                </h3>
                                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed line-clamp-3">
                                    {item.answer}
                                </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                                <Link
                                    href="/qa"
                                    className="text-xs font-bold text-crimson-800 hover:underline flex items-center gap-1"
                                >
                                    <span>Read Full Answer</span>
                                    <span>→</span>
                                </Link>
                                <span className="text-[11px] font-mono text-stone-400">Dr. Salim</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/qa"
                        className="btn btn-primary text-xs px-8 py-3.5 inline-flex items-center gap-2"
                    >
                        <span>Explore All Questions & Ask Your Own</span>
                        <span>→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
