import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <article className="pt-36 pb-16 sm:pt-44 sm:pb-24">
          <Container className="max-w-3xl">
            <Reveal className="flex flex-col gap-6">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <ArrowLeft size={16} />
                Retour au blog
              </Link>

              <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-2">
                {post.category}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-5 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} /> {post.readTime} de lecture
                </span>
              </div>

              <div className="flex flex-col gap-5 pt-4 text-base sm:text-lg text-muted leading-relaxed">
                {post.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </Container>
        </article>

        <section className="py-16 sm:py-20 border-t border-border-soft">
          <Container className="flex flex-col gap-8">
            <h2 className="font-display text-2xl font-semibold">Articles similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group h-full flex flex-col gap-3 rounded-3xl border border-border-soft bg-surface p-6 hover:border-primary/40 hover:-translate-y-1 transition-all"
                >
                  <span className="inline-flex items-center gap-2 self-start rounded-full border border-border-soft bg-surface-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-2">
                    {p.category}
                  </span>
                  <h3 className="font-display text-lg font-semibold leading-snug group-hover:text-primary-2 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">{p.excerpt}</p>
                  <span className="flex items-center gap-1.5 text-sm text-primary-2 font-semibold">
                    Lire l&apos;article <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
