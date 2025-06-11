<!-- src/components/UserStatus.vue -->
<script setup>
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <div class="bg-gray-100 p-4 rounded shadow text-sm flex items-center justify-between">
    <div>
      <p v-if="auth.currentUser">
        Sesión activa como: <strong>{{ auth.currentUser.username }}</strong> /
        Rol: <strong>{{ auth.currentUser.rol }}</strong>
      </p>
      <p v-else>
        Usuario: <em>Anónimo</em>
      </p>
    </div>
    
    <button
      v-if="auth.currentUser"
      @click="logout"
      class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Cerrar sesión
    </button>
  </div>
</template>