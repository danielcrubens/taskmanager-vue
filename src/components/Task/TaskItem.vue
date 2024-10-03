<template>
  <div class="py-3 rounded-lg">
    <div class="border-solid border-2 text-dark border-zinc-300 shadow-md rounded-md p-4">
      <div class="flex items-center justify-between  p-1 rounded-md">
        <div class="flex items-center">
          <input type="checkbox" :checked="task.status === 'completed'" @change="handleToggleStatus"
            class="size-4 border-solid border-2 border-zinc-300 rounded-md accent-orange" />
          <span v-if="!isEditing" :class="{ 'line-through': task.status === 'completed' }"
            class="ml-2 text-lg font-medium capitalize">
            {{ task.title }}
          </span>
          <input v-else v-model="editedTitle" class="ml-2 p-1 outline-none border-b-2 border-zinc-300 text-dark" />
        </div>

        <div class="flex gap-3">
          <FilePenLine v-if="!isEditing" @click="handleEdit" class="cursor-pointer" color="blue" :size="20" />
          <Save v-else @click="handleSave" class="cursor-pointer" color="#25a677" :size="20" />
          <Trash2 @click="handleDelete" class="cursor-pointer" color="red" :size="20" />
        </div>

      </div>
      <div class="px-1 py-3">
        <p v-if="!isEditing">{{ task.description }}</p>
        <textarea v-else v-model="editedDescription" class="w-full p-2 border-2 border-solid border-zinc-300 rounded-md text-dark outline-none"
          placeholder="Descreva sua tarefa" />
      </div>

      <div class="p-1 text-white font-medium text-sm flex justify-end">
        <small class="bg-dark p-1 rounded">Criado em: {{ new Date(task.createdAt).toLocaleString() }}</small>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Task } from '@/types/Task';
import { useTaskStore } from '@/stores/task';
import { Trash2, FilePenLine, Save } from 'lucide-vue-next';

const props = defineProps<{
  task: Task;
}>();

const taskStore = useTaskStore();
const isEditing = ref(false);
const editedTitle = ref(props.task.title);
const editedDescription = ref(props.task.description);

const handleToggleStatus = () => {
  taskStore.toggleTaskStatus(props.task.id);
};

const handleDelete = () => {
  taskStore.deleteTask(props.task.id);
};

const handleEdit = () => {
  isEditing.value = true;
};

const handleSave = async () => {
  await taskStore.updateTask(props.task.id, {
    title: editedTitle.value,
    description: editedDescription.value
  });
  isEditing.value = false;
};
</script>