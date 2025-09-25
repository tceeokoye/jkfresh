"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, X, Filter } from "lucide-react"
import { formatPrice } from "../../utils/helpers"

interface ProductFiltersProps {
  onFiltersChange?: (filters: ProductFilters) => void
  className?: string
}

export interface ProductFilters {
  categories: string[]
  priceRange: [number, number]
  inStock: boolean
  onSale: boolean
  organic: boolean
  rating: number
}

const categories = [
  "Fresh Produce",
  "Meat & Seafood",
  "Dairy & Eggs",
  "Bakery",
  "Pantry Essentials",
  "Frozen Foods",
  "Beverages",
  "Snacks",
  "Health & Beauty",
  "Household",
]

export function ProductFilters({ onFiltersChange, className }: ProductFiltersProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    priceRange: [0, 100],
    inStock: false,
    onSale: false,
    organic: false,
    rating: 0,
  })

  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    availability: true,
    features: true,
  })

  const updateFilters = (newFilters: Partial<ProductFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange?.(updated)
  }

  const toggleCategory = (category: string) => {
    const categories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories })
  }

  const clearFilters = () => {
    const cleared: ProductFilters = {
      categories: [],
      priceRange: [0, 100],
      inStock: false,
      onSale: false,
      organic: false,
      rating: 0,
    }
    setFilters(cleared)
    onFiltersChange?.(cleared)
  }

  const activeFiltersCount =
    filters.categories.length +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.organic ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0)

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && <Badge variant="secondary">{activeFiltersCount}</Badge>}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <Collapsible open={openSections.categories} onOpenChange={() => toggleSection("categories")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Categories</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.categories ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Price Range</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.price ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-3">
            <div className="px-2">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>{formatPrice(filters.priceRange[0])}</span>
              <span>{formatPrice(filters.priceRange[1])}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Availability */}
        <Collapsible open={openSections.availability} onOpenChange={() => toggleSection("availability")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Availability</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${openSections.availability ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.inStock}
                onCheckedChange={(checked) => updateFilters({ inStock: checked as boolean })}
              />
              <Label htmlFor="inStock" className="text-sm cursor-pointer">
                In Stock Only
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="onSale"
                checked={filters.onSale}
                onCheckedChange={(checked) => updateFilters({ onSale: checked as boolean })}
              />
              <Label htmlFor="onSale" className="text-sm cursor-pointer">
                On Sale
              </Label>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Features */}
        <Collapsible open={openSections.features} onOpenChange={() => toggleSection("features")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Features</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${openSections.features ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="organic"
                checked={filters.organic}
                onCheckedChange={(checked) => updateFilters({ organic: checked as boolean })}
              />
              <Label htmlFor="organic" className="text-sm cursor-pointer">
                Organic
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Minimum Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant={filters.rating >= rating ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => updateFilters({ rating: filters.rating === rating ? 0 : rating })}
                  >
                    {rating}
                  </Button>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
