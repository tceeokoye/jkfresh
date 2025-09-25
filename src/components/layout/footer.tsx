import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Image src="/images/jk-fresh-logo.svg" alt="JK Fresh" width={120} height={60} className="h-12 w-auto" />
            <p className="text-sm opacity-90">
              Your trusted Canadian grocery store, bringing fresh quality products to your table since 2020.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="hover:opacity-80 transition-opacity">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* About JK Fresh */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">About JK Fresh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:opacity-80 transition-opacity">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:opacity-80 transition-opacity">
                  News & Media
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:opacity-80 transition-opacity">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:opacity-80 transition-opacity">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:opacity-80 transition-opacity">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:opacity-80 transition-opacity">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:opacity-80 transition-opacity">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:opacity-80 transition-opacity">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:opacity-80 transition-opacity">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Stores */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Our Stores</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/stores" className="hover:opacity-80 transition-opacity">
                  Find a Store
                </Link>
              </li>
              <li>
                <Link href="/store-hours" className="hover:opacity-80 transition-opacity">
                  Store Hours
                </Link>
              </li>
              <li>
                <Link href="/pharmacy" className="hover:opacity-80 transition-opacity">
                  Pharmacy Services
                </Link>
              </li>
              <li>
                <Link href="/gift-cards" className="hover:opacity-80 transition-opacity">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-90">© 2024 JK Fresh Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link href="/terms" className="hover:opacity-80 transition-opacity">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:opacity-80 transition-opacity">
              Privacy Policy
            </Link>
            <Link href="/accessibility" className="hover:opacity-80 transition-opacity">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
