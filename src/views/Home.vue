<template>
  <div class=" h-screen flex flex-col items-center justify-center gap-8">
    <img src="@/assets/images/task.svg" class="lg:w-96 w-64" alt="task manager" />
    <p class="text-slate-800 font-semibold leading-relaxed max-w-80 text-center">Você ainda não cadastrou nenhuma
      tarefa, que tal
      cadastrar uma agora mesmo?</p>

    <DialogRoot>

      <DialogTrigger>
        <button type="button" class="bg-orange hover:brightness-90 text-white font-medium flex items-center gap-3 rounded-md py-2 px-12">
          <BookmarkCheck :size="20"/>Cadastrar 
        </button>
      </DialogTrigger>
      <DialogOverlay class="fixed inset-0 z-[99] bg-black bg-opacity-50 backdrop-blur-sm" />
      <DialogContent
        class="fixed p-5 rounded-md shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white max-h-[85vh] w-[90vw] max-w-[450px] z-[100]">
        <Register />
      </DialogContent>
    </DialogRoot>
  </div>
</template>




<script setup>
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'radix-vue'
import { BookmarkCheck  , X } from "lucide-vue-next";
import Register from '@/views/Register.vue'
</script>