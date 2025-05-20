import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import CarritoPagina from './pages/CarritoPagina.vue'
import { createRouter,createWebHistory } from 'vue-router'
import Carrito from './components/carrito.vue'
import Checkout from './pages/checkout.vue'
import Home from './pages/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/carrito', component: Carrito },
  { path: '/checkout', component: Checkout },
  { path: '/carritoPagina', component: CarritoPagina },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App)
.use(router)
.mount('#app')
