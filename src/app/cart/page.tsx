"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const cart = useCart();

  if (cart.items.length === 0) {
    return (
      <Container className="flex flex-col items-center justify-center py-40 text-center">
        <h1 className="font-serif text-4xl font-bold">Your cart is empty</h1>
        <p className="mt-4 text-muted">Looks like you haven't added anything yet.</p>
        <Link href="/">
          <Button className="mt-8 rounded-none uppercase tracking-widest">
            Continue Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <h1 className="mb-12 font-serif text-4xl font-bold">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="flex flex-col gap-8">
            <AnimatePresence>
              {cart.items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-center"
                >
                  <div className="relative h-40 w-32 shrink-0 bg-accent/30">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        {item.size && (
                          <p className="text-sm text-muted">Size: {item.size}</p>
                        )}
                      </div>
                      <p className="font-bold">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="flex h-10 w-10 items-center justify-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-10 w-10 items-center justify-center hover:bg-accent"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => cart.removeItem(item.id)}
                        className="text-muted hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 space-y-6 bg-accent/30 p-8 dark:bg-secondary/30">
            <h2 className="text-xl font-bold uppercase tracking-widest">Order Summary</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">${cart.getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="font-medium text-primary uppercase">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tax</span>
                <span className="font-medium">${(cart.getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="h-px bg-border my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(cart.getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
            </div>

            <Button size="lg" className="w-full rounded-none uppercase tracking-widest">
              Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="flex flex-col items-center gap-4 text-xs text-muted">
              <p>Secure checkout powered by Stripe</p>
              <div className="flex gap-2">
                {/* Simplified icons */}
                <div className="h-6 w-10 rounded-sm bg-border/50" />
                <div className="h-6 w-10 rounded-sm bg-border/50" />
                <div className="h-6 w-10 rounded-sm bg-border/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
