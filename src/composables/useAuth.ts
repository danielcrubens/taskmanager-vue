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

export function useAuth() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const resetEmailSent = ref(false)

  const handleAuthError = (e: any) => {
    error.value = e.message
    throw e
  }

  const registerUser = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (e: any) {
      handleAuthError(e)
    } finally {
      loading.value = false
    }
  }

  const updateUserProfile = async (user: User, name: string) => {
    try {
      await updateProfile(user, { displayName: name })
    } catch (e: any) {
      handleAuthError(e)
    }
  }

  const loginUser = async (email: string, password: string) => {
    try {
      loading.value = true
      error.value = null
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      return userCredential.user
    } catch (e: any) {
      handleAuthError(e)
    } finally {
      loading.value = false
    }
  }

  const logoutUser = async () => {
    try {
      await signOut(auth)
    } catch (e: any) {
      handleAuthError(e)
    }
  }

  const resetUserPassword = async (email: string) => {
    try {
      loading.value = true
      error.value = null
      resetEmailSent.value = false
      await sendPasswordResetEmail(auth, email)
      resetEmailSent.value = true
    } catch (e: any) {
      resetEmailSent.value = false
      handleAuthError(e)
    } finally {
      loading.value = false
    }
  }

  const initAuthListener = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback)
  }

  return {
    loading,
    error,
    resetEmailSent,
    registerUser,
    updateUserProfile,
    loginUser,
    logoutUser,
    resetUserPassword,
    initAuthListener
  }
}