<template>
  <header class="bg-dark text-white  px-4 py-5  shadow-md">
    <div class=" lg:w-11/12 mx-auto ">
      <div class="flex items-center justify-between w-full" v-if="authStore.user">
        <p>Bem-vindo! <span class="font-bold px-2"> {{ authStore.user.displayName }}</span></p>
        <button
          class="bg-orange gap-3 hover:brightness-90 text-white flex items-center justify-center  rounded-md py-2 px-5 lg:px-12"
          @click="handleLogout"> <span class="hidden lg:block">Sair</span>
          <LogOut :size="20" />
        </button>
      </div>
      <div class="flex items-center justify-between w-full" v-else>
        <p>Você não está logado.</p>
        <button
          class="bg-dark gap-3 hover:brightness-125 text-white flex items-center justify-center  rounded-md py-2 px-12"
          @click="() => router.push('/')">Ir para Login</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { LogOut } from 'lucide-vue-next';
const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}
</script>