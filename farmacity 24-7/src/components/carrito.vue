<template>
  <div class="carrito" :class="{ 'carrito-abierto': isCarritoVisible }">
    <div class="carrito-header">
      <h3>Tu Carrito</h3>
      <button @click="cerrarCarrito" class="cerrar-carrito-btn">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="carrito-contenido">
      <ul>
        <li v-for="(item, index) in carritoItems" :key="index">
          <ProductosCarrito :medicamento="item" />
        </li>
      </ul>
      <p v-if="carritoItems.length === 0">Tu carrito está vacío.</p>
    </div>
    <div class="carrito-footer">
      <button v-if="carritoItems.length > 0" @click="irAComprar" class="ir-a-comprar-btn">Ir a comprar</button>
    </div>
  </div>
  <div v-if="isCarritoVisible" class="fondo-oscuro" @click="cerrarCarrito"></div>
</template>

<script setup>
import { useCartStore } from '@/store/carrito';
import { ref, defineProps, defineEmits, computed } from 'vue';
import { useRouter } from 'vue-router';
import ProductosCarrito from './productosCarrito.vue';
const props = defineProps({
  isCarritoVisible: Boolean
});
const carritoStore = useCartStore();
const carritoItems = computed(() => carritoStore.productos);
console.log("carritoitems: ", carritoItems);

const emit = defineEmits(['update:isCarritoVisible']);
const router = useRouter();

const cerrarCarrito = () => {
  emit('update:isCarritoVisible', false);
};

const irAComprar = () => {
  carritoStore.cerrarCompra();
  router.push('/checkout');
  emit('update:isCarritoVisible', false);
};
</script>

<style scoped>
.carrito {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: #f8f8f8;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  display: flex;
  flex-direction: column;
}

.carrito-abierto {
  transform: translateX(0);
}

.carrito-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
}

.carrito-header h3 {
  margin: 0;
}

.cerrar-carrito-btn {
  background: none;
  border: none;
  color: #555;
  font-size: 1.5em;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.cerrar-carrito-btn:hover {
  color: #333;
}

.carrito-contenido {
  padding: 20px;
  flex-grow: 1;
  overflow-y: auto;
}

.carrito-contenido ul {
  padding: 0;
  list-style: none;
  margin-bottom: 15px;
}

.carrito-contenido li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.carrito-contenido li:last-child {
  border-bottom: none;
}

.carrito-footer {
  padding: 15px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  /* Alinea el botón a la derecha */
}

.ir-a-comprar-btn {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.ir-a-comprar-btn:hover {
  background-color: #1e7e34;
}

.fondo-oscuro {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  opacity: 0;
  pointer-events: none;
  transition: opacity 3.3s ease-in-out;
}

.carrito-abierto+.fondo-oscuro {
  opacity: 1;
  pointer-events: auto;
}
</style>