"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { authAPI, type User } from "@/lib/api-client"

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  signup: (name: string, email: string, password: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      loadUserFromToken(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const loadUserFromToken = async (token: string) => {
    try {
      const user = await authAPI.getCurrentUser(token)
      setUser(user)
      setToken(token)
    } catch (error) {
      localStorage.removeItem("token")
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    const response = await authAPI.signup(name, email, password)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem("token", response.token)
  }

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password)
    setUser(response.user)
    setToken(response.token)
    localStorage.setItem("token", response.token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
