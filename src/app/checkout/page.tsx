"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/use-cart";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createPaymentIntent } from "@/actions/stripe-actions";
import { useRouter } from "next/navigation";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const cart = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    try {
      // 1. Create Payment Intent
      // const { clientSecret } = await createPaymentIntent(cart.getTotalPrice() * 1.1);
      
      // 2. In a real app, we would use loadStripe and confirmPayment here
      // For this demo, we'll simulate a successful payment after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Payment successful! Order confirmed.");
      cart.clearCart();
      router.push("/order-confirmation");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <Container className="py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
            <section className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">Contact Information</h2>
              <div className="flex flex-col gap-4">
                <input
                  {...register("email")}
                  placeholder="Email Address"
                  className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <input
                    {...register("firstName")}
                    placeholder="First Name"
                    className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                  />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("lastName")}
                    placeholder="Last Name"
                    className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                  />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  {...register("address")}
                  placeholder="Address"
                  className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                />
                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <input
                    {...register("city")}
                    placeholder="City"
                    className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                  />
                  {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                </div>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("postalCode")}
                    placeholder="Postal Code"
                    className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                  />
                  {errors.postalCode && <p className="text-xs text-red-500">{errors.postalCode.message}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <input
                  {...register("country")}
                  placeholder="Country"
                  className="w-full border-b border-border bg-transparent py-2 outline-none focus:border-primary"
                />
                {errors.country && <p className="text-xs text-red-500">{errors.country.message}</p>}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest">Payment</h2>
              <div className="rounded-sm border border-border p-6 bg-accent/20">
                <p className="text-sm text-muted mb-4">
                  All transactions are secure and encrypted.
                </p>
                {/* Mock Stripe Card Element */}
                <div className="flex items-center justify-between border-b border-border py-4">
                  <span className="text-sm font-medium">Credit Card</span>
                  <div className="flex gap-2">
                    <div className="h-4 w-6 bg-muted/50 rounded-sm" />
                    <div className="h-4 w-6 bg-muted/50 rounded-sm" />
                  </div>
                </div>
                <div className="mt-4 h-12 w-full bg-white dark:bg-black/40 border border-border flex items-center px-4 text-muted text-sm italic">
                  Stripe Payment Element would load here...
                </div>
              </div>
            </section>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-none uppercase tracking-widest"
              isLoading={isProcessing}
            >
              Pay Now ${(cart.getTotalPrice() * 1.1).toFixed(2)}
            </Button>
          </form>
        </div>

        {/* Sidebar Order Summary */}
        <div className="lg:col-span-5 lg:pl-12">
          <div className="space-y-8">
            <h2 className="text-xl font-bold uppercase tracking-widest">Order Summary</h2>
            <div className="flex flex-col gap-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative h-20 w-16 bg-accent/30">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    {item.size && <p className="text-xs text-muted">Size: {item.size}</p>}
                  </div>
                  <div className="flex items-center">
                    <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-border" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span>${cart.getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Shipping</span>
                <span className="text-primary uppercase">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Tax (10%)</span>
                <span>${(cart.getTotalPrice() * 0.1).toFixed(2)}</span>
              </div>
              <div className="h-px bg-border my-4" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(cart.getTotalPrice() * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
