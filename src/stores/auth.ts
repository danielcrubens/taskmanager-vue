import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User as FirebaseUser } from 'firebase/auth';
import { useAuth } from '../composables/useAuth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<FirebaseUser | null>(null); 
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
  } = useAuth();

  const init = () => {
    initAuthListener((firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
      } else {
        user.value = null; 
      }
    });
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser = await registerUser(email, password);
      if (newUser) {
        await updateUserProfile(newUser, name);
        user.value = newUser;
      }
    } catch (e) {
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const loggedUser = await loginUser(email, password);
      if (loggedUser) {
        user.value = loggedUser;
      }
    } catch (e) {
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      user.value = null;
    } catch (e) {
    }
  };

  const resetPassword = async (email: string) => {
    await resetUserPassword(email);
  };

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
  };
});
