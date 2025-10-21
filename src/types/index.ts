import { StaticImageData } from "next/image"

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  subcategories?: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  image?: string
  subSubcategories?: SubSubcategory[]
}

export interface SubSubcategory {
  id: string
  name: string
  slug: string
  image?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string | StaticImageData
  images?: string[]
  category: string
  subcategory?: string
  subSubcategory?: string
  rating: number
  reviews: number
  inStock: boolean
  quantity?: number
  unit?: string
    discount?: number;
  tags?: string[]
}

export interface Flyer {
  id: string
  title: string
  category: string
  startDate: string
  endDate: string
  coverImage: string
  products: FlyerProduct[]
  isActive: boolean
}

export interface FlyerProduct {
  productId: string
  discount: number
  flyerPrice: number
  position: number
}

export interface CartItem {
  productId: string
  quantity: number
  price: number
}

export interface User {
  id: string
  email: string
  name: string
  isAdmin: boolean
  country: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
}
