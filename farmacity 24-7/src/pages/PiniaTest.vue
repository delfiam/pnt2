<!-- src/pages/PiniaTest.vue -->
<template>
  <div class="container">
    <h2>Test de Pinia - Auth Store</h2>

    <section>
      <h3>Usuarios cargados:</h3>
      <button @click="cargarUsuarios">Cargar Usuarios</button>
      <ul>
        <li v-for="user in auth.users" :key="user.id">
          {{ user.username }} - {{ user.rol }}
        </li>
      </ul>
    </section>

    <section>
      <h3>Login</h3>
      <input v-model="username" placeholder="Usuario" />
      <input v-model="password" type="password" placeholder="Contraseña" />
      <button @click="iniciarSesion">Iniciar Sesión</button>
      <p v-if="auth.error" style="color:red">{{ auth.error }}</p>
      <p v-if="auth.currentUser">Logueado como: {{ auth.currentUser.username }} ({{ auth.currentUser.rol }})</p>
    </section>

    <section>
      <h3>Sesión</h3>
      <button @click="verificarSesion">Cargar desde LocalStorage</button>
      <button @click="cerrarSesion">Cerrar sesión</button>
      <p v-if="auth.currentUser">Usuario actual: {{ auth.currentUser.username }}</p>
    </section>

    <router-link to="/">← Volver al inicio</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const username = ref('')
const password = ref('')

const cargarUsuarios = async () => {
  await auth.loadUsers()
}

const iniciarSesion = async () => {
  await auth.login({ username: username.value, password: password.value })
}

const verificarSesion = () => {
  auth.loadUserFromLocalStorage()
}

const cerrarSesion = () => {
  auth.logout()
}
</script>

<style scoped>
.container {
  padding: 1rem;
  font-family: sans-serif;
}
input {
  margin: 0.25rem;
}
</style>