import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { ThemeProvider } from "../components/theme-provider"

const geist = localFont({
  src: [
    { path: "/fonts/static/Geist-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/static/Geist-Medium.ttf", weight: "500", style: "normal" },
    { path: "/fonts/static/Geist-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-geist",
})

const geistMono = localFont({
  src: [
    { path: "/fonts/static/GeistMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "/fonts/static/GeistMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "JK Fresh - Your Canadian Grocery Store",
  description:
    "Fresh quality groceries delivered to your door. Shop the best selection of produce, meat, bakery items and more from your trusted Canadian grocer.",
  keywords: "grocery store, fresh produce, Canadian groceries, online shopping, delivery",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"  suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ReduxProvider>{children}</ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
