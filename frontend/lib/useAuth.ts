import { create } from "zustand"
import { authAPI, type User } from "./api-client"

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  signup: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.signup(name, email, password)
      localStorage.setItem("token", response.token)
      set({ user: response.user, token: response.token, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      throw error
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authAPI.login(email, password)
      localStorage.setItem("token", response.token)
      set({ user: response.user, token: response.token, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("token")
    set({ user: null, token: null })
  },

  loadUser: async () => {
    set({ isLoading: true })
    try {
      const token = localStorage.getItem("token")
      if (token) {
        const user = await authAPI.getCurrentUser(token)
        set({ user, token, isLoading: false })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      localStorage.removeItem("token")
      set({ error: (error as Error).message, isLoading: false })
    }
  },
}))
