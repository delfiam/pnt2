<template>
    <nav class="relative bg-white shadow-md px-4 py-3 flex items-center justify-between">
      <!-- IZQUIERDA: Logo -->
      <div class="flex items-center gap-2">
        <a href="https://www.farmacity.com">
          <img src="../../assets/Farmacity_logo.png" alt="Logo" class="logo" />
        </a>
      </div>
  
      <!-- CENTRO: Farmacity 24/7 (posición absoluta centrada) -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <RouterLink to="/" class="text-gray-800 font-semibold text-lg hover:text-green-600">
          Farmacity 24/7
        </RouterLink>
      </div>
  
      <!-- DERECHA: Login / Carrito -->
      <div class="flex items-center gap-4">
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
  
       <div @click="$emit('toggle-carrito')" class="text-2xl text-gray-700 hover:text-green-600 cursor-pointer">
  🛒
</div>
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
  <style scoped>
    .logo {
        width: 30%;
    }
    .logo:hover {
        transform: scale(1.1);
        transition: transform 0.2s;
    }
    .logo:active {
        transform: scale(1);
        transition: transform 0.2s;
    }
    </style>