<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">2</span> Domicilio y Entrega
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label class="form-label">Barrio</label>
          <select class="form-select" v-model="formData.barrio" required>
            <option disabled value="">Selecciona un barrio</option>
            <option v-for="barrio in barriosCABA" :key="barrio" :value="barrio">{{ barrio }}</option>
          </select>
        </div>

        <div class="mb-3">
          <label class="form-label">Calle</label>
          <input type="text" class="form-control" v-model="formData.calle" required />
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Altura</label>
            <input type="text" class="form-control" v-model="formData.altura" required />
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Piso / Depto (opcional)</label>
            <input type="text" class="form-control" v-model="formData.pisoDepto" />
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

const barriosCABA = [
  "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita",
  "Coghlan", "Colegiales", "Constitución", "Flores", "Floresta", "La Boca", "La Paternal", "Liniers",
  "Mataderos", "Monserrat", "Monte Castro", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda",
  "Parque Chacabuco", "Parque Patricios", "Puerto Madero", "Recoleta", "Retiro", "Saavedra",
  "San Cristóbal", "San Nicolás", "San Telmo", "Vélez Sársfield", "Versalles", "Villa Crespo",
  "Villa del Parque", "Villa Devoto", "Villa Gral. Mitre", "Villa Lugano", "Villa Luro", "Villa Ortúzar",
  "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza"
]

const handleNext = async () => {
  if (props.formData.barrio && props.formData.calle && props.formData.altura) {
    await patchDireccion(
      localStorage.getItem('pedidoActivo'),
      props.formData.barrio,
      props.formData.calle,
      props.formData.altura,
      props.formData.pisoDepto
    )
    emit('next', 3)
  } else {
    alert('Completá los campos obligatorios del domicilio.')
  }
}

const handlePrev = () => {
  emit('prev')
}
</script>
