"use client"
import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import type { ProductCategory } from "@/data/productCategories"

interface CategoryTreeProps {
  categories: ProductCategory[]
  onSelect: (name: string) => void
}

export default function CategoryTree({ categories, onSelect }: CategoryTreeProps) {
  return (
    <ul className="space-y-1">
      {categories.map((category) => (
        <CategoryNode key={category.name} category={category} onSelect={onSelect} />
      ))}
    </ul>
  )
}

function CategoryNode({ category, onSelect }: { category: ProductCategory; onSelect: (name: string) => void }) {
  const [expanded, setExpanded] = useState(false)
  const hasChildren = category.subcategories && category.subcategories.length > 0

  return (
    <li>
      <div
        className="flex items-center justify-between cursor-pointer hover:text-green-600"
        onClick={() => (hasChildren ? setExpanded(!expanded) : onSelect(category.name))}
      >
        <span>{category.name}</span>
        {hasChildren && (
          <span>{expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
      </div>

      {expanded && hasChildren && (
        <ul className="pl-4 mt-1 border-l border-gray-300">
          {category.subcategories!.map((sub) => (
            <CategoryNode key={sub.name} category={sub} onSelect={onSelect} />
          ))}
        </ul>
      )}
    </li>
  )
}
