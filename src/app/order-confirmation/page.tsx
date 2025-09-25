"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Package, Truck, Home } from "lucide-react"
import Link from "next/link"

export default function OrderConfirmationPage() {
  const orderNumber = "JK" + Date.now().toString().slice(-6)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll send you a confirmation email shortly.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-mono font-bold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery:</span>
                <span>2-3 business days</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Method:</span>
                <span>Standard Shipping</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Order Processing</h3>
                <p className="text-sm text-muted-foreground">We're preparing your items</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-semibold mb-1">In Transit</h3>
                <p className="text-sm text-muted-foreground">Your order is on the way</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Home className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <h3 className="font-semibold mb-1">Delivered</h3>
                <p className="text-sm text-muted-foreground">Fresh groceries at your door</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Button asChild className="w-full md:w-auto">
              <Link href="/dashboard">View Order Status</Link>
            </Button>
            <div>
              <Button variant="outline" asChild className="w-full md:w-auto bg-transparent">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Questions about your order? Contact us at{" "}
              <a href="mailto:support@jkfresh.ca" className="text-primary hover:underline">
                support@jkfresh.ca
              </a>{" "}
              or call{" "}
              <a href="tel:+1-800-JK-FRESH" className="text-primary hover:underline">
                1-800-JK-FRESH
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
