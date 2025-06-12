// src/store/auth.js

import { defineStore } from 'pinia'
import { fetchUsers } from '@/services/userService.js'
import { ref } from 'vue'

// utilizando Pinia con axios y haciendo fetch desde mockachino: https://www.mockachino.com/67b72957-8d8b-4d/users
export const useAuthStore = defineStore('auth', {
  state: () => ({
    users: [],
    currentUser: null,
    loading: false,
    error: null
  })
  ,
  actions: {
    async loadUsers() {
      this.loading = true
      this.error = null
      try {
        const data = await fetchUsers();
        this.users = data.users;
        console.log(this.users)
      } catch (error) {
        console.error(`error cargando usuarios: ${error}`)
        this.error = error
      } finally {
        this.loading = false
      }
    },

    async login({username, password}) {
      await this.loadUsers()
      const user = await this.users.find(
        (u) => u.username === username && u.password === password)

      if (!user) {
        this.error = "Credenciales incorrectas"
        return false
      }

      this.currentUser = user
      localStorage.setItem('usuarioActual', JSON.stringify(user))
      return user

    },
    logout() {
      this.currentUser=null
      localStorage.removeItem('usuarioActual')
     },
    loadUserFromLocalStorage() {
      const savedUser = localStorage.getItem('usuarioActual')
      if (savedUser){
        this.currentUser = JSON.parse(savedUser)
      }
     }

  }
}
)

// utilizando LocalStorage como simulación de nalmacenamiento
// const usuarioActual = ref(JSON.parse(localStorage.getItem('usuarioActual')) || null)


// export function login(username, password) {
//   // Recuperar usuarios guardados
//   let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

//   const usuario = usuarios.find(u => u.username === username && u.password === password)

//   if (!usuario) return null

//   usuarioActual.value = usuario
//   localStorage.setItem('usuarioActual', JSON.stringify(usuario))
//   return usuario
// }

// export function logout() {
//   localStorage.removeItem('usuarioActual');
// }

// export function obtenerUsuarioActual() {
//   return JSON.parse(localStorage.getItem('usuarioActual'));
// }

// export function estaLogueado() {
//   return !!localStorage.getItem('usuarioActual');
// }
// export function getRol() {
//   return usuarioActual.rol
// }
