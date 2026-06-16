import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { BLOG_POSTS } from "@/lib/blog";

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          eyebrow="Blog"
          title={
            <>
              Actualités IA, conseils business <span className="gradient-text">et études de cas</span>
            </>
          }
          description="Tout ce qu'il faut savoir pour tirer le meilleur parti de votre jumeau numérique et de vos agents IA."
        />

        <section className="pb-16 sm:pb-20">
          <Container className="flex flex-col gap-12">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group block rounded-3xl border border-border-soft bg-surface p-8 sm:p-10 hover:border-primary/40 transition-colors"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2">
                  {featured.category}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight mt-5 group-hover:text-primary-2 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted leading-relaxed mt-3 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-5 mt-6 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {featured.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {featured.readTime} de lecture
                  </span>
                  <span className="flex items-center gap-1.5 text-primary-2 font-semibold">
                    Lire l&apos;article <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group h-full flex flex-col gap-4 rounded-3xl border border-border-soft bg-surface p-6 hover:border-primary/40 hover:-translate-y-1 transition-all"
                  >
                    <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-2">
                      {post.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary-2 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted pt-2 border-t border-border-soft">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
