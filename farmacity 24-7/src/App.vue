<script setup>
import Navbar from '@/components/Navbar.vue';
import Carrito from '@/components/carrito.vue';
import { ref } from 'vue';
const mostrarCarrito = ref(false);

const toggleCarrito = () => {
  mostrarCarrito.value = !mostrarCarrito.value;
  console.log('Estado del carrito:', mostrarCarrito.value); 
};
</script>
<template>
  <router-view />
  
</template>


<style scoped>
:global(body) {
  background-color: #f2f2f2;
  color: black;
}
</style>
