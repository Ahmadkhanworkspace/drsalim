import Hero from "@/components/Hero";
import PremiumBookShowcase from "@/components/BookCarousel";
import ArticlesSection from "@/components/ArticlesSection";
import DailyWisdom from "@/components/DailyWisdom";
import QACallout from "@/components/QACallout";
import HeritageTimeline from "@/components/HeritageTimeline";
import TestimonialsSlider from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { books } from "@/data/books";
import { getArticles } from "@/app/lib/actions";
import { testimonials } from "@/data/testimonials";

export default async function Home() {
  const articles = await getArticles();
  
  return (
    <main className="bg-white min-h-screen text-stone-900 overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Published Books Showcase Section */}
      <section id="books" className="py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-crimson-800 mb-2 block">
              Published Library
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-stone-900 mb-3 tracking-tight font-heading">
              Books by <span className="text-crimson-800 font-serif italic font-normal">Dr. Muhammad Salim</span>
            </h2>
            <div className="w-16 h-1 bg-crimson-800 mx-auto mb-4 rounded-full" />
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light">
              Authoritative published volumes on Islamic psychology, divine providence, moral philosophy, and human development.
            </p>
          </div>

          <PremiumBookShowcase books={books} />
        </div>
      </section>

      {/* 3. Published Articles & Commentary */}
      <ArticlesSection articles={articles} />

      {/* 4. Daily Reflection Generator */}
      <DailyWisdom />

      {/* 5. Ask the Author (Q&A Showcase) */}
      <QACallout />

      {/* 6. Author Biography & Heritage */}
      <HeritageTimeline />

      {/* 7. Global Reader Endorsements */}
      <TestimonialsSlider testimonials={testimonials} />
      
      {/* 8. Newsletter Subscription */}
      <Newsletter />
    </main>
  );
}
