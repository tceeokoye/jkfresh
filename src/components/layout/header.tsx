"use client"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { Search, ShoppingCart, User, Menu, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion" // ⬅️ import framer-motion
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import type { RootState } from "../../store"
import { toggleCart } from "@/store/slices/cartSlice"
import { SearchBar } from "@/components/products/search-bar"
import LOGO from "@/assets/logo/jk-fresh-logo2.svg"


export function Header() {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const { items } = useSelector((state: RootState) => state.cart)
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

  const navigation = [
    { name: "Flyer", href: "/flyer" },
    { name: "Products", href: "/products" },

    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(query)}`
    }
  }

  // Framer Motion shake animation
  const shakeAnimation = {
    hover: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    },
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top bar */}
     <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Choose Store</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span>Enhanced Two-Factor Authentication is live! Enable it now by clicking here.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/flyer" className="hover:underline">
              Flyer
            </Link>
            <Link href="/help" className="hover:underline">
              Help
            </Link>
            <Link href="/gift-cards" className="hover:underline">
              Gift Cards
            </Link>
            {isAuthenticated ? (
              <Link href="/dashboard" className="hover:underline">
                My Account
              </Link>
            ) : (
              <Link href="/auth" className="hover:underline">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <Image src={LOGO} alt="LOGO" width={60} height={40}/>
             {/* <LOGO width={160} height={80} scale={0.5} />  
            <Image src="/public/jk-fresh-grocery-store-logo.png" alt="JK Fresh" width={160} height={80} className="h-12 w-auto" /> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div
                  key={item.name}
                  variants={shakeAnimation}
                  whileHover="hover"
                  className={`px-3 py-2 rounded-md font-medium transition-all ${
                    isActive ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Link href={item.href}>{item.name}</Link>
                </motion.div>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} placeholder="Search products..." className="w-full" />
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Mobile search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">My Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => dispatch(toggleCart())}>
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <SearchBar onSearch={handleSearch} placeholder="Search products..." className="w-full" />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
