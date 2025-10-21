"use client"

import Link from "next/link"
// import { categories } from "@/lib/mock-data"
import { categories} from "@/lib/product-data"
import Image from "next/image"

export function CategorySection() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.slug}`}>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative overflow-hidden bg-gray-100 h-32">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={32} height={32}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
