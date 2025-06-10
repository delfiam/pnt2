<!-- farmacity 24-7/src/components/LoginForm.vue -->

<script setup>
import { ref } from 'vue'
// // para utilizar con almacenamiento en localStorage
// import { login } from '@/store/auth'

// para utilizar Pinia
import { useAuthStore } from '@store/auth.js'

const auth = useAuthStore()
const emit = defineEmits(['login-exitoso'])
const username = ref('')
const password = ref('')
const mensaje = ref('')

// login con Pinia
async function handleLogin() {
  if (!username.value || !password.value) {
    mensaje.value = 'Por favor completa todos los campos'
    return
  }
  const usuario = await auth.login({
    username: username.value,
    password: password.value
  })
  if (!usuario) {
    mensaje.value = `Usuario o contraseña incorrecto`
    return
  }
  mensaje.value = `Bienvenido a Farmacity 24-7, ${usuario.username}`
  emit('login-exitoso', usuario)

}

// // login con localStorage
// function handleLogin() {
//   if (!username.value || !password.value) {
//     mensaje.value = 'Por favor completa todos los campos'
//     return
//   }

//   const usuario = login(username.value, password.value)

//   if (!usuario) {
//     mensaje.value = 'Usuario o contraseña incorrectos'
//     // username.value=""
//     // password.value = ""
//     return
//   }

// mensaje.value = `Bienvenido a Farmacity 24-7, ${usuario.username}`
// emit('login-exitoso', usuario)
// }
</script>

<template>
  <div>
    <h2>Login de usuario</h2>
    <form @submit.prevent="handleLogin">
      <label>
        Usuario:
        <input v-model="username" type="text" />
      </label><br />
      <label>
        Contraseña:
        <input v-model="password" type="password" />
      </label><br />
      <button type="submit">Enviar</button>
    </form>
    <p>{{ mensaje }}</p>
  </div>
</template>
