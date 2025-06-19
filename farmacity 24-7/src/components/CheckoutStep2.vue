<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title d-flex align-items-center">
        <span class="badge me-2 bg-primary">2</span>
        Domicilio y Entrega
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label for="provincia" class="form-label">Provincia</label>
          <select class="form-select" id="provincia" v-model="formData.provincia" disabled>
            <option value="CABA">Ciudad Autónoma de Buenos Aires</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="pais" class="form-label">País</label>
          <select class="form-select" id="pais" v-model="formData.pais" disabled>
            <option value="Argentina">Argentina</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="barrio" class="form-label">Barrio</label>
          <select class="form-select" id="barrio" v-model="formData.barrio" required>
            <option value="" disabled>Selecciona un barrio</option>
            <option v-for="barrio in barriosCABA" :key="barrio" :value="barrio">{{ barrio }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="calle" class="form-label">Calle</label>
          <input type="text" class="form-control" id="calle" v-model="formData.calle" required>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="altura" class="form-label">Altura</label>
            <input type="text" class="form-control" id="altura" v-model="formData.altura" required>
          </div>
          <div class="col-md-6 mb-3">
            <label for="pisoDepto" class="form-label">Piso/Depto (Opcional)</label>
            <input type="text" class="form-control" id="pisoDepto" v-model="formData.pisoDepto">
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-2">Continuar a Pago</button>
      </form>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['formData'])
const emit = defineEmits(['next'])
const barriosCABA = ["Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita", "Coghlan", "Colegiales", "Constitución", "Flores", "Floresta", "La Boca", "La Paternal", "Liniers", "Mataderos", "Monte Castro", "Monserrat", "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda", "Parque Chacabuco", "Parque Chas", "Parque Patricios", "Puerto Madero", "Recoleta", "Retiro", "Saavedra", "San Cristóbal", "San Nicolás", "San Telmo", "Versalles", "Villa Crespo", "Villa del Parque", "Villa Devoto", "Villa General Mitre", "Villa Lugano", "Villa Luro", "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza", "Vélez Sarsfield"]
const handleNext = () => {
  if (props.formData.barrio && props.formData.calle && props.formData.altura) {
    emit('next', 3)
  } else {
    alert('Por favor, completa todos los campos obligatorios de Domicilio y Entrega.')
  }
}
</script>
