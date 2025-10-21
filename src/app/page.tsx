import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CategorySection } from "@/components/category-section"
import { ProductCard } from "@/components/product-card"
import { products, categories } from "@/lib/product-data"
import Link from "next/link"

export default function Home() {
  // Get 5 products per category
  const getProductsByCategory = (categorySlug: string) => {
    return products.filter((p) => p.category === categorySlug).slice(0, 5)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <HeroSection />

        {/* Category Section */}
        <div className="mt-16">
          <CategorySection />
        </div>

        {/* Featured Products by Category */}
        <div className="mt-16">
          {categories.map((category) => {
            const categoryProducts = getProductsByCategory(category.slug)
            if (categoryProducts.length === 0) return null

            return (
              <section key={category.id} className="mb-16 ">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                  {categoryProducts.length >= 5 && (
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      View More →
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        {/* Flyers Section */}
        <section className="mt-16 mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Weekly Flyers</h2>
            <Link href="/flyers" className="text-green-600 hover:text-green-700 font-medium">
              View All Flyers →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Flyer cards would go here */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fresh Vegetables Sale</h3>
              <p className="text-gray-600 mb-4">Up to 33% off this week</p>
              <Link href="/flyers" className="text-green-600 hover:text-green-700 font-medium">
                View Flyer →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Berry Bonanza</h3>
              <p className="text-gray-600 mb-4">Fresh berries on sale</p>
              <Link href="/flyers" className="text-green-600 hover:text-green-700 font-medium">
                View Flyer →
              </Link>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dairy Deals</h3>
              <p className="text-gray-600 mb-4">Premium dairy products</p>
              <Link href="/flyers" className="text-green-600 hover:text-green-700 font-medium">
                View Flyer →
              </Link>
            </div>
          </div>
        </section>
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
