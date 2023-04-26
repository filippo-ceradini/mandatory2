import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import SignUpView from "@/views/SignUpView";
import ContactView from "@/views/ContactView";
import FourView from "@/views/404View"

const routes = [
  { path: '/login', component: LoginView },
  { path: '/signup', component: SignUpView },
  { path: '/', component: HomeView, meta: { requiresAuth: true } },
  { path: '/contact', component: ContactView, },
  { path: '/:catchAll(.*)', component: FourView }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (to.meta.requiresAuth && !user) {
    next('/login')
  } else {
    next()
  }
})

export default router
