import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StaticImageData } from "next/image"

export interface CartItem {
  productId: string
  name: string,
  image?: string | StaticImageData,
  quantity: number
  price: number
}

interface CartState {
  items: CartItem[]
  user: any | null
  country: string
}

const initialState: CartState = {
  items: [],
  user: null,
  country: "Canada",
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.productId === action.payload.productId)
      if (existing) {
        existing.quantity += action.payload.quantity
      } else {
        state.items.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.productId !== action.payload)
    },
    updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId)
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((i) => i.productId !== action.payload.productId)
        } else {
          item.quantity = action.payload.quantity
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    setUser: (state, action: PayloadAction<any | null>) => {
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
} = cartSlice.actions

export const selectCart = (state: { cart: CartState }) => state.cart.items
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)

export default cartSlice.reducer
