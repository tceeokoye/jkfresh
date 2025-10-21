"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/types"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/store"
import { addToCart } from "@/store/cartSlice"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        price: product.price,
        name: product.name,
        image: product.image,
      })
    )
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link href={`/product/${product.id}`} className="h-full">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 h-48">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{discount}%
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Unit */}
          {product.unit && <p className="text-xs text-gray-500 mb-3">{product.unit}</p>}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
              isAdded
                ? "bg-green-600 text-white"
                : product.inStock
                  ? "bg-green-50 text-green-600 hover:bg-green-100"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </Link>
  )
}
