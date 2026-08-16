import Hero from "@/components/Hero";
import PremiumBookShowcase from "@/components/BookCarousel";
import Stats from "@/components/Stats";
import ArticlesSection from "@/components/ArticlesSection";
import DailyWisdom from "@/components/DailyWisdom";
import HeritageTimeline from "@/components/HeritageTimeline";
import TestimonialsSlider from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { books } from "@/data/books";
import { getArticles } from "@/app/lib/actions";
import { testimonials } from "@/data/testimonials";

export default async function Home() {
  const articles = await getArticles();
  
  return (
    <main className="bg-[#07090D] min-h-screen">
      {/* 1. Ultra-Luxury Hero Section */}
      <Hero />

      {/* 2. Interactive 3D Books Showcase Section */}
      <section id="books" className="section relative overflow-hidden bg-[#0A0D12] py-24 border-b border-amber-500/10">
        {/* Background Mesh */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-crimson-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="container relative z-10 px-6 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <AnimatedWrapper>
              <span className="text-amber-400 font-mono font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-4 block">
                Published Literary Works
              </span>
              <h2 className="text-4xl sm:text-6xl text-white mb-6 font-bold tracking-tight font-heading">
                Monuments of <br />
                <span className="bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400 bg-clip-text text-transparent font-serif italic font-normal">
                  Wisdom & Faith
                </span>
              </h2>
              <div className="w-24 h-[1px] bg-gradient-to-r from-crimson-500 via-amber-500 to-transparent mx-auto mb-6" />
              <p className="text-base sm:text-lg text-stone-300/80 italic max-w-2xl mx-auto leading-relaxed font-light">
                "Navigating the sacred corridors of theological inquiry and classical tradition to illuminate the modern path."
              </p>
            </AnimatedWrapper>
          </div>

          <PremiumBookShowcase books={books} />
        </div>
      </section>

      {/* 3. Global Reader Impact Stats */}
      <Stats />

      {/* 4. Highly Appealing Blog & Critical Discourse Section */}
      <ArticlesSection articles={articles} />

      {/* 5. Daily Wisdom / Interactive Contemplation Generator */}
      <DailyWisdom />

      {/* 6. Scholar 40-Year Heritage Journey */}
      <HeritageTimeline />

      {/* 7. Global Reader Testimonials & Endorsements */}
      <TestimonialsSlider testimonials={testimonials} />
      
      {/* 8. Scholar's Dispatch Luxury Newsletter */}
      <section className="bg-[#07090D] border-t border-white/10">
        <Newsletter />
      </section>
    </main>
  );
}
