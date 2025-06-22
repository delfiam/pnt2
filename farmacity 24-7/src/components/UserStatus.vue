<template>
  <div class="relative inline-block" @click.stop="toggleDropdown">
    <UserIcon class="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer" />

    <div
      v-if="showDropdown"
      class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
    >
      <div class="px-4 py-3 border-b border-gray-100">
        <p class="text-sm font-semibold text-gray-800">
          Sesión activa como: <strong>{{ auth.currentUser.username }}</strong>
        </p>
      </div>
      <RouterLink
        to="/pedidos"
        class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 !no-underline"
      >
        Mis Pedidos
      </RouterLink>
      <button
        @click="logout"
        class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { UserIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()
const showDropdown = ref(false)

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const logout = async () => {
  await auth.logout()
  router.push('/login')
}

const handleClickOutside = (e) => {
  if (!e.target.closest('.relative')) {
    showDropdown.value = false
  }
}

document.addEventListener('click', handleClickOutside)
</script>

