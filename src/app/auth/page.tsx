"use client"

import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { SignupForm } from "@/components/auth/signup-form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import type { RootState } from "../../src/store"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const user = useSelector((state: RootState) => state.auth.user)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSuccess = () => {
    router.push("/dashboard")
  }

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login")
  }

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {mode === "login" ? (
            <LoginForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
          ) : (
            <SignupForm onToggleMode={toggleMode} onSuccess={handleSuccess} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
