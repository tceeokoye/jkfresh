"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { addToCart } from "../../store/slices/cartSlice"
import { formatPrice } from "../../utils/helpers"
import type { Product } from "../../types/global"
import type { AppDispatch } from "../../store"
import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [isLiked, setIsLiked] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAdding(true)
    dispatch(addToCart({ product, quantity: 1 }))

    // Brief loading state for better UX
    setTimeout(() => setIsAdding(false), 500)
  }

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {discount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {discount}% OFF
                </Badge>
              )}
              {product.isOrganic && (
                <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                  Organic
                </Badge>
              )}
            </div>

            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
              onClick={handleToggleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
            </Button>

            {/* Quick Add Button */}
            <Button
              className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              size="sm"
              onClick={handleAddToCart}
              disabled={isAdding}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              {isAdding ? "Adding..." : "Add"}
            </Button>
          </div>

          <div className="p-4">
            <div className="mb-2">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-1">{product.description}</p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">({product.reviewCount || 0})</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">{formatPrice(product.salePrice)}</span>
                {product.originalPrice && product.originalPrice > product.salePrice && (
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {product.unit && <span className="text-xs text-muted-foreground">per {product.unit}</span>}
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className="mt-2">
                {product.stock === 0 ? (
                  <Badge variant="destructive" className="text-xs">
                    Out of Stock
                  </Badge>
                ) : product.stock < 10 ? (
                  <Badge variant="outline" className="text-xs text-orange-600">
                    Only {product.stock} left
                  </Badge>
                ) : null}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
