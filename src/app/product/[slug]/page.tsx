import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProductView } from "./product-view";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      images: true,
      category: true,
      variants: true,
    },
  });

  if (!product) {
    notFound();
  }

  return <ProductView product={product} />;
}
