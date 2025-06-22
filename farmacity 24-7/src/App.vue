<script setup>
import Navbar from '@/components/Navbar.vue';
import Carrito from '@/components/carrito.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router'

const mostrarCarrito = ref(false);

const route = useRoute()

const carritoAbierto = ref(false)
const toggleCarrito = () => carritoAbierto.value = !carritoAbierto.value

const ocultarNavbarEnRutas = ['/login', '/admin']
const mostrarNavbar = computed(() => !ocultarNavbarEnRutas.includes(route.path))
</script>

<template>
  <div>
    <Navbar v-if="mostrarNavbar" @toggle-carrito="toggleCarrito" /> <router-view />
    <Carrito :isCarritoVisible="carritoAbierto" @update:isCarritoVisible="carritoAbierto = $event" />

  </div>
</template>


<style scoped>
:global(body) {
  background-color: #f2f2f2;
  color: black;
}
</style>
