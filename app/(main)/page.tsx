import Hero from "@/components/Hero";
import PremiumBookShowcase from "@/components/BookCarousel";
import Stats from "@/components/Stats";
import PremiumArticleCard from "@/components/ArticleCard";
import TestimonialsSlider from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import AnimatedWrapper from "@/components/AnimatedWrapper";
import { books } from "@/data/books";
import { getArticles } from "@/app/lib/actions";
import { testimonials } from "@/data/testimonials";

export default async function Home() {
  const articles = await getArticles();
  
  return (
    <main className="bg-charcoal-950">
      <Hero />

      {/* Books Section - Imperial Dark */}
      <section id="books" className="section relative overflow-hidden bg-charcoal-900">
        {/* Background Mesh */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-crimson-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-32">
            <AnimatedWrapper>
                <span className="text-crimson-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                Literary Masterpieces
                </span>
                <h2 className="text-5xl md:text-8xl text-white mb-10 font-bold tracking-tighter">
                Monuments of <br /> <span className="text-crimson-500 font-serif-italic font-normal px-2">Wisdom</span>
                </h2>
                <div className="w-24 h-[1px] bg-crimson-500/30 mx-auto mb-10" />
                <p className="text-xl text-stone-400 italic max-w-2xl mx-auto leading-relaxed">
                "Navigating the sacred corridors of history and faith to illuminate the modern path with the torch of classical knowledge."
                </p>
            </AnimatedWrapper>
          </div>

          <PremiumBookShowcase books={books} />
        </div>
      </section>

      <Stats />

      {/* Articles Section - High Contrast Charcoal */}
      <section id="articles" className="section relative bg-charcoal-950 text-white overflow-hidden border-y border-white/5">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 gap-12">
            <AnimatedWrapper className="max-w-3xl">
              <span className="text-crimson-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">
                Philosophical Inquiry
              </span>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter">
                Recent <span className="text-stone-400 font-serif-italic font-normal px-1">Discourse</span> <br /> 
                & Critical Thought
              </h2>
            </AnimatedWrapper>
            <div className="max-w-sm border-l border-crimson-500/20 pl-10 py-2">
                <p className="text-stone-400 text-lg leading-relaxed font-light italic">
                Engaging with deep research and contemporary perspectives on timeless existential subjects.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article, index) => (
              <PremiumArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>

          <div className="mt-32 text-center">
            <a href="/articles" className="btn btn-outline hover:shadow-[0_0_50px_rgba(153,0,0,0.2)]">
              Explore the Archive
            </a>
          </div>
        </div>
      </section>

      {/* About the Author - Imperial Narrative */}
      <section id="about" className="section relative overflow-hidden bg-charcoal-900 border-b border-white/5">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(153,0,0,0.05)_0%,transparent_50%)]" />
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <AnimatedWrapper className="relative">
                <div className="aspect-[4/5] bg-charcoal-950 border border-crimson-500/20 relative group overflow-hidden">
                    {/* Placeholder for Author Image */}
                    <div className="absolute inset-0 flex items-center justify-center text-crimson-500/10">
                        <span className="text-[10rem] font-heading font-black opacity-20">MS</span>
                    </div>
                    {/* Decorative Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-transparent" />
                    
                    {/* 40+ Years Badge */}
                    <div className="absolute bottom-12 right-12 bg-crimson-500 px-8 py-4 shadow-[0_20px_50px_rgba(153,0,0,0.3)]">
                        <span className="text-3xl font-bold text-white block leading-none">40+</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/80">Years of Legacy</span>
                    </div>
                </div>
            </AnimatedWrapper>

            <AnimatedWrapper delay={0.2}>
              <span className="text-crimson-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">
                The Architect of Discourse
              </span>
              <h2 className="text-5xl md:text-7xl text-white font-bold mb-10 tracking-tighter leading-none">
                Dr. Muhammad <br /> <span className="text-stone-400 font-serif-italic font-normal">Salim</span>
              </h2>
              <div className="w-20 h-[1px] bg-crimson-500 mb-12" />
              
              <div className="space-y-8 text-stone-300 text-lg leading-relaxed font-light">
                <p>
                    Dr. Muhammad Salim has devoted over <span className="text-white font-medium italic">four decades</span> to the study and teaching of Islamic theology, philosophy, and spirituality. His work serves as a bridge, connecting the profound depths of classical scholarship with the complexities of contemporary thought.
                </p>
                <p>
                    With a prolific archive of more than <span className="text-white font-medium italic">200 publications</span> and 20 seminal books, Dr. Salim has established himself as a preeminent voice in Islamic studies, guiding thousands through the intersections of faith, reason, and existence.
                </p>
              </div>

              <div className="mt-16 flex gap-12">
                <div>
                    <span className="text-3xl font-bold text-white block mb-2">20+</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-crimson-500">Books Published</span>
                </div>
                <div className="w-[1px] h-12 bg-white/10" />
                <div>
                    <span className="text-3xl font-bold text-white block mb-2">200+</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-crimson-500">Treatises & Articles</span>
                </div>
              </div>

              <div className="mt-20">
                <a href="/about" className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-crimson-500 transition-colors duration-500">
                    Explore the Biography
                    <span className="w-12 h-[1px] bg-crimson-500 group-hover:w-20 transition-all duration-700" />
                </a>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      <TestimonialsSlider testimonials={testimonials} />
      
      <section className="bg-charcoal-900 border-t border-white/5">
        <Newsletter />
      </section>
    </main>
  );
}
