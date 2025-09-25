"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "lucide-react"
import { updateQuantity, removeFromCart } from "../../store/slices/cartSlice"
import { formatPrice } from "../../utils/helpers"
import type { CartItem as CartItemType } from "../../types/global"
import type { AppDispatch } from "../../store"
import Image from "next/image"

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [quantity, setQuantity] = useState(item.quantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
    dispatch(updateQuantity({ productId: item.product.id, quantity: newQuantity }))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id))
  }

  const totalPrice = item.product.salePrice * item.quantity
  const savings = item.product.originalPrice ? (item.product.originalPrice - item.product.salePrice) * item.quantity : 0

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-card">
      <div className="relative w-20 h-20 flex-shrink-0">
        <Image
          src={item.product.image || "/placeholder.svg"}
          alt={item.product.name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm md:text-base truncate">{item.product.name}</h3>
        <p className="text-sm text-muted-foreground truncate">{item.product.description}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="font-bold text-primary">{formatPrice(item.product.salePrice)}</span>
          {item.product.originalPrice && item.product.originalPrice > item.product.salePrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(item.product.originalPrice)}
              </span>
              <Badge variant="secondary" className="text-xs">
                Save {formatPrice(item.product.originalPrice - item.product.salePrice)}
              </Badge>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            className="h-8 w-8 p-0"
          >
            <Minus className="h-3 w-3" />
          </Button>

          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
            className="w-16 h-8 text-center"
            min="1"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-8 w-8 p-0"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        <div className="text-right">
          <div className="font-bold">{formatPrice(totalPrice)}</div>
          {savings > 0 && <div className="text-xs text-green-600">You save {formatPrice(savings)}</div>}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-destructive hover:text-destructive h-8 w-8 p-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
