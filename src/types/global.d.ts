import { n } from "node_modules/framer-motion/dist/types.d-DsEeKk6G";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: Address;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface Product {
  salePrice: number;
  originalPrice: number;
  id: string;
  name: string;
  description: string;

  originalPrice?: number;
  category: string;
  subcategory?: string;
 
  images: string[];
  inStock: boolean;
  stockQuantity: number;
  unit: string; // 'lb', 'kg', 'each', 'pack'
  nutrition?: NutritionInfo;
  tags: string[];
 
  image: string | File | null |StaticImport;
  stock: number;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
  nutritionFacts: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
    fiber: string;
    sugar: string;
  };
  ingredients: [string];
  allergens: [];
  origin: string;
  storageInstructions: string
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: number;
}

export interface Flyer {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  coverImage: string;
  pages: FlyerPage[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FlyerPage {
  id: string;
  pageNumber: number;
  image: string;
  deals: Deal[];
}

export interface Deal {
  id: string;
  productId: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: string;
  validUntil: string;
  image: string;
  category: string;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumPurchase?: number;
  validFrom: string;
  validUntil: string;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  guestEmail?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "cancelled";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  deliveryAddress?: Address;
  deliveryDate?: string;
  deliveryTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: Address;
  phone: string;
  hours: StoreHours;
  services: string[];
  isActive: boolean;
}

export interface StoreHours {
  monday: { open: string; close: string };
  tuesday: { open: string; close: string };
  wednesday: { open: string; close: string };
  thursday: { open: string; close: string };
  friday: { open: string; close: string };
  saturday: { open: string; close: string };
  sunday: { open: string; close: string };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
