import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { containerClasses } from "@/lib/theme";
import { blogPosts } from "@/lib/data";

function ArticleCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1}>
      <a href={`/journal/${post.slug}`} className="group block">
        <div className="relative h-52 overflow-hidden bg-gray-light mb-5">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent">
            {post.category}
          </span>
          <span className="text-gray-mid text-xs">{post.date}</span>
          <span className="text-gray-mid text-xs">· {post.readTime}</span>
        </div>
        <h3 className="text-brand-black font-bold text-lg leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
          {post.title}
        </h3>
        <p className="text-gray-mid text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
      </a>
    </ScrollReveal>
  );
}

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured)!;
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <section id="blog" className="bg-gray-light py-32">
      <div className={containerClasses}>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-mid mb-5">
                Journal
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2
                className="font-bold text-brand-black leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
              >
                Ideas on light<br />& living.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.15} direction="left">
            <a
              href="/journal"
              className="inline-flex items-center gap-2 text-brand-black font-semibold text-sm border-b-2 border-brand-black pb-0.5 hover:border-accent hover:text-accent transition-colors duration-300 group whitespace-nowrap"
            >
              All articles
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </ScrollReveal>
        </div>

        {/* Featured + grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured post */}
          <ScrollReveal className="lg:col-span-2">
            <a href={`/journal/${featured.slug}`} className="group block h-full">
              <div className="relative h-64 lg:h-80 overflow-hidden bg-gray-mid mb-6">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent" />
                <span className="absolute bottom-4 left-4 text-[10px] font-bold tracking-[0.15em] uppercase text-accent bg-brand-black/60 px-3 py-1.5">
                  {featured.category}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-gray-mid text-xs">{featured.date}</span>
                <span className="text-gray-mid text-xs">· {featured.readTime}</span>
              </div>
              <h3
                className="text-brand-black font-bold leading-snug mb-3 group-hover:text-accent transition-colors duration-300"
                style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
              >
                {featured.title}
              </h3>
              <p className="text-gray-mid text-sm leading-relaxed">{featured.excerpt}</p>
            </a>
          </ScrollReveal>

          {/* Divider */}
          <div className="hidden lg:flex lg:col-span-1 justify-center">
            <div className="w-px bg-brand-black/10 h-full" />
          </div>

          {/* Other posts */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {rest.map((post, i) => (
              <ArticleCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
