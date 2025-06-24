<template>
  <div class="card shadow-sm mb-4 bg-white">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">3</span> Pago
      </h5>
      <paymentMethod />
      <div class="d-flex justify-content-between mt-3">
        <button type="button" class="btn btn-outline-secondary" @click="handlePrev">Volver</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import paymentMethod from '@/components/paymentMethod.vue'
const emit = defineEmits(['prev'])
const handlePrev = () => {
  emit('prev')
}
</script>
