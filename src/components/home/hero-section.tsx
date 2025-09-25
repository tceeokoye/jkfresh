"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
const heroSlides = [
  {
    id: 1,
    title: "Shopping Canadian",
    subtitle: "Fresh Quality, Every Day",
    description: "Discover the finest selection of fresh produce, meats, and groceries delivered right to your door.",
    image: "/fresh-vegetables-and-fruits-display.jpg",
    cta: "Shop Now",
    ctaLink: "/products",
    badge: "That's Fresh",
  },
  {
    id: 2,
    title: "Weekly Specials",
    subtitle: "Save More on Your Favorites",
    description: "Check out our weekly flyer for amazing deals on fresh produce, pantry essentials, and more.",
    image: "/grocery-store-weekly-deals-and-discounts.jpg",
    cta: "View Flyer",
    ctaLink: "/flyer",
    badge: "Save Big",
  },
  {
    id: 3,
    title: "Farm Fresh Produce",
    subtitle: "Straight from Canadian Farms",
    description: "Supporting local farmers and bringing you the freshest seasonal produce from across Canada.",
    image: "/canadian-farm-fresh-produce-harvest.jpg",
    cta: "Explore Produce",
    ctaLink: "/products?category=produce",
    badge: "Local",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative h-[600px] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <div className="mb-4">
            <Badge className="bg-secondary text-secondary-foreground mb-4">
              <Star className="w-4 h-4 mr-1" />
              {heroSlides[currentSlide].badge}
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">{heroSlides[currentSlide].title}</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-secondary">
            {heroSlides[currentSlide].subtitle}
          </h2>
          <p className="text-lg mb-8 text-pretty opacity-90 max-w-lg">{heroSlides[currentSlide].description}</p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link href={heroSlides[currentSlide].ctaLink}>{heroSlides[currentSlide].cta}</Link>
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </section>
  )
}
