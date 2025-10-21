"use client"

import { useState } from "react"
import { Package, CheckCircle, AlertCircle, Truck } from "lucide-react"

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "paid" | "in-progress" | "delivered">("all")

  // Mock orders data
  const allOrders = [
    { id: "ORD-001", customer: "John Doe", total: 125.99, status: "delivered", date: "2025-01-15", items: 5 },
    { id: "ORD-002", customer: "Jane Smith", total: 89.5, status: "in-progress", date: "2025-01-14", items: 3 },
    { id: "ORD-003", customer: "Bob Johnson", total: 156.75, status: "pending", date: "2025-01-13", items: 8 },
    { id: "ORD-004", customer: "Alice Brown", total: 234.2, status: "paid", date: "2025-01-12", items: 6 },
    { id: "ORD-005", customer: "Charlie Wilson", total: 67.8, status: "delivered", date: "2025-01-11", items: 2 },
    { id: "ORD-006", customer: "Diana Davis", total: 198.45, status: "in-progress", date: "2025-01-10", items: 7 },
  ]

  const filteredOrders = filterStatus === "all" ? allOrders : allOrders.filter((order) => order.status === filterStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "paid":
        return <Package className="w-5 h-5 text-purple-600" />
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
      paid: { bg: "bg-purple-100", text: "text-purple-700", label: "Paid" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>{config.label}</span>
    )
  }

  const stats = {
    total: allOrders.length,
    pending: allOrders.filter((o) => o.status === "pending").length,
    paid: allOrders.filter((o) => o.status === "paid").length,
    inProgress: allOrders.filter((o) => o.status === "in-progress").length,
    delivered: allOrders.filter((o) => o.status === "delivered").length,
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Order Management</h1>
          <p className="text-gray-400 mt-2">Track and manage all customer orders</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-xs md:text-sm">Total Orders</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-xs md:text-sm">Pending</p>
            <p className="text-2xl md:text-3xl font-bold text-yellow-600 mt-2">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-xs md:text-sm">Paid</p>
            <p className="text-2xl md:text-3xl font-bold text-purple-600 mt-2">{stats.paid}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-xs md:text-sm">In Progress</p>
            <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-gray-600 text-xs md:text-sm">Delivered</p>
            <p className="text-2xl md:text-3xl font-bold text-green-600 mt-2">{stats.delivered}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
          {(["all", "pending", "paid", "in-progress", "delivered"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 md:px-4 py-2 rounded-lg font-medium text-xs md:text-sm transition ${
                filterStatus === status
                  ? "bg-green-600 text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Order ID
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Customer
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Items</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Total</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">{order.customer}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">{order.items}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-green-600">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm">{getStatusBadge(order.status)}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm">
                      <button className="text-green-600 hover:text-green-700 font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
