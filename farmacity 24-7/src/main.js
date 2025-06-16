import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import CarritoPagina from './pages/CarritoPagina.vue'
import Carrito from './components/carrito.vue'
import Checkout from './pages/checkout.vue'
import Home from './pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Cliente from '@/pages/Cliente.vue'
import Admin from '@/pages/Admin.vue'
import PiniaTest from './pages/PiniaTest.vue'
import { useAuthStore } from './store/auth'
import TestCarrito from './pages/TestCarrito.vue'
import PedidosView from './pages/PedidosView.vue'


// Definir rutas
const routes = [
  { path: '/', component: Home },
  { path: '/carrito', component: Carrito },
  { path: '/checkout', component: Checkout },
  { path: '/carritoPagina', component: CarritoPagina },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  {
    path: '/cliente', name: 'Cliente', component: Cliente,
    meta: { autorizacion: true, rol: ['cliente', 'admin'] }
  },
  {
    path: '/admin', name: 'Admin', component: Admin,
    meta: { autorizacion: true, rol: ['admin'] }
  }, 
  { path: '/pinia-test', name: 'PiniaTest', component: PiniaTest },
  { path: '/testCarrito', name: 'TestCarrito', component: TestCarrito },
  { path: '/pedidos', name: 'Pedidos', component: PedidosView }
]

// Crear router y pinia
const router = createRouter({
  history: createWebHistory(),
  routes
})
const pinia = createPinia()

// Crear app y montar
const app = createApp(App)
app.use(pinia)
app.use(router)

// ⚠️ Después de montar Pinia, podés usar la store
const auth = useAuthStore()

// Proteger rutas
router.beforeEach((to, from, next) => {
  auth.loadUserFromLocalStorage() // Esto no retorna nada, solo carga el usuario en el estado

  const usuario = auth.currentUser

  if (!to.meta.autorizacion) {
    return next()
  }

  if (!usuario) {
    return next('/login')
  }

  if (to.meta.rol && to.meta.rol.includes(usuario.rol)) {
    return next()
  }

  return next('/login')
})

// Finalmente montás la app
app.mount('#app')