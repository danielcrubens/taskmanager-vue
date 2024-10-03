<template>
  <div class="lg:w-8/12 px-4 lg:px-0 mx-auto py-12">
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="flex lg:gap-9">
        <input
          class="w-full rounded-md border-solid shadow-md border-2 text-dark border-zinc-300 p-2.5 text-md outline-none"
          id="title" v-model="title" required placeholder="Adicione uma nova tarefa" />

        <button
          class="bg-dark hover:brightness-125 gap-3 text-white flex items-center justify-center mx-auto rounded-md py-2 px-5 lg:px-12"
          type="submit">
          <CircleCheckBig :size="20"/>
         <span class="hidden lg:block"> Criar</span>
        </button>

      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task';
import { CircleCheckBig } from 'lucide-vue-next';


const taskStore = useTaskStore();
const title = ref('');
const description = ref('');

const handleSubmit = async () => {
  if (!title.value.trim()) return;

  await taskStore.addTask({
    title: title.value,
    description: description.value
  });

  title.value = '';
  description.value = '';
};
</script>
