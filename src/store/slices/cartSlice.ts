import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, Product } from "../../types/global"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  subtotal: number
  tax: number
  total: number
  itemCount: number
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  subtotal: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
}

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.product.salePrice * item.quantity, 0)
  const tax = subtotal * 0.13 // Example: 13% HST
  const total = subtotal + tax
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return { subtotal, tax, total, itemCount }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product; quantity?: number; selectedWeight?: number }>) => {
      const { product, quantity = 1, selectedWeight } = action.payload
      const existingItem = state.items.find(
        (item) => item.product.id === product.id && item.selectedWeight === selectedWeight
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        state.items.push({ product, quantity, selectedWeight })
      }

      Object.assign(state, calculateTotals(state.items))
    },

    removeFromCart: (state, action: PayloadAction<{ productId: string; selectedWeight?: number }>) => {
      const { productId, selectedWeight } = action.payload
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedWeight === selectedWeight)
      )

      Object.assign(state, calculateTotals(state.items))
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number; selectedWeight?: number }>
    ) => {
      const { productId, quantity, selectedWeight } = action.payload
      const item = state.items.find((item) => item.product.id === productId && item.selectedWeight === selectedWeight)

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((i) => i !== item)
        } else {
          item.quantity = quantity
        }
      }

      Object.assign(state, calculateTotals(state.items))
    },

    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.tax = 0
      state.total = 0
      state.itemCount = 0
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },

    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
} = cartSlice.actions

export default cartSlice.reducer
