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
    <main className="bg-[#FAF7F2] min-h-screen text-[#1A1715] overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Published Books Showcase Section */}
      <section id="books" className="py-20 sm:py-28 bg-[#FAF7F2] border-b border-[#E3DBD0]">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#7A1C1C] mb-2 block">
              The Published Canon
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-[#1A1715] mb-3 tracking-tight font-heading">
              Books by <span className="text-[#7A1C1C] font-serif italic font-normal">Dr. Muhammad Salim</span>
            </h2>
            <div className="w-16 h-1 bg-[#7A1C1C] mx-auto mb-4 rounded-full" />
            <p className="text-[#554E48] text-sm sm:text-base leading-relaxed font-light">
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
