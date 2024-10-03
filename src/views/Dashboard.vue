<template>
  <section>
    <Header />
    <TaskForm />
    <TaskList />
  </section>
</template>

<script setup lang="ts">
import TaskForm from '@/components/Task/TaskForm.vue';
import TaskList from '@/components/Task/TaskList.vue';
import TaskItem from '@/components/Task/TaskItem.vue';
import Header from '@/components/Header.vue';
</script>