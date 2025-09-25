"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"

// --- Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" as const },
  }),
}

export default function ContactPage() {
  return (
    <motion.div initial="hidden" animate="visible" className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero Section */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need support? Our team is here to help you with
              anything you need.
            </p>
          </div>
        </motion.section>

        {/* Contact Cards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Phone className="w-6 h-6 text-primary" />,
                title: "Call Us",
                info: "+1 (555) 123-4567",
              },
              {
                icon: <Mail className="w-6 h-6 text-primary" />,
                title: "Email Us",
                info: "support@jkfresh.com",
              },
              {
                icon: <MapPin className="w-6 h-6 text-primary" />,
                title: "Visit Us",
                info: "123 Fresh Street, Green City",
              },
            ].map((contact, i) => (
              <motion.div key={i} variants={fadeInUp} custom={i}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">{contact.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                    <p className="text-muted-foreground">{contact.info}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            custom={3}
            className="max-w-2xl mx-auto mt-12"
          >
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Send Us a Message</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full border rounded-md px-3 py-2"
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </motion.div>
  )
}
