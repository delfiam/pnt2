<template>
<!--import paymentMethod from '@/components/paymentMethod.vue'-->

  <h2 class="mb-4 fw-bold">Finalizar la compra</h2>
  <div class="checkout-container py-5">
    <div class="row">
      <div class="col-md-4 order-md-1">
       <div class="card">
          <div class="card-header bg-light">
            <strong>Tu carrito</strong>
          </div>
          <div class="card-body">
            <div class="d-flex mb-3">
              <img src="https://http2.mlstatic.com/D_NQ_NP_2X_931898-MLA71718971365_092023-F.webp" class="img-thumbnail me-3" style="width: 80px;" />
              <div>
                <h6 class="mb-0">Ibuprofeno</h6>
                <small>400 MG</small><br />
                <span class="fw-bold">$2000</span>
              </div>
            </div>
            <div class="d-flex mb-3">
              <img src="https://http2.mlstatic.com/D_NQ_NP_2X_870736-MLA50813771200_072022-F.webp" class="img-thumbnail me-3" style="width: 80px;" />
              <div>
                <h6 class="mb-0">Cetirizina en tabletas</h6>
                <small>10 mg</small><br />
                <span class="fw-bold">$15.000</span>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <span>Subtotal</span>
              <strong>$1.389.998</strong>
            </div>
            <div class="d-flex justify-content-between fs-5">
              <span>Total</span>
              <strong>$1.389.998</strong>
            </div>
            <router-link to="/carrito" class="d-block mt-3 text-decoration-none text-primary">← Volver al carrito</router-link>
          </div>
        </div>
      </div>

      <div class="col-md-8 order-md-0">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <span :class="{'badge': true, 'me-2': true, 'bg-primary': step >= 1, 'bg-secondary-grey': step < 1}">1</span>
              Datos Personales y Tipo de Factura
            </h5>
            <form @submit.prevent="nextStep(1)">
              <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" class="form-control" id="correo" placeholder="email@ejemplo.com" required v-model="formData.correo">
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="nombre" required v-model="formData.nombre">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="apellido" class="form-label">Apellido</label>
                  <input type="text" class="form-control" id="apellido" required v-model="formData.apellido">
                </div>
              </div>
              <div class="mb-3">
                <label for="dni" class="form-label">DNI</label>
                <input type="text" class="form-control" id="dni" required v-model="formData.dni">
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono / Móvil</label>
                <div class="input-group">
                  <span class="input-group-text">+54</span>
                  <input type="tel" class="form-control" id="telefono" placeholder="1123456789" v-model="formData.telefono">
                </div>
                <div class="form-check mt-2">
                  <input class="form-check-input" type="checkbox" id="celular" v-model="formData.esCelular">
                  <label class="form-check-label" for="celular">Es un celular</label>
                </div>
              </div>
              <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="promos" v-model="formData.recibirPromos">
                <label class="form-check-label" for="promos">Quiero recibir promociones por mail</label>
              </div>
              <p class="text-muted small">Factura A no disponible para productos del <strong>Market</strong></p>
              <button type="submit" class="btn btn-primary" :disabled="step > 1">Continuar</button>
            </form>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <span :class="{'badge': true, 'me-2': true, 'bg-primary': step >= 2, 'bg-secondary-grey': step < 2}">2</span>
              Domicilio y Entrega
            </h5>
            <div v-if="step >= 2">
              <p class="text-muted">Aquí irán los campos del domicilio y entrega.</p>
              <button class="btn btn-primary mt-2" @click="nextStep(2)">Continuar a Pago</button>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <span :class="{'badge': true, 'me-2': true, 'bg-primary': step >= 3, 'bg-secondary-grey': step < 3}">3</span>
              Pago
            </h5>
            <div v-if="step >= 3">
              <paymentMethod />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import paymentMethod from '@/components/paymentMethod.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const step = ref(1);
const router = useRouter();
const formData = ref({
  correo: '',
  nombre: '',
  apellido: '',
  dni: '',
  telefono: '',
  esCelular: false,
  recibirPromos: false,
});

const nextStep = (currentStep) => {
  if (currentStep === 1) {
    if (formData.value.correo && formData.value.nombre && formData.value.apellido && formData.value.dni) {
      step.value = 2;
    } else {
      alert('Por favor, completa todos los campos obligatorios.');
    }
  } else if (currentStep === 2) {
    step.value = 3;
  }
};
</script>

<style scoped>
/* Estilos que ya tenías */
.checkout-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  font-family: Arial, sans-serif;
  padding: 30px;
}

.col-md-8.order-md-0 {
  width: 70% !important;
  flex: 0 0 70% !important;
  max-width: 70% !important;
}

.col-md-4.order-md-1 {
  width: 30% !important;
  flex: 0 0 30% !important;
  max-width: 30% !important;
}

/* Nuevos estilos */
.bg-secondary-grey {
  background-color: #6c757d !important;
  color: white !important;
}

/* Estilo para mejorar visualmente el formulario */
form {
  max-width: 100%;
  margin: 0 auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

form input,
form textarea,
form select {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

form .input-group-text {
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-right: none;
}

form .form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  transition: background-color 0.2s;
}

form button:hover {
  background-color: #0056b3;
}

</style>
