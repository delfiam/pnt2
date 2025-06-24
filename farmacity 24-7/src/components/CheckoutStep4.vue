<template> 
  <div class="checkout-step4">
    <h5 class="card-title d-flex align-items-center mb-3">
      <span class="badge me-2 bg-primary">4</span>
      Resumen de tu compra
    </h5>

    <div class="carrito-carrusel-container mb-3">
      <button @click="scrollLeft" class="carrusel-btn" aria-label="Scroll izquierdo">‹</button>

      <div ref="carrusel" class="carrito-carrusel">
        <MedicamentosCheckout
          v-for="(item, index) in carritoItems"
          :key="index"
          :medicamento="item"
        />
      </div>

      <button @click="scrollRight" class="carrusel-btn" aria-label="Scroll derecho">›</button>
    </div>

    <hr class="my-3"/>

    <div class="totales">
      <div class="d-flex justify-content-between mb-1">
        <span>Subtotal</span>
        <span class="fw-medium">${{ subTotal.toFixed(2) }}</span>
      </div>
      <div class="d-flex justify-content-between mb-1">
        <span>Descuento total</span>
        <span class="fw-medium text-success">${{ totalDescuento.toFixed(2) }}</span>
      </div>
      <div class="d-flex justify-content-between fs-5 mt-2 border-top pt-2">
        <strong>Total</strong>
        <strong>${{ totalCarrito.toFixed(2) }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/carrito'
import MedicamentosCheckout from '@/components/medicamentosCheckout.vue'

const carritoStore = useCartStore()
const carritoItems = computed(() => carritoStore.itemsCarrito)
const subTotal = computed(() => carritoStore.subtotal)
const totalCarrito = computed(() => carritoStore.total)
const totalDescuento = computed(() => carritoStore.descuentoTotal)

const carrusel = ref(null)

const scrollLeft = () => {
  carrusel.value.scrollBy({ left: -150, behavior: 'smooth' })
}

const scrollRight = () => {
  carrusel.value.scrollBy({ left: 150, behavior: 'smooth' })
}
</script>

<style scoped>
.checkout-step4 {
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.carrito-carrusel-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.carrusel-btn {
  background-color: #f0f0f0;
  border: none;
  color: #333;
  font-size: 20px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.carrusel-btn:hover {
  background-color: #e0e0e0;
}

.carrito-carrusel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 12px;
  padding: 8px 0;
  flex: 1;
}

.totales {
  font-size: 14px;
}
</style>
