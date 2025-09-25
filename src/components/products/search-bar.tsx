"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, TrendingUp } from "lucide-react"

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

const popularSearches = [
  "Fresh Apples",
  "Organic Vegetables",
  "Ground Beef",
  "Whole Milk",
  "Bread",
  "Chicken Breast",
  "Bananas",
  "Eggs",
]

const mockProducts = [
  { id: "1", name: "Fresh Strawberries", category: "Produce" },
  { id: "2", name: "Premium Ground Beef", category: "Meat" },
  { id: "3", name: "Artisan Sourdough Bread", category: "Bakery" },
  { id: "4", name: "Organic Bananas", category: "Produce" },
  { id: "5", name: "Fresh Apples", category: "Produce" },
  { id: "6", name: "Whole Milk", category: "Dairy" },
  { id: "7", name: "Chicken Breast", category: "Meat" },
  { id: "8", name: "Organic Vegetables", category: "Produce" },
  { id: "9", name: "Free Range Eggs", category: "Dairy" },
  { id: "10", name: "Whole Wheat Bread", category: "Bakery" },
]

export function SearchBar({ onSearch, placeholder = "Search for products...", className }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof mockProducts>([])

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      onSearch?.(query)
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query, onSearch])

  useEffect(() => {
    if (query.length > 0) {
      const filtered = mockProducts
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6) // Limit to 6 suggestions
      setFilteredSuggestions(filtered)
    } else {
      setFilteredSuggestions([])
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(query)
    setShowSuggestions(false)
  }

  const handleClear = () => {
    setQuery("")
    onSearch?.("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch?.(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          className="pl-10 pr-20"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {query && (
            <Button type="button" variant="ghost" size="sm" onClick={handleClear} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button type="submit" size="sm" className="h-7">
            Search
          </Button>
        </div>
      </form>

      {/* Search Suggestions */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50 p-4">
          {query.length > 0 && filteredSuggestions.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Suggestions</span>
              </div>
              <div className="space-y-2">
                {filteredSuggestions.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                    onClick={() => handleSuggestionClick(product.name)}
                  >
                    <span className="text-sm">{product.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            !query && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((search) => (
                    <Badge
                      key={search}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
