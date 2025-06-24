<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">2</span> Domicilio y Entrega
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label class="form-label">Provincia</label>
          <select class="form-select" v-model="formData.provincia" disabled>
            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">País</label>
          <select class="form-select" v-model="formData.pais" disabled>
            <option value="Argentina">Argentina</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Barrio</label>
          <select class="form-select" v-model="formData.barrio" required>
            <option disabled value="">Selecciona un barrio</option>
            <option v-for="barrio in barriosCABA" :key="barrio" :value="barrio">{{ barrio }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Calle</label>
          <input type="text" class="form-control" v-model="formData.calle" required>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Altura</label>
            <input type="text" class="form-control" v-model="formData.altura" required>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Piso / Depto (opcional)</label>
            <input type="text" class="form-control" v-model="formData.pisoDepto">
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-outline-secondary" @click="handlePrev">Volver</button>
          <button type="submit" class="btn btn-primary">Continuar a Pago</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { patchDireccion } from '@/services/productService'
const props = defineProps(['formData'])
const emit = defineEmits(['next', 'prev'])
const barriosCABA = ["Almagro", "Belgrano", "Caballito", "Palermo", "Recoleta", "Retiro", "Villa Urquiza", "Villa Crespo", "San Telmo", "La Boca", "Barracas"]
const handleNext = async () => {
  if (props.formData.barrio && props.formData.calle && props.formData.altura) {
    await patchDireccion(localStorage.getItem('pedidoActivo'), props.formData.barrio, props.formData.calle, props.formData.altura, props.formData.pisoDepto)
    emit('next', 3)
  } else {
    alert('Completá los campos obligatorios del domicilio.')
  }
}
const handlePrev = () => {
  emit('prev')
}
</script>
