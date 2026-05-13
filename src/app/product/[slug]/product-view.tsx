"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { useWishlist } from "@/store/use-wishlist";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductViewProps {
  product: any; // Use proper type in real app
}

export const ProductView = ({ product }: ProductViewProps) => {
  const [selectedSize, setSelectedSize] = useState("");
  const cart = useCart();
  const wishlist = useWishlist();
  const isFavorite = wishlist.isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize && product.category.name !== "Accessories") {
      toast.error("Please select a size");
      return;
    }
    cart.addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image: product.images[0]?.url || "/placeholder.png",
      quantity: 1,
      size: selectedSize,
    });
    toast.success("Added to cart");
  };

  const handleToggleWishlist = () => {
    if (isFavorite) {
      wishlist.removeItem(product.id);
      toast.success("Removed from wishlist");
    } else {
      wishlist.addItem({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.images[0]?.url || "/placeholder.png",
        slug: product.slug,
      });
      toast.success("Added to wishlist");
    }
  };

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image Gallery */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative aspect-[3/4] overflow-hidden bg-accent/30 dark:bg-secondary/30"
        >
          <Image
            src={product.images[0]?.url || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col gap-8"
        >
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-primary">
              {product.category.name}
            </p>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">{product.name}</h1>
            <p className="text-2xl font-bold text-foreground/90">${Number(product.price).toFixed(2)}</p>
          </div>

          <div className="h-px bg-border w-full" />

          <div className="space-y-6">
            <p className="leading-relaxed text-muted">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.category.name !== "Accessories" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-widest">Select Size</span>
                  <button className="text-xs text-muted underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "flex h-12 w-12 items-center justify-center border text-sm transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-white"
                          : "border-border hover:border-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 rounded-none uppercase tracking-widest"
                disabled={product.stock === 0}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button 
                onClick={handleToggleWishlist}
                variant="outline" 
                size="lg" 
                className={cn(
                  "rounded-none border-border px-6 transition-all",
                  isFavorite ? "border-red-500 text-red-500" : "hover:border-primary hover:text-primary"
                )}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={20} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RotateCcw size={20} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <ShieldCheck size={20} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Secure Payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};
