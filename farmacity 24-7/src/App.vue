<script setup>
//import { RouterLink } from 'vue-router'//
//import { Button } from '@/components/ui/button'
//import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Navbar from '@/components/ui/Navbar.vue'
const mostrarCarrito = ref(false);
import Carrito from '@/components/carrito.vue';


const toggleCarrito = () => {
  mostrarCarrito.value = !mostrarCarrito.value;
  console.log('Estado del carrito:', mostrarCarrito.value); // Agrega esta línea
};
// Cierra el dropdown si hacés clic afuera
//document.addEventListener('click', (e) => {
//if (!(e.target.closest('nav'))) {
//  showDropdown.value = false
//  }
//})//
const router = useRouter()
</script>
<template>
  <Navbar @toggle-carrito="toggleCarrito" />
  <router-view />
  <Carrito :isCarritoVisible="mostrarCarrito" @update:isCarritoVisible="mostrarCarrito = $event" />
</template>

<style scoped>
:global(body) {
  background-color: #f2f2f2;
  color: black;
}
</style>
