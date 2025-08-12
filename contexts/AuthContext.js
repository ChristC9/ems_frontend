"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { authService } from "../lib/auth"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          const profile = await authService.getProfile()
          setUser(profile)
        } catch (error) {
          console.error("Failed to get profile:", error)
          await authService.logout()
          setUser(null)
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email, password) => {
    try {
      await authService.login(email, password)
      const profile = await authService.getProfile()
      setUser(profile)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
      setUser(null)
      // Force redirect to login page
      router.push("/login")
      // Also force a page refresh to clear any cached state
      window.location.href = "/login"
    } catch (error) {
      console.error("Logout error:", error)
      // Even if logout API fails, clear local state and redirect
      setUser(null)
      router.push("/login")
      window.location.href = "/login"
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
