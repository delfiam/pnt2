// src/store/auth.js

import { ref } from 'vue'

const usuarioActual = ref(JSON.parse(localStorage.getItem('usuarioActual')) || null)


export function login( username, password) {
    // Recuperar usuarios guardados
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const usuario = usuarios.find(u => u.username === username && u.password === password)

  if (!usuario) return null

  usuarioActual.value = usuario
  localStorage.setItem ('usuarioActual', JSON.stringify(usuario))
  return usuario
}

export function logout() {
  localStorage.removeItem('usuarioActual');
}

export function obtenerUsuarioActual() {
  return JSON.parse(localStorage.getItem('usuarioActual'));
}

export function estaLogueado() {
  return !!localStorage.getItem('usuarioActual');
}
export function getRol(){
  return usuarioActual.rol
}