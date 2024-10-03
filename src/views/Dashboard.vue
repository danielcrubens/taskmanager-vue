<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <div v-if="authStore.user">
      <p>Bem-vindo! Você está logado como: {{ authStore.user.displayName }}</p>
      <button @click="handleLogout">Logout</button>
    </div>
    <div v-else>
      <p>Você não está logado.</p>
      <button @click="() => router.push('/')">Ir para Login</button>
    </div>
  </div>
</template>