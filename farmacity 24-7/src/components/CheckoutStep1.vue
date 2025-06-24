<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">1</span> Datos Personales y Factura
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input type="email" class="form-control" placeholder="email@ejemplo.com" required v-model="formData.correo">
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-control" required v-model="formData.nombre">
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Apellido</label>
            <input type="text" class="form-control" required v-model="formData.apellido">
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">DNI</label>
          <input type="text" class="form-control" required v-model="formData.dni">
        </div>
        <div class="mb-3">
          <label class="form-label">Teléfono / Móvil</label>
          <div class="input-group">
            <span class="input-group-text">+54</span>
            <input type="tel" class="form-control" placeholder="1123456789" v-model="formData.telefono">
          </div>
        </div>
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="formData.recibirPromos">
          <label class="form-check-label">Quiero recibir promociones por mail</label>
        </div>
        <p class="text-muted small">Factura A no disponible para productos del <strong>Market</strong></p>
        <button type="submit" class="btn btn-primary w-100">Continuar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['formData'])
const emit = defineEmits(['next'])
const handleNext = () => {
  if (props.formData.correo && props.formData.nombre && props.formData.apellido && props.formData.dni) {
    emit('next', 2)
  } else {
    alert('Por favor, completa todos los campos obligatorios.')
  }
}
</script>
