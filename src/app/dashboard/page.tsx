"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import type { RootState } from "../../src/store"

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/auth")
    }
  }, [user, router])

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DashboardOverview />
      </main>
      <Footer />
    </div>
  )
}
