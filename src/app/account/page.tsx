"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { useSelector } from "react-redux"
import Link from "next/link"
import { User, Mail, MapPin, Phone } from "lucide-react"
import { RootState } from "@/store"

export default function AccountPage() {
  const user = useSelector((state:RootState) => state.user.user)


  if (!user) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your account.</p>
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            Return to Home
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Account Info */}
          <div className="md:col-span-2 bg-white rounded-lg border border-gray-200 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <User className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="text-lg font-medium text-gray-900">{user.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="text-lg font-medium text-gray-900">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="text-lg font-medium text-gray-900">{user.country}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600">Phone Number</p>
                  <p className="text-lg font-medium text-gray-900">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>

            <button className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Edit Profile
            </button>
          </div>

          {/* Quick Links */}
          <div className="bg-green-50 rounded-lg border border-green-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/orders" className="text-green-600 hover:text-green-700 font-medium">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-green-600 hover:text-green-700 font-medium">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
                  Continue Shopping
                </Link>
              </li>
              <li>
                <Link href="/flyers" className="text-green-600 hover:text-green-700 font-medium">
                  Weekly Flyers
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
