"use client"

import { useState } from "react"
import { products } from "@/lib/mock-data"
import { TrendingUp, Package, DollarSign, ShoppingCart } from "lucide-react"

export default function AdminAnalysisPage() {
  const [sortBy, setSortBy] = useState<"sales" | "stock" | "price">("sales")

  // Mock analytics data
  const productAnalytics = products.map((product) => ({
    ...product,
    sales: Math.floor(Math.random() * 500),
    revenue: Math.floor(Math.random() * 5000),
    views: Math.floor(Math.random() * 2000),
    stock: product.inStock ? 100 : 0, // Convert boolean inStock to numeric
  }))

  const sortedProducts = [...productAnalytics].sort((a, b) => {
    if (sortBy === "sales") return b.sales - a.sales
    if (sortBy === "stock") return b.stock - a.stock
    return b.price - a.price
  })

  const totalRevenue = productAnalytics.reduce((sum, p) => sum + p.revenue, 0)
  const totalSales = productAnalytics.reduce((sum, p) => sum + p.sales, 0)
  const totalViews = productAnalytics.reduce((sum, p) => sum + p.views, 0)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold">Product Analytics</h1>
          <p className="text-gray-400 mt-2">Track product performance and sales metrics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Revenue</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                  ${(totalRevenue / 1000).toFixed(1)}K
                </p>
              </div>
              <DollarSign className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Sales</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{totalSales}</p>
              </div>
              <ShoppingCart className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{(totalViews / 1000).toFixed(1)}K</p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Products</p>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{products.length}</p>
              </div>
              <Package className="w-10 h-10 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">Product Performance</h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "sales" | "stock" | "price")}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            >
              <option value="sales">Sort by Sales</option>
              <option value="stock">Sort by Stock</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Product
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Category
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Sales</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">
                    Revenue
                  </th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-semibold text-gray-900">Stock</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.slice(0, 15).map((product) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-900 font-medium">{product.name}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-green-600">{product.sales}</td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-green-600">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-600">
                      {product.views.toLocaleString()}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-xs md:text-sm">
                      <span
                        className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                          product.stock > 50
                            ? "bg-green-100 text-green-700"
                            : product.stock > 20
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock}
                      </span>
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
