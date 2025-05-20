<!-- ./src/App.vue -->


// Cierra el dropdown si hacés clic afuera
document.addEventListener('click', (e) => {
  if (!(e.target.closest('nav'))) {
    showDropdown.value = false
  }
})
const router = useRouter()
</script>
<template>
  <router-view />
</template>

<script setup>
// No se necesita nada aquí por ahora
</script>