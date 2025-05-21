<script setup>
import LoginForm from '@/components/LoginForm.vue'
import { estaLogueado, obtenerUsuarioActual, getRol } from '@/store/auth'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const message = ref("")

onMounted(() => {
    if (estaLogueado()) {
        const usuario = obtenerUsuarioActual()
        message.value = `Sesión ya iniciada como: ${usuario.username} / ${usuario.rol}`
        redirigirSegunRol(usuario)
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
