<template>
  <div class="container py-4">
    <h2 class="text-center mb-4">📦 Pedidos de medicamentos</h2>

    <form @submit.prevent="crearPedido" class="card p-4 mb-4 shadow-sm">
      <div class="row g-3">
        <div class="col-md-6">
          <label for="clienteNombre" class="form-label mb-1">Cliente</label>
          <input v-model="nuevo.cliente" type="text" class="form-control" id="clienteNombre" placeholder="Nombre del Cliente" required />
        </div>
        <div class="col-md-6">
          <label for="clienteDireccion" class="form-label mb-1">Dirección</label>
          <input v-model="nuevo.direccion" type="text" class="form-control" id="clienteDireccion" placeholder="Dirección de envío" required />
        </div>
        <div class="col-md-6">
          <label for="medicamentoPrincipal" class="form-label mb-1">Resumen del Pedido</label>
          <input v-model="nuevo.medicamento" type="text" class="form-control" id="medicamentoPrincipal" placeholder="Título o resumen del pedido (ej. Medicamentos para alergias)" />
        </div>
        <div class="col-md-3">
            <label for="cantidadTotal" class="form-label mb-1">Cantidad Total de Productos</label>
            <input :value="totalCantidadProductos" type="text" class="form-control" id="cantidadTotal" placeholder="Cant. total (auto)" readonly />
        </div>
        <div class="col-md-3">
          <label for="estadoPedido" class="form-label mb-1">Estado</label>
          <select v-model="nuevo.estado" class="form-select" id="estadoPedido">
            <option value="pendiente">Pendiente</option>
            <option value="en camino">En camino</option>
            <option value="entregado">Entregado</option>
          </select>
        </div>
      </div>

      <div class="mt-4 border-top pt-3">
        <h5>Añadir productos al pedido:</h5>
        <div v-for="(prod, index) in nuevo.productos" :key="index" class="row g-2 mb-2 align-items-center">
          <div class="col-md-4">
            <label :for="'prodNombre' + index" class="form-label mb-1">Nombre del Producto</label>
            <input v-model="prod.nombre" type="text" class="form-control form-control-sm" :id="'prodNombre' + index" placeholder="Nombre (ej. Ibuprofeno)" required />
          </div>
          <div class="col-md-2">
            <label :for="'prodCantidad' + index" class="form-label mb-1">Cantidad</label>
            <input v-model.number="prod.cantidad" type="number" min="1" class="form-control form-control-sm" :id="'prodCantidad' + index" placeholder="Cant." required />
          </div>
          <div class="col-md-3">
            <label :for="'prodPrecio' + index" class="form-label mb-1">Precio</label>
            <input v-model.number="prod.precio" type="number" step="0.01" class="form-control form-control-sm" :id="'prodPrecio' + index" placeholder="Precio ($)" required />
          </div>
          <div class="col-md-2">
            <label :for="'prodDescuento' + index" class="form-label mb-1">Descuento</label>
            <input v-model.number="prod.descuento" type="number" step="0.01" min="0" max="1" class="form-control form-control-sm" :id="'prodDescuento' + index" placeholder="Desc. (0.00 - 1.00)" />
          </div>
          <div class="col-md-1">
            <button type="button" class="btn btn-danger btn-sm" @click="eliminarProducto(index)">X</button>
          </div>
        </div>
        <button type="button" class="btn btn-outline-secondary btn-sm mt-2" @click="agregarProducto">
          + Añadir otro producto
        </button>
      </div>

      <div class="text-end mt-3">
        <button type="submit" class="btn btn-success">Agregar pedido</button>
      </div>
    </form>

    <ul class="list-group">
      <li
        class="list-group-item d-flex flex-column align-items-start"
        v-for="pedido in pedidos"
        :key="pedido.id"
      >
        <div class="d-flex justify-content-between align-items-center w-100 mb-2">
          <div>
            <strong>{{ pedido.cliente }}</strong> pidió
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
            <small class="text-muted">Usuario: {{ pedido.user }}</small>
            <br />
            <small class="text-muted">Fecha: {{ new Date(pedido.fecha).toLocaleString() }}</small>
          </div>
          <div class="d-flex">
          </div>
        </div>
        <div v-if="pedido.productos && pedido.productos.length" class="w-100">
          <h6>Productos en este pedido:</h6>
          <ul class="list-group list-group-flush">
            <li v-for="producto in pedido.productos" :key="producto.id" class="list-group-item d-flex align-items-center py-1 ps-3">
              <img v-if="producto.imagen" :src="producto.imagen" alt="Imagen del medicamento" class="me-2" style="width: 40px; height: 40px; object-fit: contain;">
              <div>
                <strong>{{ producto.nombre }}</strong> <span v-if="producto.concentracion">({{ producto.concentracion }})</span> <span v-if="producto.presentacion">- {{ producto.presentacion }}</span>
                <br>
                <small>Cantidad: {{ producto.cantidad }}</small> |
                <small>Precio: ${{ producto.precio }}</small>
                <span v-if="producto.descuento > 0"> | <small>Descuento: {{ (producto.descuento * 100).toFixed(0) }}%</small></span>
                <span v-if="producto.precioVenta"> | <small>Precio Venta: ${{ producto.precioVenta.toFixed(2) }}</small></span>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="text-muted">
            Este pedido no tiene productos detallados.
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import { useAuthStore } from '@/store/auth'


const API = 'https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos'

const pedidos = ref([])
const nuevo = ref({
  cliente: '',
  direccion: '',
  medicamento: '',
  cantidad: 0,
  estado: 'pendiente',
  productos: [],
  user: 'emiliano',
  fecha: ''
})

const totalCantidadProductos = computed(() => {
  return nuevo.value.productos.reduce((sum, prod) => sum + prod.cantidad, 0);
})

const agregarProducto = () => {
  nuevo.value.productos.push({
    id: Date.now(),
    nombre: '',
    descuento: 0,
    presentacion: '',
    concentracion: '',
    precio: 0,
    stock: 0,
    laboratorio: '',
    fecha_vencimiento: '',
    necesita_receta: false,
    imagen: '',
    descripcion: '',
    contraindicaciones: '',
    cantidad: 1,
    username: 'emiliano',
    fecha: new Date().toISOString(),
    precioVenta: 0
  })
}

const eliminarProducto = (index) => {
  nuevo.value.productos.splice(index, 1)
}

const obtenerPedidos = async () => {
  try {
    const res = await axios.get(API)
    pedidos.value = res.data
  } catch (error) {
    console.error("Error al obtener los pedidos:", error)
  }
}

const crearPedido = async () => {
  nuevo.value.productos.forEach(prod => {
    prod.precioVenta = prod.precio * (1 - prod.descuento)
  })

  nuevo.value.fecha = new Date().toISOString()
  nuevo.value.user = 'emiliano'

  nuevo.value.cantidad = totalCantidadProductos.value

  try {
    await axios.post(API, nuevo.value)
    nuevo.value = {
      cliente: '',
      direccion: '',
      medicamento: '',
      cantidad: 0,
      estado: 'pendiente',
      productos: [],
      user: 'emiliano',
      fecha: ''
    }
    agregarProducto()
    obtenerPedidos()
  } catch (error) {
    console.error("Error al crear el pedido:", error)
  }
}

onMounted(() => {
  obtenerPedidos()
  agregarProducto()
})
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
.form-label {
  margin-bottom: 0.0rem !important; 
}

.list-group-item strong {
  color: #0056b3;
}
.list-group-flush .list-group-item {
  border-width: 0 0 1px 0;
  padding-left: 0;
  padding-right: 0;
}
</style>