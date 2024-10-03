import { defineStore } from 'pinia'
import { ref } from 'vue'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  type User
} from 'firebase/auth'
import { auth } from '../utils/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)
  const resetEmailSent = ref(false)

  const init = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user

      if (user.value) {
        await updateProfile(user.value, { displayName: name })
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      user.value = userCredential.user
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
    } catch (e: any) {
      error.value = e.message
    }
  }

  const resetPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      resetEmailSent.value = false
      await sendPasswordResetEmail(auth, email)
      resetEmailSent.value = true
    } catch (e: any) {
      error.value = e.message
      resetEmailSent.value = false
    } finally {
      loading.value = false
    }
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