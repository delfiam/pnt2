import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import { createRouter,createWebHistory } from 'vue-router'
import Carrito from './pages/Carrito.vue'

const routes = [
    {path:'/', component: Home},
    {path:'/carrito',component: Carrito}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


createApp(App)
.use(router)
.mount('#app')