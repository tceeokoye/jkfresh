"use client"

import { useState } from "react"
import { Header } from "../components/layout/header"
import { Footer } from "../components/layout/footer"
import { LoadingSpinner } from "../components/ui/loading-spinner"
import { HeroSection } from "../components/home/hero-section"
import { FeaturedSection } from "../components/home/featured-section"
import { ServicesSection } from "../components/home/services-section"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingSpinner onComplete={() => setIsLoading(false)} />}
      <div className={`min-h-screen ${isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}`}>
        <Header />
        <main>
          <HeroSection />
          <FeaturedSection />
          <ServicesSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
