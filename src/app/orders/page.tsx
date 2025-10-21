"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

import { useSelector } from "react-redux"
import Link from "next/link"
import { Package, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { RootState } from "@/store"

export default function OrdersPage() {
    const user = useSelector((state:RootState) => state.user.user)


  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      date: "2025-01-15",
      total: 125.99,
      status: "delivered",
      items: 5,
    },
    {
      id: "ORD-002",
      date: "2025-01-10",
      total: 89.5,
      status: "in-progress",
      items: 3,
    },
    {
      id: "ORD-003",
      date: "2025-01-05",
      total: 156.75,
      status: "pending",
      items: 8,
    },
  ]

  if (!user) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Please Log In</h1>
          <p className="text-gray-600 mb-8">You need to be logged in to view your orders.</p>
          <Link href="/" className="text-green-600 hover:text-green-700 font-medium">
            Return to Home
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "pending":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <Package className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
      delivered: { bg: "bg-green-100", text: "text-green-700", label: "Delivered" },
      "in-progress": { bg: "bg-blue-100", text: "text-blue-700", label: "In Progress" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link href="/products" className="text-green-600 hover:text-green-700 font-medium">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-md transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-xs text-gray-600">Order ID</p>
                    <p className="font-bold text-gray-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Items</p>
                    <p className="font-medium text-gray-900">{order.items} items</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Total</p>
                    <p className="font-bold text-green-600">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-4">
                    {getStatusBadge(order.status)}
                    <Link
                      href={`/orders/${order.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
