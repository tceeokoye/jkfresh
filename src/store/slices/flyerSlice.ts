import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import type { Flyer, Deal } from "../../types/global"

interface FlyerState {
  currentFlyer: Flyer | null
  flyers: Flyer[]
  featuredDeals: Deal[]
  isLoading: boolean
  error: string | null
}

const initialState: FlyerState = {
  currentFlyer: null,
  flyers: [],
  featuredDeals: [],
  isLoading: false,
  error: null,
}

export const fetchCurrentFlyer = createAsyncThunk("flyer/fetchCurrentFlyer", async () => {
  const response = await fetch("/api/flyers/current")
  if (!response.ok) {
    throw new Error("Failed to fetch current flyer")
  }
  return response.json()
})

export const fetchFlyers = createAsyncThunk("flyer/fetchFlyers", async () => {
  const response = await fetch("/api/flyers")
  if (!response.ok) {
    throw new Error("Failed to fetch flyers")
  }
  return response.json()
})

export const fetchFeaturedDeals = createAsyncThunk("flyer/fetchFeaturedDeals", async () => {
  const response = await fetch("/api/deals/featured")
  if (!response.ok) {
    throw new Error("Failed to fetch featured deals")
  }
  return response.json()
})

const flyerSlice = createSlice({
  name: "flyer",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Current flyer
      .addCase(fetchCurrentFlyer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCurrentFlyer.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentFlyer = action.payload
      })
      .addCase(fetchCurrentFlyer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch current flyer"
      })
      // All flyers
      .addCase(fetchFlyers.fulfilled, (state, action) => {
        state.flyers = action.payload
      })
      // Featured deals
      .addCase(fetchFeaturedDeals.fulfilled, (state, action) => {
        state.featuredDeals = action.payload
      })
  },
})

export const { clearError } = flyerSlice.actions
export default flyerSlice.reducer
