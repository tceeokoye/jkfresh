"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, X, Filter } from "lucide-react"
import { formatPrice } from "../../utils/helpers"
import { productCategories } from "@/data/productCategories"

export interface ProductFilters {
  categories: string[]
  priceRange: [number, number]
  inStock: boolean
  onSale: boolean
  organic: boolean
  rating: number
}

interface ProductFiltersProps {
  onFiltersChange?: (filters: ProductFilters) => void
  className?: string
}

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

  // NEW: control open/close for nested subcategories
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({})

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

  const toggleCategoryOpen = (name: string) => {
    setOpenCategories((prev) => ({ ...prev, [name]: !prev[name] }))
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

  // Recursive render for nested categories with Framer Motion animation
  const renderCategoryTree = (categories: typeof productCategories, level = 0) => {
    return (
      <div className={`ml-${level * 2}`}>
        {categories.map((cat) => {
          const isOpen = openCategories[cat.name] || false
          const hasSubcategories = !!cat.subcategories?.length

          return (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={cat.name}
                    checked={filters.categories.includes(cat.name)}
                    onCheckedChange={() => toggleCategory(cat.name)}
                  />
                  <Label htmlFor={cat.name} className="text-sm cursor-pointer">
                    {cat.name}
                  </Label>
                </div>

                {hasSubcategories && (
                  <button
                    type="button"
                    onClick={() => toggleCategoryOpen(cat.name)}
                    className="ml-2 p-1 hover:bg-muted rounded"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {/* Animated subcategories */}
              <AnimatePresence initial={false}>
                {hasSubcategories && isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="ml-4 border-l border-muted pl-3 overflow-hidden"
                  >
                    {renderCategoryTree(cat.subcategories!, level + 1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className=" e rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="bg-white text-red-700">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-red-600"
              onClick={clearFilters}
            >
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
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections.categories ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-3">
            {renderCategoryTree(productCategories)}
          </CollapsibleContent>
        </Collapsible>

        {/* Price Range */}
        <Collapsible open={openSections.price} onOpenChange={() => toggleSection("price")}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Price Range</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections.price ? "rotate-180" : ""
                }`}
              />
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
        <Collapsible
          open={openSections.availability}
          onOpenChange={() => toggleSection("availability")}
        >
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="font-medium">Availability</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections.availability ? "rotate-180" : ""
                }`}
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
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections.features ? "rotate-180" : ""
                }`}
              />
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
                    onClick={() =>
                      updateFilters({ rating: filters.rating === rating ? 0 : rating })
                    }
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
