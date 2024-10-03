<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth' 
import { useRouter } from 'vue-router'
import { useToast } from "vue-toastification"

const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()
const email = ref('')

const sendPasswordReset = async () => {
  try {
    await authStore.resetPassword(email.value)
    if (authStore.resetEmailSent) {
      toast.success("E-mail de recuperação enviado com sucesso!", {
        timeout: 3700,
        position: "top-right",
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        closeButton: false,
      })
    }
  } catch (error) {
    toast.error(authStore.error || "Erro ao enviar e-mail de recuperação", {
      timeout: 3700,
      position: "top-right",
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      closeButton: false,
    })
  } finally {
    email.value = ''
  }
}
</script>

<template>
  <div>
    <div class="h-screen flex flex-col items-center justify-center gap-8">
      <h1 class="text-dark text-2xl font-bold">Redefinir sua senha</h1>
      <p class="text-slate-800 font-semibold leading-relaxed max-w-80 text-center">
        Digite seu e-mail e nós lhe enviaremos um link para redefinir sua senha
      </p>
      <img src="@/assets/images/forgot.svg" class="lg:w-96 w-64" alt="forgot password" />
      
      <div class="lg:w-3/12 w-11/12">
        <form @submit.prevent="sendPasswordReset">
          <input 
            class="my-3 w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
            v-model="email" 
            type="email"
            placeholder="seu@email.com" 
            required 
          />
          <button 
            class="bg-dark hover:brightness-125 text-white flex items-center justify-center mx-auto rounded-md gap-3 py-2 px-12"
            type="submit"
            :disabled="authStore.loading"
          >
            {{ authStore.loading ? 'Enviando...' : 'Redefinir Senha' }}
          </button>
          <p class="text-sm text-dark text-center py-2">Já tem uma conta? <span class="font-medium"> <router-link to="/">Entrar</router-link></span></p>
        </form>
      </div>
    </div>
  </div>
</template>