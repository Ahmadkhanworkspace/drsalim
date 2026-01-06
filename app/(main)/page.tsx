import Hero from "@/components/Hero";
import PremiumBookShowcase from "@/components/BookCarousel";
import Stats from "@/components/Stats";
import PremiumArticleCard from "@/components/ArticleCard";
import TestimonialsSlider from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import { books } from "@/data/books";
// import { articles } from "@/data/articles";
import { getArticles } from "@/app/lib/actions";
import { testimonials } from "@/data/testimonials";

export default async function Home() {
  const articles = await getArticles();
  return (
    <main>
      {/* Hero Section with Slider */}
      <Hero />

      {/* Books Section with Carousel */}
      <section id="books" className="section" style={{
        background: 'var(--color-bg-secondary)', // Light background for contrast
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'rgba(37, 99, 235, 0.1)', // var(--color-primary) tint
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-primary)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: 'var(--spacing-md)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '1px solid rgba(37, 99, 235, 0.2)'
            }}>
              Published Works
            </div>

            <h2 style={{
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-navy)'
            }}>
              Download His Books Now on Amazon
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              Begin your journey of discovery with profound insights and scholarly reflections
            </p>
          </div>

          <PremiumBookShowcase books={books} />
        </div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Articles Section */}
      <section id="articles" className="section" style={{
        background: 'var(--color-bg-dark)', // White
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1.5rem',
              background: 'rgba(59, 130, 246, 0.1)', // var(--color-primary)
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-gold)',
              fontWeight: 700,
              fontSize: '0.9rem',
              marginBottom: 'var(--spacing-md)',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              Latest Articles
            </div>

            <h2 style={{
              marginBottom: 'var(--spacing-md)',
              color: 'var(--color-text-primary)'
            }}>
              Expand Your Knowledge with Thought-Provoking Articles
            </h2>

            <p style={{
              fontSize: '1.2rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: 1.8
            }}>
              Dive into Dr. Muhammad Salim&apos;s insights and reflections on spirituality, philosophy, and Islamic studies
            </p>
          </div>

          <div className="grid-3">
            {articles.map((article, index) => (
              <PremiumArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSlider testimonials={testimonials} />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}
