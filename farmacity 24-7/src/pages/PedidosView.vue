<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">Mi Historial de Pedidos</h2>


    <ul class="list-group">
      <li
        v-for="pedido in pedidosUsuario"
        :key="pedido.id"
        class="list-group-item d-flex flex-column align-items-start"
      >
        <div class="d-flex justify-content-between align-items-center w-100 mb-2">
          <div>
            <strong>Estado: </strong> 
            <span
              class="badge ms-2"
              :class="{
                'bg-warning': pedido.estado === 'pendiente',
                'bg-info': pedido.estado === 'en camino',
                'bg-success': pedido.estado === 'entregado'
              }"
            >
              {{ pedido.estado }}
            </span>
            <br />
            <small class="text-muted">Dirección: {{ pedido.direccion }}</small>
            <br />
            <small class="text-muted">Fecha: {{ new Date(pedido.fecha).toLocaleString() }}</small>
          </div>
        </div>

        <div v-if="pedido.productos?.length" class="w-100">
          <h6>Productos:</h6>
          <ul class="list-group list-group-flush">
            <li
              v-for="producto in pedido.productos"
              :key="producto.id"
              class="list-group-item d-flex align-items-center py-1 ps-3"
            >
              <img
                v-if="producto.imagen"
                :src="producto.imagen"
                alt="Med"
                class="me-2"
                style="width:40px; height:40px; object-fit:contain"
              />
              <div>
                <strong>{{ producto.nombre }}</strong>
                <br />
                <small>Cantidad: {{ producto.cantidad }}</small> |
                <small>Precio: ${{ producto.precio }}</small>
                <span v-if="producto.descuento > 0">
                  | <small>Desc: {{ (producto.descuento*100).toFixed(0) }}%</small>
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="text-muted">
          Este pedido no tiene productos detallados.
        </div>
      </li>

      <li v-if="pedidosUsuario.length === 0" class="text-center py-4 text-gray-500">
        No tienes pedidos aún.
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/store/auth'

const API = 'https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos'
const auth = useAuthStore()

const pedidos = ref([])

const obtenerPedidos = async () => {
  try {
    const res = await axios.get(API)
    pedidos.value = res.data
  } catch (error) {
    console.error('Error al obtener pedidos:', error)
  }
}

const pedidosUsuario = computed(() => {
  const user = auth.currentUser?.username
  return user
    ? pedidos.value.filter(p => p.user === user)
    : []
})



onMounted(() => {
  obtenerPedidos()
})
</script>

<style scoped>
.form-label {
  margin-bottom: 0 !important;
}
.list-group-flush .list-group-item {
  border-width: 0 0 1px 0;
  padding-left: 0;
  padding-right: 0;
}
</style>
