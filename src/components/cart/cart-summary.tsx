"use client"

import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Tag, Truck } from "lucide-react"
import { formatPrice } from "../../utils/helpers"
import type { RootState } from "../../store"

interface CartSummaryProps {
  onCheckout?: () => void
}

export function CartSummary({ onCheckout }: CartSummaryProps) {
  const { items, total, itemCount } = useSelector((state: RootState) => state.cart)

  const subtotal = items.reduce((sum, item) => sum + item.product.salePrice * item.quantity, 0)
  const originalTotal = items.reduce(
    (sum, item) => sum + (item.product.originalPrice || item.product.salePrice) * item.quantity,
    0,
  )
  const totalSavings = originalTotal - subtotal
  const tax = subtotal * 0.13 // 13% HST for Canada
  const shipping = subtotal >= 75 ? 0 : 9.99
  const finalTotal = subtotal + tax + shipping

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Items ({itemCount})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              Savings
            </span>
            <span>-{formatPrice(totalSavings)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Tax (HST)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <Truck className="h-4 w-4" />
            Shipping
          </span>
          <div className="text-right">
            {shipping === 0 ? <Badge variant="secondary">FREE</Badge> : <span>{formatPrice(shipping)}</span>}
          </div>
        </div>

        {shipping > 0 && <p className="text-xs text-muted-foreground">Free shipping on orders over $75</p>}

        <Separator />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>{formatPrice(finalTotal)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="text-center p-2 bg-green-50 dark:bg-green-950 rounded-lg">
            <p className="text-sm text-green-700 dark:text-green-300">
              You're saving {formatPrice(totalSavings)} on this order!
            </p>
          </div>
        )}

        <Button className="w-full" size="lg" onClick={onCheckout} disabled={itemCount === 0}>
          Proceed to Checkout
        </Button>

        <p className="text-xs text-center text-muted-foreground">Secure checkout with SSL encryption</p>
      </CardContent>
    </Card>
  )
}
