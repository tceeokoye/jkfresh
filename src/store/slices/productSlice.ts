import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Product } from "../../types/global"

interface ProductState {
  products: Product[]
  featuredProducts: Product[]
  categories: string[]
  searchResults: Product[]
  currentProduct: Product | null
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
}

const initialState: ProductState = {
  products: [],
  featuredProducts: [],
  categories: [],
  searchResults: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: "",
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ category, search }: { category?: string; search?: string } = {}) => {
    const params = new URLSearchParams()
    if (category) params.append("category", category)
    if (search) params.append("search", search)

    const response = await fetch(`/api/products?${params}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  },
)

export const fetchFeaturedProducts = createAsyncThunk("product/fetchFeaturedProducts", async () => {
  const response = await fetch("/api/products/featured")
  if (!response.ok) {
    throw new Error("Failed to fetch featured products")
  }
  return response.json()
})

export const fetchCategories = createAsyncThunk("product/fetchCategories", async () => {
  const response = await fetch("/api/products/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
})

export const fetchProductById = createAsyncThunk("product/fetchProductById", async (productId: string) => {
  const response = await fetch(`/api/products/${productId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    clearSearchResults: (state) => {
      state.searchResults = []
      state.searchQuery = ""
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        if (state.searchQuery) {
          state.searchResults = action.payload
        } else {
          state.products = action.payload
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      // Featured products
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.featuredProducts = action.payload
      })
      // Categories
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      // Product by ID
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload
      })
  },
})

export const { setSearchQuery, setSelectedCategory, clearSearchResults, clearError } = productSlice.actions

export default productSlice.reducer
