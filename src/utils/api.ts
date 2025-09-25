import type { ApiResponse } from "../types/global"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api"

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "An error occurred",
        }
      }

      return {
        success: true,
        data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error",
      }
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// Specific API functions
export const authApi = {
  login: (email: string, password: string) => apiClient.post("/auth/login", { email, password }),
  register: (userData: any) => apiClient.post("/auth/register", userData),
  logout: () => apiClient.post("/auth/logout"),
  getProfile: () => apiClient.get("/auth/profile"),
}

export const productApi = {
  getProducts: (params?: { category?: string; search?: string }) =>
    apiClient.get(`/products${params ? `?${new URLSearchParams(params)}` : ""}`),
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
  getFeaturedProducts: () => apiClient.get("/products/featured"),
  getCategories: () => apiClient.get("/products/categories"),
}

export const flyerApi = {
  getCurrentFlyer: () => apiClient.get("/flyers/current"),
  getFlyers: () => apiClient.get("/flyers"),
  getFlyer: (id: string) => apiClient.get(`/flyers/${id}`),
  getFeaturedDeals: () => apiClient.get("/deals/featured"),
}

export const orderApi = {
  createOrder: (orderData: any) => apiClient.post("/orders", orderData),
  getOrders: () => apiClient.get("/orders"),
  getOrder: (id: string) => apiClient.get(`/orders/${id}`),
}
