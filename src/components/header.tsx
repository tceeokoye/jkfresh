"use client"

import { useState } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { setUser } from "@/store/userSlice"
import { ShoppingCart, Search, Globe, User, LogOut, LogIn, Menu, X } from "lucide-react"
import Image from "next/image"
import Logo from "@/assets/Logo/logo.svg"

export function Header() {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.user.user)
  const cart = useSelector((state: RootState) => state.cart.items)
  const [country, setCountryState] = useState("Canada") // Local country state
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showCountryMenu, setShowCountryMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const countries = ["Canada", "USA", "Mexico", "UK", "Australia"]
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    dispatch(setUser(null))
    setShowUserMenu(false)
  }

  const handleLogin = () => {
    dispatch(
      setUser({
        id: "1",
        email: "user@example.com",
        name: "John Doe",
        isAdmin: false,
        country: country,
      })
    )
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar */}
      <div className="bg-green-50 border-b border-gray-200 px-4 py-2">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <span className="text-gray-600 hidden sm:inline">Welcome to Fresh - Delivering Fresh Across Canada</span>
          <Link href="/admin" className="text-green-600 hover:text-green-700 font-medium">
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Logo and Search Row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Mobile Menu Button */}
            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden flex-shrink-0">
              {showMobileMenu ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-xl md:text-2xl font-bold text-green-600 flex items-center gap-1"> <Image src={Logo} alt="logo" height={40} width={40}/> Fresh</div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Country Selector */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowCountryMenu(!showCountryMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <Globe className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{country}</span>
                </button>
                {showCountryMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {countries.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCountryState(c)
                          setShowCountryMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-gray-100 text-sm ${
                          country === c ? "bg-green-50 text-green-600 font-medium" : ""
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <User className="w-5 h-5 text-gray-600" />
                  {user && <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name}</span>}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b border-gray-200">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                        <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Account
                        </Link>
                        <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Orders
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={handleLogin}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LogIn className="w-4 h-4" />
                          Login
                        </button>
                        <Link href="/signup" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Sign Up
                        </Link>
                        <div className="px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
                          Or continue as guest
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="sm:hidden mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav
            className={`${showMobileMenu ? "block" : "hidden"} md:block border-t border-gray-200 pt-4 md:pt-0 md:border-t-0`}
          >
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium transition text-sm md:text-base">
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-green-600 font-medium transition text-sm md:text-base"
              >
                Shop All
              </Link>
              <Link
                href="/flyers"
                className="text-gray-700 hover:text-green-600 font-medium transition text-sm md:text-base"
              >
                Weekly Flyers
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-green-600 font-medium transition text-sm md:text-base"
              >
                Deals
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
