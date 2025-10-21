"use client"

import { Header } from "@/components/header"
import { products } from "@/lib/product-data"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Zap } from "lucide-react"

export default function DealsPage() {
  // Get products with discounts
  const dealsProducts = products
    .filter((p) => p.discount && p.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))

  const topDeals = dealsProducts.slice(0, 8)
  const allDeals = dealsProducts

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6 md:p-12 mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900">Hot Deals This Week</h1>
          </div>
          <p className="text-gray-600 text-sm md:text-base">
            Save big on your favorite fresh products. Limited time offers!
          </p>
        </div>

        {/* Top Deals */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Top Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Deals */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">All Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {allDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 md:mt-16 bg-green-50 rounded-lg p-6 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Don't Miss Out!</h2>
          <p className="text-gray-600 mb-6 text-sm md:text-base">Check back daily for new deals and exclusive offers</p>
          <Link
            href="/products"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 md:px-8 py-3 rounded-lg font-medium transition"
          >
            Shop All Products
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
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
