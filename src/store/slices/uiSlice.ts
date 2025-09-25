import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface UiState {
  isMobileMenuOpen: boolean
  isSearchOpen: boolean
  isLoading: boolean
  notifications: Notification[]
  theme: "light" | "dark"
}

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
}

const initialState: UiState = {
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isLoading: false,
  notifications: [],
  theme: "light",
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen
    },
    setSearchOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchOpen = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, "id">>) => {
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.notifications.push(notification)
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
  },
})

export const {
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleSearch,
  setSearchOpen,
  setLoading,
  addNotification,
  removeNotification,
  setTheme,
} = uiSlice.actions

export default uiSlice.reducer
