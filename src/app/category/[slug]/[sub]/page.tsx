import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCategoryBySlug } from "@/lib/categories";
import { getSubcategory } from "@/lib/products";
import ZoomCard from "@/components/ZoomCard";
import SearchButton from "@/components/SearchButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const { slug, sub } = await params;
  const subcategory = getSubcategory(slug, sub);
  if (!subcategory) return { title: "Not Found" };
  return {
    title: `${subcategory.name} — KeyLight`,
  };
}

export default async function SubcategoryPage({ params }: { params: Promise<{ slug: string; sub: string }> }) {
  const { slug, sub } = await params;
  const category = getCategoryBySlug(slug);
  const subcategory = getSubcategory(slug, sub);
  if (!category || !subcategory) notFound();

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* Header */}
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
          <div className="flex items-center gap-3">
            <SearchButton />
            <Link href={`/category/${slug}`} className="text-accent hover:text-white text-sm font-semibold transition-colors">
              ← Back
            </Link>
          </div>
        </div>
      </header>

      {/* Product grid only */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-16 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
          {subcategory.products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer"
            >
              {product.slug ? (
                <Link href={`/product/${product.slug}`}>
                  <ZoomCard image={product.image} name={product.name} showMoreDetails />
                </Link>
              ) : product.link ? (
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <ZoomCard image={product.image} name={product.name} />
                </a>
              ) : (
                <ZoomCard image={product.image} name={product.name} />
              )}
              <h3 className="text-accent font-medium text-sm text-center mt-4">
                {product.name}
              </h3>
              <p className="text-white/30 text-[10px] text-center mt-2">
                SKU: {product.sku || product.name.toUpperCase().replace(/\s+/g, "-")}
              </p>
              <p className="text-white/30 text-[10px] text-center mt-1">
                Categories: {product.categories ? product.categories.join(", ") : `${sub}, Profile Aluminum`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
