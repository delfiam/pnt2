<!-- src/pages/Login.vue -->

<script setup>
import LoginForm from '@/components/LoginForm.vue'
//import { estaLogueado, obtenerUsuarioActual, getRol } from '@/store/auth'
import { useAuthStore } from '@/store/auth' 
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const message = ref("")



const redirigirSegunRol = (usuario) => {
    if (usuario.rol === "cliente") {
        router.push('/cliente')
    } else if (usuario.rol === "admin") {
        router.push('/admin')
    }
}

</script>

<template>
      <div>
      
        <h2 class="text-2xl font-bold mb-6">Iniciar Sesión</h2>
        <p v-if="message">{{ message }}</p>
        <p v-if="auth.currentUser">Usuario: {{ auth.currentUser.username }} ROL: {{ auth.currentUser.rol }}</p>
        <p v-if="auth.error" class="text-red-500">{{ auth.error }}</p>
        <p v-if="auth.success" class="text-green-500">¡Inicio de sesión exitoso!</p>
        <p v-if="auth.loading">Cargando...</p>
        <p v-if="auth.currentUser">Bienvenido, {{ auth.currentUser.username }}!</p>
        <p v-if="auth.currentUser && auth.currentUser.rol === 'admin'">Acceso de administrador concedido.</p>
        <p v-if="auth.currentUser && auth.currentUser.rol === 'cliente'">Acceso de cliente concedido.</p>
        <LoginForm @login-exitoso="redirigirSegunRol" />
        <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
   

      </div>
    <div>
        <h2>Inicar Sesión</h2>
        <p v-if="auth.currentUser">Usuario: {{ auth.currentUser.username }} ROL: {{ auth.currentUser.rol }}</p>
        <LoginForm @login-exitoso="redirigirSegunRol" />
        <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
    </div>
    <div>
    <router-link to='/'>
      <button>IR AL INICIO</button>
    </router-link> 
  </div>
</template>
