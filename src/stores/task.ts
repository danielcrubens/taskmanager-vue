import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, NewTask } from '../types/Task'
import { useTask } from '../composables/useTask'
import { useAuthStore } from './auth'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref<Task[]>([])
  const authStore = useAuthStore()
  const { 
    isLoading, 
    error, 
    fetchUserTasks, 
    createTask, 
    updateTaskInDb, 
    deleteTaskFromDb 
  } = useTask()

  const pendingTasks = computed(() => 
    tasks.value.filter(task => task.status === 'pending')
  )

  const completedTasks = computed(() => 
    tasks.value.filter(task => task.status === 'completed')
  )

  async function fetchTasks() {
    if (!authStore.user) return
    
    const fetchedTasks = await fetchUserTasks(authStore.user.uid)
    if (fetchedTasks) {
      tasks.value = fetchedTasks
    }
  }

  async function addTask(newTask: NewTask) {
    if (!authStore.user) return
    
    const createdTask = await createTask(newTask, authStore.user.uid)
    if (createdTask) {
      tasks.value.push(createdTask)
    }
  }

  async function updateTask(taskId: string, updates: Partial<Task>) {
    const updatedData = await updateTaskInDb(taskId, updates)
    if (updatedData) {
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updatedData }
      }
    }
  }

  async function deleteTask(taskId: string) {
    await deleteTaskFromDb(taskId)
    tasks.value = tasks.value.filter(t => t.id !== taskId)
  }

  async function toggleTaskStatus(taskId: string) {
    const task = tasks.value.find(t => t.id === taskId)
    if (!task) return
    
    const newStatus = task.status === 'pending' ? 'completed' : 'pending'
    await updateTask(taskId, { status: newStatus })
  }

  return {
    tasks,
    pendingTasks,
    completedTasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus
  }
})