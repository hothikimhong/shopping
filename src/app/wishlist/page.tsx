"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/store/use-wishlist";
import { useCart } from "@/store/use-cart";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const wishlist = useWishlist();
  const cart = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleMoveToCart = (item: any) => {
    cart.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    wishlist.removeItem(item.id);
    toast.success("Moved to cart");
  };

  return (
    <div className="pt-32 pb-20 min-h-[70vh]">
      <Container>
        <div className="mb-12 space-y-4">
          <h1 className="font-serif text-5xl font-bold tracking-tight uppercase">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Reserved pieces of elegance. Review and manage your curated selection of luxury fashion.
          </p>
        </div>

        {wishlist.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-accent/30 bg-accent/5">
            <div className="mb-6 rounded-full bg-accent/20 p-6">
              <ShoppingBag size={48} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground max-w-xs mb-8">
              Start adding your favorite pieces to your wishlist and find them here later.
            </p>
            <Link href="/">
              <Button variant="primary" className="rounded-none px-8 py-6 uppercase tracking-widest flex items-center gap-2">
                Continue Shopping <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence>
              {wishlist.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative flex flex-col space-y-4 border border-accent/20 bg-background p-4 transition-all hover:shadow-xl"
                >
                  <Link href={`/product/${item.slug}`} className="relative aspect-[3/4] overflow-hidden bg-accent/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        wishlist.removeItem(item.id);
                        toast.success("Removed from wishlist");
                      }}
                      className="absolute top-2 right-2 rounded-full bg-white/90 p-2 text-black opacity-0 transition-opacity hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 shadow-sm"
                    >
                      <Trash2 size={18} />
                    </button>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:text-primary transition-colors">
                        {item.name}
                      </Link>
                      <p className="font-bold text-foreground">${item.price.toFixed(2)}</p>
                    </div>

                    <Button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full rounded-none bg-primary py-6 text-xs uppercase tracking-widest text-white transition-all hover:bg-primary/90"
                    >
                      Move to Cart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Container>
    </div>
  );
}
