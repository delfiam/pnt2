<template>
  <div class="payment-container">
    <h5 class="payment-title">Metodo de pago</h5>
    <p class="payment-subtitle">Agrega un nuevo metodo de pago a tu cuenta.</p>

    <div class="payment-options">
      <button
        class="payment-button"
        :class="{ 'selected': selectedPaymentMethod === 'card' }"
        @click="selectPaymentMethod('card')"
      >
        Tarjeta
      </button>
      <button
        class="payment-button"
        :class="{ 'selected': selectedPaymentMethod === 'paypal' }"
        @click="selectPaymentMethod('paypal')"
      >
        Paypal
      </button>
      <button
        class="payment-button"
        :class="{ 'selected': selectedPaymentMethod === 'apple' }"
        @click="selectPaymentMethod('apple')"
      >
        Apple
      </button>
    </div>

    <div v-if="selectedPaymentMethod === 'card'">
      <input type="text" class="input-field" placeholder="Nombre Completo" v-model="cardDetails.name" />
      <input type="text" class="input-field" placeholder="Numero de tarjeta" v-model="cardDetails.cardNumber" />

      <div class="input-row">
        <select class="input-select" v-model="cardDetails.month">
          <option disabled value="">Mes</option>
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>

        <select class="input-select" v-model="cardDetails.year">
          <option disabled value="">Año</option>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
          <option>2028</option>
          <option>2029</option>
        </select>

        <input type="text" class="input-field cvc" placeholder="CVC" v-model="cardDetails.cvc" />
      </div>
    </div>

    <div v-else-if="selectedPaymentMethod === 'paypal'">
      <p class="text-muted mt-3">Serás redirigido a PayPal para completar tu compra.</p>
    </div>

    <div v-else-if="selectedPaymentMethod === 'apple'">
      <p class="text-muted mt-3">Serás redirigido a Apple Pay para completar tu compra.</p>
    </div>

    <button class="continue-button" @click="processPayment">Finalizar Compra</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { patchEstadoPedido } from '@/services/productService';
import { useCartStore } from '@/store/carrito'; 
import {useRouter} from 'vue-router';
const selectedPaymentMethod = ref('card'); 
const carrito = useCartStore()
const router = useRouter()
const cardDetails = ref({
  name: '',
  cardNumber: '',
  month: '',
  year: '',
  cvc: ''
});

const selectPaymentMethod = (method) => {
  selectedPaymentMethod.value = method;
};

const processPayment = () => {
  if (selectedPaymentMethod.value === 'card') {
    if (cardDetails.value.name && cardDetails.value.cardNumber && cardDetails.value.month && cardDetails.value.year && cardDetails.value.cvc) {
      alert('Procesando pago con tarjeta...');
      finalizarCompra()
      
    } else {
      alert('Por favor, completa todos los detalles de la tarjeta.');
    }
  } else {
    alert(`Procesando pago con ${selectedPaymentMethod.value}...`);
    finalizarCompra()
  }
};

const finalizarCompra = async()=>{
  await patchEstadoPedido(localStorage.getItem('pedidoActivo'), 'en camino')
  router.push('/cliente')
  carrito.vaciarCarrito()
}
</script>

<style scoped>
.payment-container {
  background-color: #ffffff;
  color: black;
  border-color: #343a40;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.payment-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.payment-subtitle {
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 16px;
}

.payment-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.payment-button {
  flex: 1;
  margin: 0 4px;
  background-color: transparent;
  color: black;
  border: 1px solid #ababab;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.payment-button.selected,
.payment-button:hover {
  background-color: black;
  color: white;
  border-color: black;
}

.input-field,
.input-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #ababab;
  background-color: #f8f9fa;
  color: black;
  font-size: 0.95rem;
}

.input-select {
  appearance: none;
}

.input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.cvc {
  max-width: 80px;
}

.continue-button {
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.continue-button:hover {
  background-color: #343a40;
}
</style>