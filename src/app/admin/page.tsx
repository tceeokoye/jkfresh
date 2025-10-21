"use client"

import type React from "react"

import { useState } from "react"
import { products, categories, flyers } from "@/lib/mock-data"
import type { Product, Flyer } from "@/types"
import { Edit2, Trash2, Plus, X } from "lucide-react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"products" | "flyers" | "analysis" | "orders">("products")
  const [showProductForm, setShowProductForm] = useState(false)
  const [showFlyerForm, setShowFlyerForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [editingFlyer, setEditingFlyer] = useState<Flyer | null>(null)

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    image: "",
    category: "",
    inStock: true,
  })

  const [flyerFormData, setFlyerFormData] = useState<Partial<Flyer>>({
    title: "",
    category: "",
    startDate: "",
    endDate: "",
    coverImage: "",
    products: [],
    isActive: true,
  })

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Product saved:", formData)
    setShowProductForm(false)
    setFormData({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      image: "",
      category: "",
      inStock: true,
    })
  }

  const handleFlyerSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save to a database
    console.log("Flyer saved:", flyerFormData)
    setShowFlyerForm(false)
    setFlyerFormData({
      title: "",
      category: "",
      startDate: "",
      endDate: "",
      coverImage: "",
      products: [],
      isActive: true,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-gray-900 text-white p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage products, categories, and flyers</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300 overflow-x-auto">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "products"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("flyers")}
            className={`px-6 py-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "flyers"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Flyers
          </button>
          <a
            href="/admin/analysis"
            className="px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition whitespace-nowrap"
          >
            Analytics
          </a>
          <a
            href="/admin/orders"
            className="px-6 py-3 font-medium border-b-2 border-transparent text-gray-600 hover:text-gray-900 transition whitespace-nowrap"
          >
            Orders
          </a>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <button
                onClick={() => setShowProductForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            {/* Product Form */}
            {showProductForm && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowProductForm(false)
                      setEditingProduct(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Product Name"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <select
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <textarea
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows={3}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Price"
                      value={formData.price || ""}
                      onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      step="0.01"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Original Price (optional)"
                      value={formData.originalPrice || ""}
                      onChange={(e) => setFormData({ ...formData, originalPrice: Number.parseFloat(e.target.value) })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      step="0.01"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Image URL"
                    value={formData.image || ""}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.inStock || false}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">In Stock</span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProductForm(false)
                        setEditingProduct(null)
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Products Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 10).map((product) => (
                    <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product)
                            setFormData(product)
                            setShowProductForm(true)
                          }}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Flyers Tab */}
        {activeTab === "flyers" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Flyers</h2>
              <button
                onClick={() => setShowFlyerForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
              >
                <Plus className="w-5 h-5" />
                Create Flyer
              </button>
            </div>

            {/* Flyer Form */}
            {showFlyerForm && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {editingFlyer ? "Edit Flyer" : "Create New Flyer"}
                  </h3>
                  <button
                    onClick={() => {
                      setShowFlyerForm(false)
                      setEditingFlyer(null)
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleFlyerSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Flyer Title"
                    value={flyerFormData.title || ""}
                    onChange={(e) => setFlyerFormData({ ...flyerFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />

                  <select
                    value={flyerFormData.category || ""}
                    onChange={(e) => setFlyerFormData({ ...flyerFormData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={flyerFormData.startDate || ""}
                      onChange={(e) => setFlyerFormData({ ...flyerFormData, startDate: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                    <input
                      type="date"
                      value={flyerFormData.endDate || ""}
                      onChange={(e) => setFlyerFormData({ ...flyerFormData, endDate: e.target.value })}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Cover Image URL"
                    value={flyerFormData.coverImage || ""}
                    onChange={(e) => setFlyerFormData({ ...flyerFormData, coverImage: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={flyerFormData.isActive || false}
                      onChange={(e) => setFlyerFormData({ ...flyerFormData, isActive: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-gray-700">Active</span>
                  </label>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
                    >
                      {editingFlyer ? "Update Flyer" : "Create Flyer"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowFlyerForm(false)
                        setEditingFlyer(null)
                      }}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Flyers Table */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date Range</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flyers.map((flyer) => (
                    <tr key={flyer.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{flyer.title}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{flyer.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(flyer.startDate).toLocaleDateString()} -{" "}
                        {new Date(flyer.endDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            flyer.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {flyer.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => {
                            setEditingFlyer(flyer)
                            setFlyerFormData(flyer)
                            setShowFlyerForm(true)
                          }}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 flex items-center gap-1">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
