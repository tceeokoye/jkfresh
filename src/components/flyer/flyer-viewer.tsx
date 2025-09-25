"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Flyer } from "../../types/global"

interface FlyerViewerProps {
  flyer: Flyer
  onPageChange?: (pageNumber: number) => void
}

export function FlyerViewer({ flyer, onPageChange }: FlyerViewerProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    onPageChange?.(pageNumber)
  }

  const nextPage = () => {
    if (currentPage < flyer.pages.length - 1) {
      handlePageChange(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      handlePageChange(currentPage - 1)
    }
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const shareFlyer = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: flyer.title,
          text: flyer.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className={`${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-2xl font-bold">{flyer.title}</h2>
            <p className="text-muted-foreground">{flyer.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">
                Valid: {new Date(flyer.startDate).toLocaleDateString()} - {new Date(flyer.endDate).toLocaleDateString()}
              </Badge>
              <Badge variant={flyer.isActive ? "default" : "secondary"}>{flyer.isActive ? "Active" : "Expired"}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={zoomOut} disabled={zoom <= 0.5}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="outline" size="sm" onClick={zoomIn} disabled={zoom >= 3}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={shareFlyer}>
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main viewer */}
        <div className="flex-1 flex">
          {/* Page thumbnails */}
          <div className="w-48 border-r bg-muted/30 p-4 overflow-y-auto">
            <h3 className="font-semibold mb-4">Pages ({flyer.pages.length})</h3>
            <div className="space-y-2">
              {flyer.pages.map((page, index) => (
                <button
                  key={page.id}
                  onClick={() => handlePageChange(index)}
                  className={`w-full p-2 rounded-lg border-2 transition-colors ${
                    currentPage === index ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="aspect-[3/4] relative mb-2">
                    <Image
                      src={page.image || "/placeholder.svg"}
                      alt={`Page ${page.pageNumber}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <p className="text-xs font-medium">Page {page.pageNumber}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Main page display */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto bg-gray-100 p-8">
              <div className="flex justify-center">
                <div
                  className="relative bg-white shadow-lg"
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: "top center",
                  }}
                >
                  <Image
                    src={flyer.pages[currentPage]?.image || "/placeholder.svg"}
                    alt={`Page ${flyer.pages[currentPage]?.pageNumber}`}
                    width={800}
                    height={1067}
                    className="max-w-none"
                  />
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-between p-4 border-t bg-background">
              <Button variant="outline" onClick={prevPage} disabled={currentPage === 0}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Page {currentPage + 1} of {flyer.pages.length}
                </span>
              </div>

              <Button variant="outline" onClick={nextPage} disabled={currentPage === flyer.pages.length - 1}>
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
