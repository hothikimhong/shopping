import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product-card";

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    where: {
      isNew: true,
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts = products.map((p) => ({
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
            New Arrivals
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The latest additions to our collection. Explore modern silhouettes and premium materials designed for the contemporary lifestyle.
          </p>
        </div>

        {formattedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-medium">Coming Soon</h2>
            <p className="text-muted-foreground">Our next collection is just around the corner. Stay tuned.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {formattedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
