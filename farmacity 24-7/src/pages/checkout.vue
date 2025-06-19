<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/store/carrito'
import CheckoutStep1 from '@/components/CheckoutStep1.vue'
import CheckoutStep2 from '@/components/CheckoutStep2.vue'
import CheckoutStep3 from '@/components/CheckoutStep3.vue'
import CheckoutStep4 from '@/components/CheckoutStep4.vue'

const carritoStore = useCartStore()
const carritoItems = computed(() => carritoStore.productos)
const subTotal = computed(() => carritoStore.subtotal)
const totalCarrito = computed(() => carritoStore.total)
const totalDescuento = computed(() => carritoStore.descuentoTotal)

const step = ref(1)
const formData = ref({
  correo: '', nombre: '', apellido: '', dni: '', telefono: '', esCelular: false,
  recibirPromos: false, provincia: 'CABA', pais: 'Argentina',
  barrio: '', calle: '', altura: '', pisoDepto: ''
})

const nextStep = (newStep) => {
  step.value = newStep
}
</script>

<template>
  <div class="checkout-steps d-flex align-items-center justify-content-center mb-4">
  <div v-for="n in 3" :key="n" class="step-container d-flex align-items-center">
    <div :class="['step-circle', { 'active': step >= n }]">
      {{ n }}
    </div>
    <div v-if="n < 3" class="step-line"></div>
  </div>
</div>

  <div class="checkout-container py-5">
    <div class="row">
      <div class="col-md-4 order-md-1">
        <CheckoutStep4 :carritoItems="carritoItems" :subTotal="subTotal" :totalDescuento="totalDescuento" :totalCarrito="totalCarrito" />
      </div>
      <div class="col-md-8 order-md-0">
        <CheckoutStep1 v-if="step === 1" :formData="formData" @next="nextStep" />
        <CheckoutStep2 v-if="step === 2" :formData="formData" @next="nextStep" />
        <CheckoutStep3 v-if="step === 3" :formData="formData" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkout-steps {
  gap: 10px;
}

.step-container {
  display: flex;
  align-items: center;
}

.step-circle {
  
  width: 48px;  /* Antes 32px */
  height: 48px; /* Antes 32px */
  font-size: 20px; /* Hacé el número más grande */
  border-radius: 50%;
  background-color: #6c757d; /* gris */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.step-circle.active {
  background-color: #007bff; /* azul */
}

.step-line {
  width: 40px;
  height: 3px;
  background-color: #6c757d;
}

.step-container .active + .step-line {
  background-color: #007bff;
}
</style>
