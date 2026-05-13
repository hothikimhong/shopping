import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product-card";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        include: {
          images: true,
        },
      },
    },
  });

  if (!category) {
    notFound();
  }

  // Format products for the ProductCard
  const products = category.products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    salePrice: p.salePrice ? Number(p.salePrice) : null,
    images: p.images.map((img) => img.url),
    isNew: p.isNew,
    stock: p.stock,
  }));

  return (
    <div className="pt-32 pb-20">
      <Container>
        <div className="mb-12 space-y-4">
          <h1 className="font-serif text-5xl font-bold tracking-tight uppercase">
            {category.name}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {category.description || `Discover our curated collection of ${category.name.toLowerCase()}. Crafted with precision and timeless elegance.`}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-medium">No products found</h2>
            <p className="text-muted-foreground">We couldn't find any products in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
