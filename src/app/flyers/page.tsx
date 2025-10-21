"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { flyers, categories, products } from "@/lib/product-data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Calendar } from "lucide-react"

export default function FlyersPage() {
  const [selectedFlyerId, setSelectedFlyerId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredFlyers = selectedCategory ? flyers.filter((f) => f.category === selectedCategory) : flyers

  const selectedFlyer = selectedFlyerId ? flyers.find((f) => f.id === selectedFlyerId) : null

  const flyerProducts = selectedFlyer
    ? selectedFlyer.products
        .map((fp) => ({
          ...fp,
          product: products.find((p) => p.id === fp.productId),
        }))
        .filter((fp) => fp.product)
    : []

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Weekly Flyers</h1>

        {!selectedFlyer ? (
          <>
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    !selectedCategory ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All Flyers
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedCategory === cat.slug
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Flyers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFlyers.map((flyer) => (
                <button key={flyer.id} onClick={() => setSelectedFlyerId(flyer.id)} className="text-left group">
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Cover Image */}
                    <div className="relative overflow-hidden bg-gray-100 h-48">
                      <img
                        src={flyer.coverImage || "/placeholder.svg"}
                        alt={flyer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {flyer.isActive && (
                        <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Active
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{flyer.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(flyer.startDate).toLocaleDateString()} -{" "}
                          {new Date(flyer.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{flyer.products.length} products on sale</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setSelectedFlyerId(null)}
              className="text-green-600 hover:text-green-700 font-medium mb-6"
            >
              ← Back to Flyers
            </button>

            {/* Flyer Details */}
            <div className="mb-12">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative overflow-hidden bg-gray-100 h-64">
                  <img
                    src={selectedFlyer.coverImage || "/placeholder.svg"}
                    alt={selectedFlyer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedFlyer.title}</h2>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Calendar className="w-5 h-5" />
                    <span>
                      {new Date(selectedFlyer.startDate).toLocaleDateString()} -{" "}
                      {new Date(selectedFlyer.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{flyerProducts.length} products on sale this week</p>
                </div>
              </div>
            </div>

            {/* Flyer Products */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h3>
              {flyerProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {flyerProducts.map((fp) => (
                    <div key={fp.productId}>
                      <ProductCard product={fp.product!} />
                      <div className="mt-2 text-center">
                        <p className="text-sm text-gray-600">
                          Save {fp.discount}% - ${fp.flyerPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No products in this flyer</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Fresh</h3>
              <p className="text-gray-400 text-sm">Delivering fresh, quality groceries from Canada to the world.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-white">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/flyers" className="hover:text-white">
                    Flyers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 Fresh. All rights reserved. Delivering fresh from Canada worldwide.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
