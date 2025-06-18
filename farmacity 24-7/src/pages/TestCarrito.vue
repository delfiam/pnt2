<!-- Borrar es pagina de testeo -->

<script setup>
import { ref, onMounted } from 'vue'
import { useProductosStore } from '@/store/product'
import { useCartStore } from '@/store/carrito'
import { useAuthStore } from '@/store/auth'

const productosStore = useProductosStore()
const cartStore = useCartStore()
const authStore = useAuthStore()

const mensaje = ref('')

// Simular usuario activo (si no hay login)
if (!authStore.currentUser) {
  authStore.currentUser = {
    id: 1,
    username: 'testUser',
    rol: 'cliente'
  }
}

onMounted(async () => {
  if (productosStore.productos.length === 0) {
    await productosStore.fetchProductos()
  }
})

function agregar(producto) {
  cartStore.agregarItem(producto, 1)
}

async function cerrar() {
  mensaje.value = 'Procesando...'
  await cartStore.cerrarCompra()
  mensaje.value = 'Compra cerrada. Revisa consola.'
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">🛒 Página de Prueba del Carrito</h1>

    <h2 class="text-lg font-semibold">Productos disponibles:</h2>
    <div v-if="productosStore.loading">Cargando productos...</div>
    <div v-else-if="productosStore.error">{{ productosStore.error }}</div>
    <div v-else class="space-y-2">
      <div v-for="producto in productosStore.productos" :key="producto.id" class="border p-2 rounded">
        <p><strong>{{ producto.nombre }}</strong> - Stock: {{ producto.stock }}</p>
        <button
          class="bg-green-500 text-white px-2 py-1 rounded"
          @click="agregar(producto)"
        >
          Agregar al carrito
        </button>
      </div>
    </div>

    <hr class="my-6" />

    <h2 class="text-lg font-semibold">Contenido del carrito:</h2>
    <div v-if="cartStore.itemsCarrito.length === 0">Carrito vacío</div>
    <ul>
      <li
        v-for="item in cartStore.itemsCarrito"
        :key="item.id"
        class="flex justify-between"
      >
        <span>{{ item.id }} - Cantidad: {{ item.cantidad }}</span>
        <button
          class="text-red-500"
          @click="cartStore.retirarItem(item.id)"
        >
          ❌ Quitar
        </button>
      </li>
    </ul>

    <button
      class="bg-blue-600 text-white mt-4 px-3 py-1 rounded"
      :disabled="cartStore.saving"
      @click="cerrar"
    >
      Cerrar Compra
    </button>

    <p class="mt-4 text-sm text-gray-700">{{ mensaje }}</p>
  </div>
</template>
