import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import CarritoPagina from './pages/CarritoPagina.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Carrito from './components/carrito.vue'
import Checkout from './pages/checkout.vue'
import Home from './pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Cliente from '@/pages/Cliente.vue'
import Admin from '@/pages/Admin.vue'
import { obtenerUsuarioActual } from '@/store/auth'
//pinia
import {createPinia} from 'pinia'

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
  }
]
const pinia =createPinia()


const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to,fron,next)=>{
  const usuario = obtenerUsuarioActual()

  if (!to.meta.autorizacion){
    return next()
  }

  if (!usuario){
    return next('/login')
  }

  if (to.meta.rol && to.meta.rol.includes(usuario.rol)) {
    return next()
  }

  return next('/login')

})

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
  
