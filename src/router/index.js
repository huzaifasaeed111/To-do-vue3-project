import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Auth/Login.vue';
import Signup from '../components/Auth/Signup.vue';
import Todo from '../components/Todo.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/todo',
      name: 'Todo',
      component: Todo
    }
  ]
})

export default router
