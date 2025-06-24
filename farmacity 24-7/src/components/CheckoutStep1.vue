<template>
  <div class="card shadow-sm mb-4">
    <div class="card-body">
      <h5 class="card-title fw-semibold mb-3">
        <span class="badge bg-primary me-2">1</span> Datos Personales y Factura
      </h5>
      <form @submit.prevent="handleNext">
        <div class="mb-3">
          <label class="form-label">Correo</label>
          <input
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errores.correo }"
            placeholder="email@ejemplo.com"
            v-model="formData.correo"
          />
          <div class="invalid-feedback">{{ errores.correo }}</div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errores.nombre }"
              v-model="formData.nombre"
            />
            <div class="invalid-feedback">{{ errores.nombre }}</div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Apellido</label>
            <input
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errores.apellido }"
              v-model="formData.apellido"
            />
            <div class="invalid-feedback">{{ errores.apellido }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">DNI</label>
          <input
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errores.dni }"
            v-model="formData.dni"
          />
          <div class="invalid-feedback">{{ errores.dni }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Teléfono / Móvil</label>
          <div class="input-group">
            <span class="input-group-text">+54</span>
            <input
              type="tel"
              class="form-control"
              placeholder="1123456789"
              :class="{ 'is-invalid': errores.telefono }"
              v-model="formData.telefono"
            />
            <div class="invalid-feedback">{{ errores.telefono }}</div>
          </div>
        </div>

        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" v-model="formData.recibirPromos" />
          <label class="form-check-label">Quiero recibir promociones por mail</label>
        </div>

        <p class="text-muted small">
          Factura A no disponible para productos del <strong>Market</strong>
        </p>

        <button type="submit" class="btn btn-primary w-100">Continuar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['formData'])
const emit = defineEmits(['next'])

const errores = ref({
  correo: '',
  nombre: '',
  apellido: '',
  dni: '',
  telefono: ''
})

const handleNext = () => {
  errores.value = {
    correo: '',
    nombre: '',
    apellido: '',
    dni: '',
    telefono: ''
  }

  const { correo, nombre, apellido, dni, telefono } = props.formData

  let valido = true

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    errores.value.correo = 'Correo inválido.'
    valido = false
  }
  if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(nombre)) {
    errores.value.nombre = 'Solo letras.'
    valido = false
  }
  if (!/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/.test(apellido)) {
    errores.value.apellido = 'Solo letras.'
    valido = false
  }
  if (!/^[0-9]+$/.test(dni)) {
    errores.value.dni = 'Solo números.'
    valido = false
  }
  if (!/^[0-9]{10}$/.test(telefono)) {
    errores.value.telefono = 'Deben ser exactamente 10 dígitos.'
    valido = false
  }

  if (valido) emit('next', 2)
}
</script>
