import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import cartSlice from "./slices/cartSlice"
import flyerSlice from "./slices/flyerSlice"
import productSlice from "./slices/productSlice"
import uiSlice from "./slices/uiSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  cart: cartSlice,
  flyer: flyerSlice,
  product: productSlice,
  ui: uiSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Standard Redux Toolkit configuration
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
