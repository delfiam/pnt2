<script setup>
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import Navbar from '@/components/ui/Navbar.vue'


// Cierra el dropdown si hacés clic afuera
document.addEventListener('click', (e) => {
  if (!(e.target.closest('nav'))) {
    showDropdown.value = false
  }
})
const router = useRouter()
</script>
<template>
  <Navbar />
  <router-view />
</template>

<style scoped>
:global(body) {
  background-color: #f2f2f2;
  color: black;
}
</style>
