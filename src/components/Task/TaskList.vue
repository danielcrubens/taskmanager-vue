<script setup lang="ts">
import { onMounted } from 'vue';
import { useTaskStore } from '@/stores/task';
import TaskItem from './TaskItem.vue';
import TaskForm from './TaskForm.vue';

import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'radix-vue'
const taskStore = useTaskStore();

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<template>
  <div class="p-4 lg:w-10/12 mx-auto">
    <div v-if="taskStore.tasks.length === 0" class="text-center mb-8">
      <img src="@/assets/images/notask.svg" class="lg:w-64 w-48 mx-auto py-10" alt="task manager" />
      <p class="text-dark font-semibold leading-relaxed text-center mb-4">
        Você ainda não tem nenhuma tarefa cadastrada
      </p>
    </div>

    <div v-else>
      <TabsRoot default-value="Todos" class="w-full">
        <TabsList class="mb-4 flex lg:space-x-7 space-x-2 rounded-md bg-muted p-1">
          <TabsTrigger v-for="tab in ['Todos', 'Pendentes', 'Completos']" :key="tab" :value="tab"
            class="w-full rounded-md py-2.5 text-sm font-medium leading-5 bg-zinc-200 hover:brightness-95 text-dark text-md"
            :class="{ 'bg-red-500 text-foreground shadow': modelValue === tab }">
            {{ tab }}
            ({{
              tab === 'Todos'
                ? taskStore.tasks.length
                : tab === 'Pendentes'
                  ? taskStore.pendingTasks.length
                  : taskStore.completedTasks.length
            }})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Todos">
          <TaskItem v-for="task in taskStore.tasks" :key="task.id" :task="task" />
        </TabsContent>

        <TabsContent value="Pendentes">
          <div v-if="taskStore.pendingTasks.length === 0" class="text-center">
            <img src="@/assets/images/pedingtask.svg" class="lg:w-64 w-48 mx-auto py-10" alt="task manager" />
            <p class="text-dark font-semibold leading-relaxed text-center">
              Você ainda não tem tarefas pendentes
            </p>
          </div>
          <TaskItem v-else v-for="task in taskStore.pendingTasks" :key="task.id" :task="task" />
        </TabsContent>

        <TabsContent value="Completos">
          <div v-if="taskStore.completedTasks.length === 0" class="text-center">
            <img src="@/assets/images/completedtask.svg" class="lg:w-44 w-32 mx-auto py-10" alt="task manager" />
            <p class="text-dark font-semibold leading-relaxed text-center">
              Você ainda não tem tarefas finalizadas
            </p>
          </div>
          <TaskItem v-else v-for="task in taskStore.completedTasks" :key="task.id" :task="task" />
        </TabsContent>
      </TabsRoot>
    </div>
  </div>
</template>