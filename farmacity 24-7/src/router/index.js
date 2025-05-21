import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'
import Cliente from '@/pages/Cliente.vue'
import Admin from '@/pages/Admin.vue'
import { obtenerUsuarioActual } from '@/store/auth'

const routes = [
  { path: '/', name: 'Home', component: Landing},
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/cliente', name: 'Cliente', component: Cliente,
    meta: {autorizacion: true, rol: ['cliente', 'admin']}
  },
  { path: '/admin', name: 'Admin', component: Admin,
    meta: {autorizacion: true, rol: ['admin']}
   }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
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

export default router
