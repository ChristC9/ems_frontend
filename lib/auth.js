import api from "./api"

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login/", {
        email,
        password,
      })

      const { access, refresh } = response.data
      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)

      return response.data
    } catch (error) {
      throw error
    }
  },

  async logout() {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if (refreshToken) {
        await api.post("/auth/logout/", {
          refresh: refreshToken,
        })
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Always clear local storage regardless of API response
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")

      // Clear any other cached data
      localStorage.removeItem("user_profile")

      // Clear session storage as well
      sessionStorage.clear()
    }
  },

  async getProfile() {
    try {
      const response = await api.get("/auth/profile/")
      return response.data
    } catch (error) {
      throw error
    }
  },

  isAuthenticated() {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("access_token")
    }
    return false
  },
}
