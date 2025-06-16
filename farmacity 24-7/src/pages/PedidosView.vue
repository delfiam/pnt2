<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">📦 Pedidos de medicamentos</h2>

    <form @submit.prevent="crearPedido" class="card p-4 mb-4 shadow-sm">
      <div class="row g-3">
        <div class="col-md-6">
          <input v-model="nuevo.cliente" type="text" class="form-control" placeholder="Cliente" required />
        </div>
        <div class="col-md-6">
          <input v-model="nuevo.direccion" type="text" class="form-control" placeholder="Dirección" required />
        </div>
        <div class="col-md-6">
          <input v-model="nuevo.medicamento" type="text" class="form-control" placeholder="Medicamento" required />
        </div>
        <div class="col-md-3">
          <input v-model="nuevo.cantidad" type="number" min="1" class="form-control" placeholder="Cantidad" required />
        </div>
        <div class="col-md-3">
          <select v-model="nuevo.estado" class="form-select">
            <option value="pendiente">Pendiente</option>
            <option value="en camino">En camino</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>
      <div class="text-end mt-3">
        <button type="submit" class="btn btn-success">Agregar pedido</button>
      </div>
    </form>

    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="pedido in pedidos"
        :key="pedido.id"
      >
        <div>
          <strong>{{ pedido.cliente }}</strong> pidió
          <strong>{{ pedido.cantidad }}</strong> x
          <em>{{ pedido.medicamento }}</em>
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

        </div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'


const API = 'https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos'


const pedidos = ref([])
const nuevo = ref({
  cliente: '',
  direccion: '',
  medicamento: '',
  cantidad: 1,
  estado: 'pendiente'
})

const obtenerPedidos = async () => {
  const res = await axios.get(API)
  pedidos.value = res.data
}

const crearPedido = async () => {
  await axios.post(API, nuevo.value)
  nuevo.value = {
    cliente: '',
    direccion: '',
    medicamento: '',
    cantidad: 1,
    estado: 'pendiente'
  }
  obtenerPedidos()
}

onMounted(() => obtenerPedidos())
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
</style>
