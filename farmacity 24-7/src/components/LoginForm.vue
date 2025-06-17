<!-- farmacity 24-7/src/components/LoginForm.vue -->

<script setup>
import { ref } from 'vue'
// // para utilizar con almacenamiento en localStorage
// import { login } from '@/store/auth'

// para utilizar Pinia
import { useAuthStore } from '@/store/auth'
import { Label } from 'reka-ui'
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
  const usuario = await auth.login({username:username.value ,password:password.value})
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
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex flex-col items-center mb-6">
          <img src="../assets/Farmacity_logo.png" alt="Farmacity Logo" class="w-1/5 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mt-2">Ingresar</h2>
          <p className="text-sm text-gray-500 mt-1">Ingresá tu email para acceder a tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Usuario</label>
            <input
              type="text"
              name="user"
            v-model="username"
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
              
            />
          </div>
          <div>
            <div className="flex justify-between items-center">
              <Label className="block text-sm font-medium text-gray-700">Contraseña</Label>
              <a href="#" className="text-sm text-green-600 hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
            <input
            v-model="password" type="password"
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          
        > Ingresar </button>
          
  
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tenés una cuenta? <a href="#" className="text-green-600 hover:underline">Registrate</a>
        </p>
      </div>
    </div>
  <div class="p-4 bg-white">
    
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
      <button @click="iniciarSesion">Iniciar Sesión</button>
      
    </form>
    <p v-if="auth.error" style="color:red">{{ auth.error }}</p>
    <p v-if="auth.currentUser">Logueado como: {{ auth.currentUser.username }} ({{ auth.currentUser.rol }})</p>
  </div>
</template>
