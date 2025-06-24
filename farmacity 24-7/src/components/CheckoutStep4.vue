<template>
  <div class="checkout-step4">
    <h5 class="card-title d-flex align-items-center mb-3">
      <span class="badge me-2 bg-primary">4</span>
      Resumen de tu compra
    </h5>

    <div class="carrito-carrusel-container mb-3">
      <button @click="scrollLeft" class="carrusel-btn">◀</button>

      <div ref="carrusel" class="carrito-carrusel">
        <MedicamentosCheckout
          v-for="(item, index) in carritoItems"
          :key="index"
          :medicamento="item"
        />
      </div>

      <button @click="scrollRight" class="carrusel-btn">▶</button>
    </div>

    <hr />

    <div class="d-flex justify-content-between">
      <span>Subtotal</span>
      <strong>${{ subTotal.toFixed(2) }}</strong>
    </div>

    <div class="d-flex justify-content-between">
      <span>Descuento total</span>
      <strong>${{ totalDescuento.toFixed(2) }}</strong>
    </div>

    <div class="d-flex justify-content-between fs-5">
      <span>Total</span>
      <strong>${{ totalCarrito.toFixed(2) }}</strong>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/store/carrito';
import MedicamentosCheckout from '@/components/medicamentosCheckout.vue';

const carritoStore = useCartStore();
const carritoItems = computed(() => carritoStore.itemsCarrito);
const subTotal = computed(() => carritoStore.subtotal);
const totalCarrito = computed(() => carritoStore.total);
const totalDescuento = computed(() => carritoStore.descuentoTotal);

const carrusel = ref(null);

const scrollLeft = () => {
  carrusel.value.scrollBy({ left: -150, behavior: 'smooth' });
};

const scrollRight = () => {
  carrusel.value.scrollBy({ left: 150, behavior: 'smooth' });
};
</script>

<style scoped>
.checkout-step4 {
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.carrito-carrusel-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.carrusel-btn {
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.carrito-carrusel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 10px;
  padding: 5px 0;
}
</style>
