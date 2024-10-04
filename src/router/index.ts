import { createRouter, createWebHistory, RouteRecordRaw    } from 'vue-router'
import { useAuthStore } from '@/stores/auth'


const routes:Array<RouteRecordRaw>  = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresGuest: true }
},
  {
    path: '/tasks',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
  path: '/forgot-password',
  name: 'Forgot',
  component: () => import('../views/Forgot.vue'),
  meta: { requiresGuest: true }
},

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.user) {
    next('/')
  } else if (to.meta.requiresGuest && authStore.user) {
    next('/tasks')
  } else {
    next()
  }
})

export default router