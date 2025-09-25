"use client"

import type React from "react"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Header } from "@/components/layout/header"
import type { RootState } from "@/store"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    // In real app, check if user has admin role
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
      <div className="flex h-[calc(100vh-4rem)]">
        <AdminSidebar className="w-64 flex-shrink-0" />
        <main className="flex-1 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
