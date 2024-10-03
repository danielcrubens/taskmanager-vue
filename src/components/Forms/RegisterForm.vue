<template>
  <form @submit.prevent="handleRegister">
    <div class="mb-5 relative">
      <input id="name" v-model="name"
        class="mt-3 w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
        type="text" placeholder="Insira seu nome" />
      <p v-if="errorName" class="text-red-500 text-sm absolute -bottom-4">{{ errorName }}</p>
    </div>

    <div class="mb-5 relative">
      <input id="email" v-model="email"
        class="w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
        type="email" placeholder="Insira seu melhor e-mail" />
      <p v-if="errorEmail" class="text-red-500 text-sm absolute -bottom-4">{{ errorEmail }}</p>
    </div>

    <div class="mb-5 relative">
      <input id="password" v-model="password"
        class="w-full rounded-md border-solid border-2 text-dark border-zinc-300 p-2.5 text-md shadow-sm outline-none"
        type="password" placeholder="Insira uma senha" />
      <p v-if="errorPassword" class="text-red-500 text-sm absolute -bottom-4">{{ errorPassword }}</p>
    </div>

    <button
      class="bg-dark hover:brightness-125 text-white flex items-center justify-center mx-auto rounded-md gap-3 py-2 px-12"
      type="submit" :disabled="authStore.loading">
      {{ authStore.loading ? 'Loading...' : 'Criar conta' }}
    </button>

    <p class="text-sm text-dark pt-2">
      Já tem uma conta?
      <span @click="$emit('toggleForm')" class="cursor-pointer font-medium">Entrar</span>
    </p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const name = ref('')
const email = ref('')
const password = ref('')
const errorName = ref('')
const errorEmail = ref('')
const errorPassword = ref('')

const authStore = useAuthStore()
const router = useRouter()

const clearErrors = () => {
  errorName.value = ''
  errorEmail.value = ''
  errorPassword.value = ''
}

const nameSchema = z.string().min(3, 'O nome deve ter pelo menos 3 caracteres')
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

const handleRegister = async () => {
  clearErrors()
  let isValid = true

  if (!validateField(nameSchema, name.value)) {
    errorName.value = 'O nome deve ter pelo menos 3 caracteres'
    isValid = false
  }

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
      await authStore.register(name.value, email.value, password.value)
      if (!authStore.error) {
        router.push('/tasks')
      } else {
        errorEmail.value = authStore.error
      }
    } catch (error) {
      errorEmail.value = 'Erro ao registrar'
    }
  }
}
</script>
