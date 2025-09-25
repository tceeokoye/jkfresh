"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FlyerGrid } from "@/components/flyer/flyer-grid"
import { DealsGrid } from "@/components/flyer/deals-grid"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, TrendingUp, Percent } from "lucide-react"
import type { RootState } from "@/store"
import { motion, AnimatePresence } from "framer-motion"

// --- Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" as const },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

// Mock data
const mockFlyers = [
  {
    id: "1",
    title: "Weekly Savings",
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
    ],
    isActive: true,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
]

const mockDeals = [
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

export default function FlyerPage() {
  const dispatch = useDispatch()
  const { flyers, featuredDeals, isLoading } = useSelector(
    (state: RootState) => state.flyer
  )
  const [activeTab, setActiveTab] = useState<"current" | "archive">("current")

  useEffect(() => {
    // dispatch(fetchFlyers())
    // dispatch(fetchFeaturedDeals())
  }, [dispatch])

  const currentFlyers = mockFlyers.filter((flyer) => flyer.isActive)
  const archivedFlyers = mockFlyers.filter((flyer) => !flyer.isActive)

  return (
    <motion.div initial="hidden" animate="visible" className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Weekly Flyers & Deals
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover amazing savings on fresh produce, quality meats, and everyday essentials
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: <Percent className="w-6 h-6 text-primary" />, value: "30%", label: "Average Savings" },
                { icon: <TrendingUp className="w-6 h-6 text-secondary" />, value: "200+", label: "Weekly Deals" },
                { icon: <Calendar className="w-6 h-6 text-primary" />, value: "7", label: "Days Valid" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp} custom={i}>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        {stat.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Deals */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="py-16 bg-background"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={scaleIn} initial="hidden" animate="visible">
              <DealsGrid deals={mockDeals} title="This Week's Featured Deals" />
            </motion.div>
          </div>
        </motion.section>

        {/* Flyers Section */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="py-16 bg-muted/30"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-3xl font-bold">Browse Flyers</h2>
              <div className="flex gap-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={activeTab === "current" ? "default" : "outline"}
                    onClick={() => setActiveTab("current")}
                  >
                    Current Flyers
                  </Button>
                </motion.div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={activeTab === "archive" ? "default" : "outline"}
                    onClick={() => setActiveTab("archive")}
                  >
                    Archive
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === "current" ? (
                <motion.div
                  key="current"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentFlyers.length > 0 ? (
                    <FlyerGrid flyers={currentFlyers} showAll />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No current flyers available.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="archive"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  {archivedFlyers.length > 0 ? (
                    <FlyerGrid flyers={archivedFlyers} showAll />
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No archived flyers available.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* Money Saving Tips */}
        <motion.section
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="py-16 bg-primary text-primary-foreground"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Money Saving Guarantees</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              Here's how we help your dollar go further with our price matching and savings programs.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </motion.div>
  )
}
