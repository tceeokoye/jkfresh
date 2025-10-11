"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { RootState } from "@/store";
import type { CartItem as CartItemType } from "@/types/global";

export default function CartPage() {
  const { items, itemCount } = useSelector((state: RootState) => state.cart);
  const router = useRouter();

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>

        {itemCount === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some fresh groceries to get started!
            </p>
            <Button asChild>
              <Link href="/">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: CartItemType) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <div>
              <CartSummary onCheckout={handleCheckout} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
