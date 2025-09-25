"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useDispatch } from "react-redux"
import { addToCart } from "../../store/slices/cartSlice"
import { formatPrice, calculateDiscount } from "../../utils/helpers"
import type { Deal, Product } from "../../types/global"

interface DealsGridProps {
  deals: Deal[]
  title?: string
  showAll?: boolean
}

export function DealsGrid({ deals, title = "Featured Deals", showAll = false }: DealsGridProps) {
  const dispatch = useDispatch()
  const displayDeals = showAll ? deals : deals.slice(0, 8)

const handleAddToCart = (deal: Deal) => {
  // Map Deal → Product
  const product: Product = {
    id: deal.productId,
    name: deal.title,
    description: deal.description,
    
    originalPrice: deal.originalPrice,
    salePrice: deal.salePrice,
    image: deal.image,
    stock: 100,
    rating: 4.5,
    reviewCount: 20,
    isOrganic: false,
    nutritionFacts: {
      calories: 100,
      protein: "2g",
      carbs: "20g",
      fat: "1g",
      fiber: "2g",
      sugar: "10g",
    },
    ingredients: ["Fresh strawberries"],
    allergens: [],
    origin: "Local Farm",
    storageInstructions: "Store in a cool, dry place",
    category: deal.category,
    subcategory: "",
   
    images: [deal.image],
    inStock: true,
    stockQuantity: 100,
    unit: "each",
    tags: ["sale", "featured"],
  
  
  };

  dispatch(addToCart({ product, quantity: 1 }));
};



  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {!showAll && deals.length > 8 && (
          <Button variant="outline" asChild>
            <Link href="/deals">View All Deals</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayDeals.map((deal) => (
          <Card key={deal.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={deal.image || "/placeholder.svg"}
                alt={deal.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-secondary text-secondary-foreground">
                  {calculateDiscount(deal.originalPrice, deal.salePrice)} OFF
                </Badge>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background/90">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(deal.validUntil).toLocaleDateString()}
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="outline" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {deal.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-balance">{deal.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 text-pretty">{deal.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{formatPrice(deal.salePrice)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(deal.originalPrice)}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => handleAddToCart(deal)} className="flex-1 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/products/${deal.productId}`}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
