"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SearchBar } from "@/components/products/search-bar"
import {
  ProductFilters,
  type ProductFilters as ProductFiltersType,
} from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, Grid3X3, List } from "lucide-react"
import type { Product } from "../../src/types/global"

// Mock product data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Fresh Organic Strawberries",
    description: "Sweet, juicy strawberries perfect for snacking or desserts",
    salePrice: 4.99,
    originalPrice: 6.99,
    image: "/fresh-strawberries-container.jpg",
    category: "Fresh Produce",
    unit: "lb",
    stock: 25,
    rating: 4.5,
    reviewCount: 128,
    isOrganic: true,
  },
  {
    id: "2",
    name: "Premium Ground Beef",
    description: "AAA grade ground beef, perfect for burgers and cooking",
    salePrice: 9.99,
    originalPrice: 12.99,
    image: "/premium-ground-beef-package.jpg",
    category: "Meat & Seafood",
    unit: "lb",
    stock: 15,
    rating: 4.8,
    reviewCount: 89,
    isOrganic: false,
  },
  {
    id: "3",
    name: "Whole Milk 2L",
    description: "Fresh whole milk from local dairy farms",
    salePrice: 3.49,
    image: "/whole-milk-2l-carton.jpg",
    category: "Dairy & Eggs",
    unit: "2L",
    stock: 42,
    rating: 4.2,
    reviewCount: 67,
    isOrganic: false,
  },
  {
    id: "4",
    name: "Artisan Sourdough Bread",
    description: "Freshly baked sourdough with a perfect crust",
    salePrice: 5.99,
    originalPrice: 7.49,
    image: "/artisan-sourdough-bread-loaf.jpg",
    category: "Bakery",
    unit: "loaf",
    stock: 8,
    rating: 4.7,
    reviewCount: 156,
    isOrganic: true,
  },
  {
    id: "5",
    name: "Free Range Eggs (12 pack)",
    description: "Farm fresh eggs from free-range chickens",
    salePrice: 4.29,
    image: "/free-range-eggs-dozen.jpg",
    category: "Dairy & Eggs",
    unit: "dozen",
    stock: 33,
    rating: 4.6,
    reviewCount: 94,
    isOrganic: true,
  },
  {
    id: "6",
    name: "Fresh Atlantic Salmon",
    description: "Wild-caught Atlantic salmon fillets",
    salePrice: 18.99,
    originalPrice: 22.99,
    image: "/fresh-atlantic-salmon-fillet.jpg",
    category: "Meat & Seafood",
    unit: "lb",
    stock: 12,
    rating: 4.9,
    reviewCount: 45,
    isOrganic: false,
  },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, {
      categories: [],
      priceRange: [0, 100],
      inStock: false,
      onSale: false,
      organic: false,
      rating: 0,
    })
  }

  const handleFiltersChange = (filters: ProductFiltersType) => {
    applyFilters(searchQuery, filters)
  }

  const applyFilters = (query: string, filters: ProductFiltersType) => {
    let filtered = [...products]

    // Search filter
    if (query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) => filters.categories.includes(product.category))
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.salePrice >= filters.priceRange[0] && product.salePrice <= filters.priceRange[1],
    )

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter((product) => (product.stock || 0) > 0)
    }

    // Sale filter
    if (filters.onSale) {
      filtered = filtered.filter((product) => product.originalPrice && product.originalPrice > product.salePrice)
    }

    // Organic filter
    if (filters.organic) {
      filtered = filtered.filter((product) => product.isOrganic)
    }

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter((product) => (product.rating || 0) >= filters.rating)
    }

    setFilteredProducts(filtered)
  }

  const handleSort = (value: string) => {
    setSortBy(value)
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (value) {
        case "price-low":
          return a.salePrice - b.salePrice
        case "price-high":
          return b.salePrice - a.salePrice
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })
    setFilteredProducts(sorted)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Products</h1>
          <SearchBar onSearch={handleSearch} className="max-w-2xl" />
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <ProductFilters onFiltersChange={handleFiltersChange} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{filteredProducts.length} products</span>
                  {searchQuery && <Badge variant="secondary">Search: "{searchQuery}"</Badge>}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={handleSort}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
