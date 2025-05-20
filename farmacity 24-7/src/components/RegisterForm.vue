
<!-- farmacity 24-7/src/components/RegisterForm.vue -->

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const mensaje = ref('')
const passwordConf = ref('')

function registrar() {
  if (!username.value || !password.value || !passwordConf.value)  {
    mensaje.value = 'Por favor completa todos los campos'
    return
  }
  if (password.value !== passwordConf.value)  {
    mensaje.value = 'La contraseña no coincide'
    return
  }

  // Recuperar usuarios guardados
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  // Verificar si ya existe el usuario
  const existe = usuarios.some(u => u.username === username.value)
  if (existe) {
    mensaje.value = 'El usuario ya existe'
    return
  }

  // Agregar nuevo usuario
  usuarios.push({ username: username.value, password: password.value, rol: 'cliente', carrito: [] })
  localStorage.setItem('usuarios', JSON.stringify(usuarios))

  mensaje.value = 'Usuario registrado con éxito!'
  // Limpiar formulario
  username.value = ''
  password.value = ''
  passwordConf.value = ""
}
</script>

<template>
  <div>
    <h2>Registro de usuario</h2>
    <form @submit.prevent="registrar">
      <label>
        Usuario:
        <input v-model="username" type="text" />
      </label><br />
      <label>
        Contraseña:
        <input v-model="password" type="password" />
      </label><br />
      <label>
        Confirma Contraseña:
        <input v-model="passwordConf" type="password" />
      </label><br />
      <button type="submit">Registrar</button>
    </form>
    <p>{{ mensaje }}</p>
  </div>
</template>
