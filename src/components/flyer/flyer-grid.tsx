"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Eye, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Flyer } from "../../types/global"

interface FlyerGridProps {
  flyers: Flyer[]
  showAll?: boolean
}

export function FlyerGrid({ flyers, showAll = false }: FlyerGridProps) {
  const [displayFlyers, setDisplayFlyers] = useState<Flyer[]>([])

  useEffect(() => {
    if (showAll) {
      setDisplayFlyers(flyers)
    } else {
      setDisplayFlyers(flyers.slice(0, 6))
    }
  }, [flyers, showAll])

  const shareFlyer = async (flyer: Flyer) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: flyer.title,
          text: flyer.description,
          url: `/flyer/${flyer.id}`,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/flyer/${flyer.id}`)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayFlyers.map((flyer) => (
        <Card key={flyer.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={flyer.coverImage || "/placeholder.svg"}
              alt={flyer.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant={flyer.isActive ? "default" : "secondary"}>{flyer.isActive ? "Current" : "Expired"}</Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-semibold text-lg mb-1 text-balance">{flyer.title}</h3>
              <p className="text-sm opacity-90 text-pretty">{flyer.description}</p>
            </div>
          </div>

          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(flyer.startDate).toLocaleDateString()} - {new Date(flyer.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button asChild className="flex-1">
                <Link href={`/flyer/${flyer.id}`} className="flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Flyer
                </Link>
              </Button>
              <Button variant="outline" size="icon" onClick={() => shareFlyer(flyer)}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
