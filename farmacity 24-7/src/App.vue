<script setup>
import Navbar from '@/components/ui/Navbar.vue';
import Carrito from '@/components/carrito.vue';
import { ref } from 'vue';
const mostrarCarrito = ref(false);

const toggleCarrito = () => {
  mostrarCarrito.value = !mostrarCarrito.value;
  console.log('Estado del carrito:', mostrarCarrito.value); // Agrega esta línea
};
</script>
<template>
<Navbar @toggle-carrito="toggleCarrito" />  <router-view />
  <Carrito :isCarritoVisible="mostrarCarrito" @update:isCarritoVisible="mostrarCarrito = $event" />
</template>


<style scoped>
:global(body) {
  background-color: #f2f2f2;
  color: black;
}
</style>
