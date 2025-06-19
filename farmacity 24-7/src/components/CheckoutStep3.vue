<template>
  <div class="card mb-4" style="background-color: white;">
    <div class="card-body">
      <h5 class="card-title d-flex align-items-center">
        <span class="badge me-2 bg-primary">3</span>
        Pago
      </h5>
      <paymentMethod />
    </div>
  </div>
</template>

<script setup>
import paymentMethod from '@/components/paymentMethod.vue'
</script>
