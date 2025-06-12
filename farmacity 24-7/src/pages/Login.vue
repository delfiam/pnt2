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
