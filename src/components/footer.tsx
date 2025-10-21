import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">About Fresh</h3>
            <p className="text-gray-400 text-xs md:text-sm">
              Delivering fresh, quality groceries from Canada to the world.
            </p>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/flyers" className="hover:text-white transition">
                  Flyers
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-white transition">
                  Deals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Customer Service</h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">Legal</h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-gray-400 text-xs md:text-sm">
          <p>&copy; 2025 Fresh. All rights reserved. Delivering fresh from Canada worldwide.</p>
        </div>
      </div>
    </footer>
  )
}
