<template>
  <nav class="bg-white shadow-md w-full">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <RouterLink to="/" class="flex-shrink-0">
        <img
          src="../assets/Farmacity_logo.png"
          alt="Logo"
          class="h-8"
        />
      </RouterLink>
      
        <div class="flex items-center space-x-4 gap-6">
        <ShoppingCartIcon
          v-if="!isCheckout && !isAdmin"
          @click="$emit('toggle-carrito')"
          class="w-6 h-6 text-gray-700 hover:text-green-600 cursor-pointer"
        />
      
        <RouterLink v-if="isAdmin"
        to="/admin"
         class="block px-4 py-2 text-sm !text-gray-700 hover:!text-gray-900 hover:bg-gray-50 !no-underline"
  active-class="!text-gray-700"
  exact-active-class="!text-gray-700"
      >
      <ChartBarIcon class="w-6 h-6 text-gray-700 hover:text-green-600" />
        </RouterLink>
 <RouterLink v-if="isAdmin"
        to="/admin/medicamentos"
         class="block px-4 py-2 text-sm !text-gray-700 hover:!text-gray-900 hover:bg-gray-50 !no-underline"
  active-class="!text-gray-700"
  exact-active-class="!text-gray-700"
      >
      <ArchiveBoxIcon class="w-6 h-6 text-gray-700 hover:text-green-600" />
        </RouterLink>
        <UserStatus />
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { ShoppingCartIcon, UserIcon, ArchiveBoxIcon, ChartBarIcon} from '@heroicons/vue/24/outline'
import UserStatus from '@/components/UserStatus.vue'
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth'
defineEmits(['toggle-carrito'])

const auth=useAuthStore()
const showDropdown = ref(false)
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const route = useRoute()

const isCheckout = computed(() => route.path.includes('/checkout') )
const isAdmin = computed(() => route.path.includes('/admin') || route.path.includes('/admin/medicamentos'))
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