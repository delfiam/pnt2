<template>
    <nav class="bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <!-- Logo + Links -->
      <div class="flex items-center gap-6">
        <!-- Icono -->
        <div class="text-xl font-bold text-green-600 flex items-center gap-2">
          🏥
          <span class="hidden sm:inline">FarmApp</span>
        </div>
  
        <!-- Links -->
        <RouterLink to="/" class="text-gray-700 hover:text-green-600 font-medium">
          Home
        </RouterLink>
        <RouterLink to="/farmacity" class="text-gray-700 hover:text-green-600 font-medium">
          Farmacity 24/7
        </RouterLink>
      </div>
  
      <!-- Login/Carrito -->
      <div class="flex items-center gap-4">
        <!-- Dropdown Login/Register -->
        <div class="relative" @click="toggleDropdown">
          <button class="text-gray-700 hover:text-green-600 font-medium focus:outline-none">
            Login / Registrarse
          </button>
          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Iniciar sesión</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Registrarse</a>
          </div>
        </div>
  
        <!-- Carrito -->
        <RouterLink to="/carrito" class="text-2xl text-gray-700 hover:text-green-600">
          🛒
        </RouterLink>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  const showDropdown = ref(false)
  const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
  }
  
  // Cierra el dropdown si hacés clic afuera
  document.addEventListener('click', (e) => {
    if (!(e.target.closest('nav'))) {
      showDropdown.value = false
    }
  })
  </script>
  