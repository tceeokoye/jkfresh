"use client"

import { Header } from "@/components/header"
import { products } from "@/lib/mock-data"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/store"
import { removeFromCart, updateCartQuantity, clearCart } from "@/store/cartSlice"

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state: RootState) => state.cart.items)

  const cartProducts = cart.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.productId),
  }))

  const total = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = total * 0.13
  const shipping = total > 50 ? 0 : 9.99
  const grandTotal = total + tax + shipping

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-6">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {cartProducts.map((item) => (
                  <div
                    key={item.productId}
                    className="flex flex-col sm:flex-row gap-4 p-4 md:p-6 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product?.image || "/placeholder.svg"}
                        alt={item.product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.productId}`}
                        className="font-semibold text-gray-900 hover:text-green-600 text-sm md:text-base"
                      >
                        {item.product?.name}
                      </Link>
                      <p className="text-xs md:text-sm text-gray-600 mt-1">{item.product?.unit}</p>
                      <p className="text-base md:text-lg font-bold text-green-600 mt-2">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                      <button
                        onClick={() =>
                          dispatch(updateCartQuantity({ productId: item.productId, quantity: item.quantity - 1 }))
                        }
                        className="px-2 md:px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 md:px-4 py-2 font-medium text-sm md:text-base">{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(updateCartQuantity({ productId: item.productId, quantity: item.quantity + 1 }))
                        }
                        className="px-2 md:px-3 py-2 text-gray-600 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 text-sm md:text-base">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="text-red-600 hover:text-red-700 mt-2 flex items-center gap-1 text-xs md:text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600 text-sm md:text-base">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm md:text-base">
                    <span>Tax (HST)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 text-sm md:text-base">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {shipping > 0 && <p className="text-xs text-gray-600 mb-6">Free shipping on orders over $50</p>}

                <Link
                  href="/checkout"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold transition mb-3"
                >
                  Proceed to Checkout
                </Link>

                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition text-sm md:text-base"
                >
                  Clear Cart
                </button>

                <Link
                  href="/products"
                  className="block text-center text-green-600 hover:text-green-700 font-medium mt-4 text-sm md:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 md:mt-20">
        {/* Footer content remains the same */}
      </footer>
    </main>
  )
}
