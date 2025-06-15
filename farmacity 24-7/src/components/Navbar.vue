<template>
  <nav class="relative bg-white shadow-md px-4 py-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <RouterLink to="/"
            class="block px-4 py-2  text-sm text-gray-800 font-semibold text-lg hover:text-green-600">
        
        <img src="../assets/Farmacity_logo.png" alt="Logo" class="logo" />
   </RouterLink>
    </div>


    <div class="flex items-center gap-4">
      <div class="relative" @click="toggleDropdown" v-if="!auth.currentUser">
        <button class="text-gray-700 hover:text-green-600 font-medium focus:outline-none">
          Ingresar
        </button>
        <div v-if="showDropdown" class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
          <RouterLink to="/Login"
            class="block px-4 py-2  text-sm text-gray-800 font-semibold text-lg hover:text-green-600">Iniciar sesión
          </RouterLink>
          <RouterLink to="/Register" class="block px-4 py-2 text-sm font-semibold text-lg hover:text-green-600">
            Registrarse</RouterLink>
        </div>
      </div>


      <div @click="$emit('toggle-carrito')" class="text-2xl text-gray-700 hover:text-green-600 cursor-pointer">
        🛒
      </div>
      <div class="hidden md:block">
        <UserStatus />
      </div>

    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import UserStatus from '@/components/UserStatus.vue'
import { useAuthStore } from '@/store/auth'

const auth=useAuthStore()
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}


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