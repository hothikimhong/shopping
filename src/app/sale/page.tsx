import prisma from "@/lib/prisma";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product-card";

export default async function SalePage() {
  const products = await prisma.product.findMany({
    where: {
      salePrice: {
        not: null,
      },
    },
    include: {
      images: true,
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
          <h1 className="font-serif text-5xl font-bold tracking-tight uppercase text-red-600">
            Exclusive Sale
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Unbeatable offers on our most coveted pieces. Elevate your wardrobe with luxury essentials at exceptional prices.
          </p>
        </div>

        {formattedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-medium">No sale products currently</h2>
            <p className="text-muted-foreground">Check back soon for our next exclusive offers.</p>
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
