"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Leaf, HeartHandshake } from "lucide-react"

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

export default function AboutPage() {
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
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              About Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              At JK Fresh, we’re dedicated to delivering fresh, quality groceries
              while building trust with our customers and community.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-8 h-8 text-primary" />,
                title: "Community",
                desc: "We support local farmers and prioritize our community’s health.",
              },
              {
                icon: <Leaf className="w-8 h-8 text-green-600" />,
                title: "Freshness",
                desc: "Every product is hand-picked for quality and freshness.",
              },
              {
                icon: <HeartHandshake className="w-8 h-8 text-secondary" />,
                title: "Trust",
                desc: "Honest pricing, transparent deals, and reliable service.",
              },
            ].map((value, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
