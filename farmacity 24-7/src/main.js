import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
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
  //{ path: '/', component: Home },
  { path: '/carrito', component: Carrito },
  { path: '/checkout', component: Checkout },
  { path: '/carritoPagina', component: CarritoPagina },
  { path: '/', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
    { path: '/login', name: 'Login', component: Login },

  {
    path: '/cliente', name: 'Home', component: Home,
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
pinia.use(piniaPluginPersistedstate)

// Crear app y montar
const app = createApp(App)
app.use(pinia)
app.use(router)

const auth = useAuthStore()

// Proteger rutas
router.beforeEach((to, from, next) => {
  auth.loadUserFromLocalStorage() // Esto no retorna nada, solo carga el usuario en el estado

  const usuario = auth.currentUser
if (to.path === '/') {
    if (usuario && usuario.rol === 'admin') {
      return next('/admin')
    } else if (usuario && usuario.rol === 'cliente') {
      return next('/cliente')
    } else {
      return next('/login')
    }
  }
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

app.mount('#app')