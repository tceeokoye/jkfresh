// store/storeSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { CartItem, User } from "@/types"

interface StoreState {
  cart: CartItem[]
  user: User | null
  country: string
}

const initialState: StoreState = {
  cart: [],
  user: null,
  country: "Canada",
}

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ productId: string; quantity: number; price: number }>
    ) => {
      const { productId, quantity, price } = action.payload
      const existing = state.cart.find(item => item.productId === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.cart.push({ productId, quantity, price })
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter(item => item.productId !== action.payload)
    },

    updateCartQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload
      if (quantity <= 0) {
        state.cart = state.cart.filter(item => item.productId !== productId)
      } else {
        const item = state.cart.find(item => item.productId === productId)
        if (item) item.quantity = quantity
      }
    },

    clearCart: state => {
      state.cart = []
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },

    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setUser,
  setCountry,
} = storeSlice.actions

export default storeSlice.reducer
