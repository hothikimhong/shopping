"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    images: string[];
    isNew?: boolean;
    stock: number;
  };
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const cart = useCart();
  const wishlist = useWishlist();
  const isFavorite = wishlist.isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0) {
      toast.error("Out of stock");
      return;
    }
    cart.addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
    toast.success("Added to cart");
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite) {
      wishlist.removeItem(product.id);
      toast.success("Removed from wishlist");
    } else {
      wishlist.addItem({
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images[0],
        slug: product.slug,
      });
      toast.success("Added to wishlist");
    }
  };

  return (
    <div className="group cursor-pointer space-y-4">
      <Link href={`/product/${product.slug}`} className="relative block aspect-[3/4] overflow-hidden bg-accent/50 dark:bg-secondary/50">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-primary px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
              Sale
            </span>
          )}
          {product.stock === 0 && (
            <span className="bg-secondary px-2 py-1 text-[10px] font-bold uppercase text-white shadow-sm">
              Sold Out
            </span>
          )}
        </div>

        {/* Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button 
            onClick={handleAddToCart}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 hover:scale-110 active:scale-95"
          >
            <ShoppingBag size={20} />
          </button>
          <button 
            onClick={handleToggleWishlist}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 hover:scale-110 active:scale-95",
              isFavorite ? "text-red-500" : "text-black"
            )}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <Link href={`/product/${product.slug}`} className="text-sm font-medium transition-colors hover:text-primary">
            {product.name}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {product.salePrice ? (
            <>
              <p className="text-sm font-bold text-red-600">${product.salePrice.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground line-through">${product.price.toFixed(2)}</p>
            </>
          ) : (
            <p className="text-sm font-bold text-foreground/90">${product.price.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
