<template>
  <DialogClose class="absolute top-3.5 right-3.5 inline-flex items-center justify-center" aria-label="Close">
    <X :size="17" class="text-zinc-600" />
  </DialogClose>
  <DialogTitle class="text-center font-semibold">
    <div class="flex gap-2 items-center justify-center">
      <h1 class="text-dark text-2xl font-bold">
        {{ isRegistering ? 'Crie sua conta' : 'Login' }}
      </h1>
      <UserPen v-if="isRegistering" :size="23" class="text-zinc-600" />
      <LogIn v-else :size="23" class="text-zinc-600" />
    </div>
  </DialogTitle>

  <RegisterForm v-if="isRegistering" @toggleForm="toggleForm" />
  <LoginForm v-else @toggleForm="toggleForm" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DialogClose, DialogTitle } from 'radix-vue'
import { X, UserPen, LogIn } from "lucide-vue-next"
import RegisterForm from '@/components/Forms/RegisterForm.vue'
import LoginForm from '@/components/Forms/LoginForm.vue'

const isRegistering = ref(false)

const toggleForm = () => {
  isRegistering.value = !isRegistering.value
}
</script>
