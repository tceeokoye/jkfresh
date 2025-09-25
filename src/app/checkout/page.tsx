"use client"

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"
import type { RootState } from "../../src/store"

export default function CheckoutPage() {
  const { itemCount } = useSelector((state: RootState) => state.cart)
  const router = useRouter()

  useEffect(() => {
    if (itemCount === 0) {
      router.push("/cart")
    }
  }, [itemCount, router])

  const handleSuccess = () => {
    router.push("/order-confirmation")
  }

  if (itemCount === 0) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link href="/cart" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <div className="flex items-center gap-1 text-sm text-muted-foreground ml-auto">
            <Shield className="w-4 h-4" />
            Secure Checkout
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <CheckoutForm onSuccess={handleSuccess} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
