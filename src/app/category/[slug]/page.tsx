import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/lib/categories";
import SearchButton from "@/components/SearchButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Not Found" };
  return {
    title: `${category.title} — KeyLight`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-brand-black">
      {/* Header bar */}
      <header className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-keylight.png"
              alt="KeyLight"
              width={140}
              height={43}
              priority
              style={{ width: 140, height: "auto", filter: "invert(1) hue-rotate(180deg)" }}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`text-sm transition-colors duration-200 ${
                  c.slug === slug
                    ? "text-accent font-semibold"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {c.title}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <SearchButton />
            <Link href="/" className="text-accent hover:text-white text-sm font-semibold transition-colors">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="border-b border-white/10 py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          <h1
            className="font-bold text-accent tracking-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {category.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar */}
          <aside className="lg:w-96 shrink-0 border-r border-white/5 pr-12">
            <div className="mb-20">
              <ul className="flex flex-col">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <div className="border-t border-white/[0.06]" />
                    <Link
                      href={`/category/${c.slug}`}
                      style={{ padding: "2.5rem 0" }}
                      className={`group flex items-center justify-between transition-all duration-500 ${
                        c.slug === slug ? "text-accent" : "text-white/30 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span className={`block w-5 h-px transition-all duration-500 ${c.slug === slug ? "bg-accent" : "bg-white/20 group-hover:bg-white"}`} />
                        <span className={`text-[12px] tracking-[0.15em] uppercase font-semibold transition-all duration-500 ${c.slug === slug ? "" : "group-hover:translate-x-1"}`}>
                          {c.title}
                        </span>
                      </div>
                      <span className={`text-[10px] tracking-widest transition-all duration-500 ${c.slug === slug ? "opacity-100 text-accent" : "opacity-0 group-hover:opacity-30"}`}>
                        ——
                      </span>
                    </Link>
                  </li>
                ))}
                <div className="border-t border-white/[0.06]" />
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {category.subcategories.map((item) => (
                <Link
                  key={item.id}
                  href={`/category/${slug}/${item.slug}`}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden mb-5 border border-white/5">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-brand-black/0 transition-colors duration-500" />
                  </div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-accent transition-colors duration-300 text-center">
                    {item.name}
                  </h3>
                  {item.count !== undefined && (
                    <p className="text-white/30 text-xs mt-1 text-center">
                      {item.count} {item.count === 1 ? "Product" : "Products"}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-accent mt-8">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8 flex items-center justify-between">
          <Image
            src="/logo-keylight.png"
            alt="KeyLight"
            width={120}
            height={37}
            style={{ width: 120, height: "auto" }}
          />
          <p className="text-brand-black/50 text-xs">
            © {new Date().getFullYear()} KeyLight. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
