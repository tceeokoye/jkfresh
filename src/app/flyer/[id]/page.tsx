"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FlyerViewer } from "@/components/flyer/flyer-viewer"
import { DealsGrid } from "@/components/flyer/deals-grid"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, Download } from "lucide-react"
import Link from "next/link"
import type { Flyer } from "../../../src/types/global"

// Mock flyer data - replace with actual API call
const mockFlyer: Flyer = {
  id: "1",
  title: "Weekly Savings - January 15-21",
  description: "Great deals on fresh produce, meat, and pantry essentials",
  startDate: "2024-01-15",
  endDate: "2024-01-21",
  coverImage: "/grocery-store-weekly-flyer-with-deals.jpg",
  pages: [
    {
      id: "1",
      pageNumber: 1,
      image: "/flyer-page-1-produce-deals.jpg",
      deals: [],
    },
    {
      id: "2",
      pageNumber: 2,
      image: "/flyer-page-2-meat-specials.jpg",
      deals: [],
    },
    {
      id: "3",
      pageNumber: 3,
      image: "/flyer-page-3-bakery-deals.jpg",
      deals: [],
    },
    {
      id: "4",
      pageNumber: 4,
      image: "/flyer-page-4-pantry-essentials.jpg",
      deals: [],
    },
  ],
  isActive: true,
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
}

const mockRelatedDeals = [
  {
    id: "1",
    productId: "prod-1",
    title: "Fresh Strawberries",
    description: "Sweet, juicy strawberries perfect for snacking",
    originalPrice: 5.99,
    salePrice: 3.99,
    discount: "33% OFF",
    validUntil: "2024-01-21",
    image: "/fresh-strawberries-container.jpg",
    category: "Produce",
  },
  {
    id: "2",
    productId: "prod-2",
    title: "Premium Ground Beef",
    description: "AAA grade ground beef, perfect for burgers",
    originalPrice: 12.99,
    salePrice: 9.99,
    discount: "23% OFF",
    validUntil: "2024-01-21",
    image: "/premium-ground-beef-package.jpg",
    category: "Meat",
  },
]

export default function FlyerDetailPage() {
  const params = useParams()
  const flyerId = params.id as string
  const [flyer, setFlyer] = useState<Flyer | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    // In real app, fetch flyer by ID
    setFlyer(mockFlyer)
  }, [flyerId])

  const shareFlyer = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: flyer?.title,
          text: flyer?.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (!flyer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Flyer not found</h1>
            <Button asChild>
              <Link href="/flyer">Back to Flyers</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/flyer" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Flyers
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={shareFlyer}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Flyer Viewer */}
        <div className="min-h-[800px]">
          <FlyerViewer flyer={flyer} onPageChange={setCurrentPage} />
        </div>

        {/* Related Deals */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <DealsGrid deals={mockRelatedDeals} title="Featured in This Flyer" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
