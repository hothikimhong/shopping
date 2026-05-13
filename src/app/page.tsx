import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import prisma from "@/lib/prisma";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    include: { images: true },
    take: 4,
  });

  const productsForGrid = featuredProducts.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    images: p.images.map(img => img.url),
    isNew: p.isNew,
    stock: p.stock,
  }));
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="/hero.png"
          alt="Luxury Fashion"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <Container className="relative flex h-full flex-col justify-center text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Elevate Your <br /> 
              <span className="text-primary italic">Signature</span> Style
            </h1>
            <p className="text-lg text-white/80 md:text-xl">
              Discover the new Autumn/Winter collection. Timeless pieces designed for the modern connoisseur.
            </p>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="rounded-none">
                Shop Collection
              </Button>
              <Button variant="outline" size="lg" className="rounded-none border-white text-white hover:bg-white hover:text-black">
                View Lookbook
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section>
        <Container>
          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-widest md:text-4xl">Curated Collections</h2>
            <div className="h-1 w-20 bg-primary" />
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Men's Collection */}
            <Link href="/category/men" className="group relative h-[600px] overflow-hidden">
              <Image
                src="/men.png"
                alt="Men's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Men's Essentials</h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-all group-hover:gap-4">
                  Explore <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            {/* Women's Collection */}
            <Link href="/category/women" className="group relative h-[600px] overflow-hidden">
              <Image
                src="/women.png"
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="text-2xl font-bold uppercase tracking-wider">Women's Luxury</h3>
                <div className="mt-2 flex items-center gap-2 text-sm font-medium uppercase tracking-widest transition-all group-hover:gap-4">
                  Explore <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Trending Products Grid (Placeholder) */}
      <section className="bg-accent/30 py-20 dark:bg-secondary/20">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-widest">Trending Now</h2>
              <p className="mt-2 text-muted">The most coveted pieces of the season.</p>
            </div>
            <Link href="/shop" className="text-sm font-bold uppercase tracking-widest text-primary hover:underline">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {productsForGrid.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <Container>
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold uppercase tracking-widest">Join the Club</h2>
              <p className="max-w-xl text-muted">
                Subscribe to our newsletter and get 15% off your first order. Be the first to hear about new arrivals and exclusive events.
              </p>
            </div>
            <form className="flex w-full max-w-md gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border-b border-muted bg-transparent pb-2 text-sm outline-none focus:border-primary"
              />
              <Button variant="primary" className="rounded-none uppercase tracking-widest">
                Join
              </Button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
