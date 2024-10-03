<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-4 relative">
      <input id="email" v-model="email"
        class="my-3 w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
        placeholder="Insira seu e-mail">
      <p v-if="errorEmail" class="text-red-500 text-sm absolute -bottom-2">{{ errorEmail }}</p>
    </div>

    <div class="mb-4 relative">
      <input id="password" v-model="password"
        class="my-3 w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
        type="password" placeholder="Insira sua senha">
      <p v-if="errorPassword" class="text-red-500 text-sm absolute -bottom-2">{{ errorPassword }}</p>
    </div>

    <button
      class="bg-dark hover:brightness-125 text-white flex items-center justify-center mx-auto rounded-md py-2 px-12"
      type="submit" :disabled="authStore.loading">
      {{ authStore.loading ? 'Loading...' : 'Entrar' }}
    </button>

    <p class="text-sm text-dark pt-2">Não tem uma conta? <span @click="$emit('toggleForm')"
        class="cursor-pointer font-medium">Cadastre-se</span></p>
    <p class="text-sm text-dark">Esqueceu sua senha? <span class="font-medium"><router-link to="/forgot-password">Clique
          aqui</router-link></span></p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const errorEmail = ref('')
const errorPassword = ref('')

const clearErrors = () => {
  errorEmail.value = ''
  errorPassword.value = ''
}

const emailSchema = z.string().email('Insira um e-mail válido')
const passwordSchema = z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')

const validateField = (schema: z.ZodType<any>, value: string): boolean => {
  try {
    schema.parse(value)
    return true
  } catch (error) {
    return false
  }
}

const handleLogin = async () => {
  clearErrors()
  let isValid = true

  if (!validateField(emailSchema, email.value)) {
    errorEmail.value = 'Insira um e-mail válido'
    isValid = false
  }

  if (!validateField(passwordSchema, password.value)) {
    errorPassword.value = 'A senha deve ter pelo menos 6 caracteres'
    isValid = false
  }

  if (isValid) {
    try {
      await authStore.login(email.value, password.value)
      if (!authStore.error) {
        router.push('/tasks')
      } else {
        errorEmail.value = authStore.error
      }
    } catch (error) {
      errorEmail.value = 'Erro ao fazer login'
    }
  }
}
</script>
