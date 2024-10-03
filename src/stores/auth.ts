import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from 'firebase/auth'
import { useAuth } from '../composables/useAuth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const {
    loading,
    error,
    resetEmailSent,
    registerUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    resetUserPassword,
    initAuthListener
  } = useAuth()

  const init = () => {
    initAuthListener((firebaseUser) => {
      user.value = firebaseUser
    })
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await registerUser(email, password)
      if (newUser) {
        await updateUserProfile(newUser, name)
        user.value = newUser
      }
    } catch (e) {
      // Error já está sendo tratado no composable
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const loggedUser = await loginUser(email, password)
      user.value = loggedUser
    } catch (e) {
      // Error já está sendo tratado no composable
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      user.value = null
    } catch (e) {
      // Error já está sendo tratado no composable
    }
  }

  const resetPassword = async (email: string) => {
    await resetUserPassword(email)
  }

  return {
    user,
    error,
    loading,
    resetEmailSent,
    init,
    register,
    login,
    logout,
    resetPassword
  }
})