<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">2</span> Domicilio y Entrega
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label class="form-label">Barrio</label>
          <select
            class="form-select"
            :class="{ 'is-invalid': errores.barrio }"
            v-model="formData.barrio"
          >
            <option disabled value="">Selecciona un barrio</option>
            <option v-for="barrio in barriosCABA" :key="barrio" :value="barrio">{{ barrio }}</option>
          </select>
          <div class="invalid-feedback">{{ errores.barrio }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Calle</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errores.calle }"
            v-model="formData.calle"
          />
          <div class="invalid-feedback">{{ errores.calle }}</div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Altura</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errores.altura }"
              v-model="formData.altura"
            />
            <div class="invalid-feedback">{{ errores.altura }}</div>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label">Piso / Depto (opcional)</label>
            <input
              type="text"
              class="form-control"
              v-model="formData.pisoDepto"
            />
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
import { ref } from 'vue'
import { patchDireccion } from '@/services/productService'

const props = defineProps(['formData'])
const emit = defineEmits(['next', 'prev'])

const errores = ref({
  barrio: '',
  calle: '',
  altura: ''
})

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
  errores.value = { barrio: '', calle: '', altura: '' }
  const { barrio, calle, altura, pisoDepto } = props.formData
  let valido = true

  if (!barrio) {
    errores.value.barrio = 'Seleccioná un barrio.'
    valido = false
  }
  if (!calle) {
    errores.value.calle = 'Ingresá la calle.'
    valido = false
  }
  if (!altura || isNaN(altura)) {
    errores.value.altura = 'Ingresá una altura válida.'
    valido = false
  }

  if (valido) {
    await patchDireccion(
      localStorage.getItem('pedidoActivo'),
      barrio,
      calle,
      altura,
      pisoDepto
    )
    emit('next', 3)
  }
}

const handlePrev = () => {
  emit('prev')
}
</script>
