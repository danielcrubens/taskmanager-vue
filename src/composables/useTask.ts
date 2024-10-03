import { ref } from 'vue'
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where 
} from 'firebase/firestore'
import { db } from '../utils/firebase'
import type { Task, NewTask } from '../types/Task'

export function useTask() {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const handleError = (message: string, e: any) => {
    error.value = message
    console.error(e)
    throw e
  }

  const fetchUserTasks = async (userId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', userId)
      )
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      })) as Task[]
    } catch (e) {
      handleError('Failed to fetch tasks', e)
    } finally {
      isLoading.value = false
    }
  }

  const createTask = async (newTask: NewTask, userId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      const taskData = {
        ...newTask,
        status: 'pending',
        createdAt: new Date(),
        userId
      }
      
      const docRef = await addDoc(collection(db, 'tasks'), taskData)
      
      return {
        id: docRef.id,
        ...taskData
      } as Task
    } catch (e) {
      handleError('Failed to add task', e)
    } finally {
      isLoading.value = false
    }
  }

  const updateTaskInDb = async (taskId: string, updates: Partial<Task>) => {
    isLoading.value = true
    error.value = null
    
    try {
      const taskRef = doc(db, 'tasks', taskId)
      await updateDoc(taskRef, updates)
      return updates
    } catch (e) {
      handleError('Failed to update task', e)
    } finally {
      isLoading.value = false
    }
  }

  const deleteTaskFromDb = async (taskId: string) => {
    isLoading.value = true
    error.value = null
    
    try {
      await deleteDoc(doc(db, 'tasks', taskId))
    } catch (e) {
      handleError('Failed to delete task', e)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    error,
    fetchUserTasks,
    createTask,
    updateTaskInDb,
    deleteTaskFromDb
  }
}