<!-- src/pages/Login.vue -->

<script setup>
import LoginForm from '@/components/LoginForm.vue'
//import { estaLogueado, obtenerUsuarioActual, getRol } from '@/store/auth'
import useAuthStore from '@/store/auth' 
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const message = ref("")

onMounted(() => {
    auth.loadUserFromLocalStorage()
    if (auth.currentUser()) {
        const usuario = obtenerUsuarioActual()
        message.value = `Sesión ya iniciada como: ${auth.currentUser.username} / ${auth.currentUser.rol}`
        redirigirSegunRol(auth.currentUser)
    }
})

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
        <p v-if="message">{{ message }} </p>
        <LoginForm @login-exitoso="redirigirSegunRol" />
        <p>¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
    </div>
    <div>
    <router-link to='/'>
      <button>IR AL INICIO</button>
    </router-link> 
  </div>
</template>
