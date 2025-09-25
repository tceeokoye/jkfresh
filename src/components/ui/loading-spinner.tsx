"use client"

import { useEffect, useState } from "react"

interface LoadingSpinnerProps {
  onComplete?: () => void
}

export function LoadingSpinner({ onComplete }: LoadingSpinnerProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete?.()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="unwrap-animation">
        <div className="relative">
          {/* 3D Box Animation */}
          <div className="w-32 h-32 relative transform-gpu">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-2xl animate-pulse">
              <div className="absolute inset-2 bg-background rounded-md flex items-center justify-center">
                <div className="text-2xl font-bold text-primary">JK</div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary rounded-full float-animation opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full float-animation opacity-60 animation-delay-1000"></div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">JK Fresh</h2>
            <p className="text-muted-foreground">Loading your fresh experience...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
