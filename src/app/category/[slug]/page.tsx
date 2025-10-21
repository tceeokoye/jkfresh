"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/product-data";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ Unwrap the params Promise (React 19 / Next.js 15 way)
  const { slug } = React.use(params);

  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const category = categories.find((c) => c.slug === slug);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) => p.category === category?.slug);

    if (selectedSubcategory) {
      filtered = filtered.filter((p) => p.subcategory === selectedSubcategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [category, selectedSubcategory, priceRange, sortBy]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <motion.div
          className="flex gap-2 text-sm text-gray-600 mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900">{category?.name}</span>
        </motion.div>

        {category ? (
          <>
            <motion.h1
              className="text-3xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {category.name}
            </motion.h1>

            <div className="flex gap-8">
              {/* Sidebar Filters */}
              <motion.div
                className={`${
                  showFilters ? "block" : "hidden"
                } md:block w-full md:w-64 flex-shrink-0 sticky top-34 h-fit`}
                // 👆 Added: `sticky top-24 h-fit` for fixed sidebar behavior
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="bg-green-800/5 rounded-lg py-6 space-y-6  shadow-sm">
                  {/* Subcategories */}
                  {category.subcategories &&
                    category.subcategories.length > 0 && (
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2 px-6">
                          Categories
                        </h3>
                        <div className="space-y-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedSubcategory(null)}
                            className={`w-full text-left px-6   transition  font-bold ${
                              !selectedSubcategory
                                ? "bg-white text-gray-600  "
                                : "text-gray-70 hover:bg-gray-200"
                            }`}
                          >
                            All
                          </motion.button>

                          {category.subcategories.map((sub) => (
                            <motion.button
                              key={sub.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() =>
                                setSelectedSubcategory(
                                  selectedSubcategory === sub.slug
                                    ? null
                                    : sub.slug
                                )
                              }
                              className={`w-full text-left px-6   py-2 transition ${
                                selectedSubcategory === sub.slug
                                  ? "bg-white text-green-800 font-medium text-sm"
                                  : "text-gray-700 hover:bg-gray-200 text-sm"
                              }`}
                            >
                              {sub.name}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Price Range */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">
                      Price Range
                    </h3>
                    <div className="space-y-4">
                      <motion.input
                        type="range"
                        min="0"
                        max="100"
                        value={priceRange[1]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setPriceRange([
                            priceRange[0],
                            Number.parseInt(e.target.value),
                          ])
                        }
                        className="w-full accent-green-600"
                        whileTap={{ scale: 0.98 }}
                      />

                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([
                              Number.parseInt(e.target.value),
                              priceRange[1],
                            ])
                          }
                          className="w-1/2 px-2 py-1 border border-gray-300 rounded"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([
                              priceRange[0],
                              Number.parseInt(e.target.value),
                            ])
                          }
                          className="w-1/2 px-2 py-1 border border-gray-300 rounded"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Products */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Sort and Filter Toggle */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    {filteredProducts.length} products
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="md:hidden px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Filters
                    </button>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>

                {/* Products Grid */}
                {filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[400px]" // 👈 reduced card height
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <p className="text-gray-600">
                      No products found matching your filters.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </>
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-12">
            <p className="text-gray-600">Category not found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>
              &copy; 2025 Fresh. All rights reserved. Delivering fresh from
              Canada worldwide.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
