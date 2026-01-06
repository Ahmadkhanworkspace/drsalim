import Hero from "@/components/Hero";
import PremiumBookShowcase from "@/components/BookCarousel";
import Stats from "@/components/Stats";
import PremiumArticleCard from "@/components/ArticleCard";
import TestimonialsSlider from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { books } from "@/data/books";
import { getArticles } from "@/app/lib/actions";
import { testimonials } from "@/data/testimonials";

export default async function Home() {
  const articles = await getArticles();
  return (
    <main>
      <Hero />

      <section id="books" className="section" style={{ background: 'var(--color-bg-sand)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-text-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              Literary Works
            </span>
            <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-text-navy)' }}>
              A Lifetime of Publishing
            </h2>
            <div className="divider-gold" />
            <p style={{
              color: 'var(--color-text-body)',
              maxWidth: '700px',
              margin: '0 auto',
              fontSize: '1.2rem',
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic'
            }}>
              Exploring the depths of human spirituality through the written word.
            </p>
          </div>

          <PremiumBookShowcase books={books} />
        </div>
      </section>

      <Stats />

      <section id="articles" className="section" style={{ background: 'var(--color-bg-navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'block',
              marginBottom: '1rem'
            }}>
              Latest Insights
            </span>
            <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>
              Words of Wisdom
            </h2>
            <div className="divider-gold" />
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '700px',
              margin: '0 auto',
              fontSize: '1.1rem'
            }}>
              Read the latest thoughts and research articles.
            </p>
          </div>

          <div className="grid-3">
            {articles.map((article, index) => (
              <PremiumArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSlider testimonials={testimonials} />
      <Newsletter />
    </main>
  );
}
