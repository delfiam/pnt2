<template>
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
            <div v-if="step === 2">
                <form @submit.prevent="nextStep(2)">
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
            <div v-else-if="step < 2">
              <p class="text-muted">Completa el paso 1 para acceder al Domicilio y Entrega.</p>
            </div>
            <div v-else>
                <p><strong>Provincia:</strong> {{ formData.provincia }}</p>
                <p><strong>País:</strong> {{ formData.pais }}</p>
                <p><strong>Barrio:</strong> {{ formData.barrio }}</p>
                <p><strong>Dirección:</strong> {{ formData.calle }} {{ formData.altura }}, {{ formData.pisoDepto ? 'Piso/Depto: ' + formData.pisoDepto : '' }}</p>
                <button class="btn btn-secondary mt-2" @click="step = 2">Editar Domicilio</button>
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
  provincia: 'CABA',
  pais: 'Argentina',
  barrio: '',
  calle: '',
  altura: '',
  pisoDepto: ''
});

const barriosCABA = [
    "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano",
    "Boedo", "Caballito", "Chacarita", "Coghlan", "Colegiales",
    "Comuna 1 (Retiro, San Nicolás, Puerto Madero, San Telmo, Montserrat, Constitución)",
    "Comuna 2 (Recoleta)",
    "Comuna 3 (Balvanera, San Cristóbal)",
    "Comuna 4 (La Boca, Barracas, Parque Patricios, Nueva Pompeya)",
    "Comuna 5 (Almagro, Boedo)",
    "Comuna 6 (Caballito)",
    "Comuna 7 (Flores, Parque Chacabuco)",
    "Comuna 8 (Villa Soldati, Villa Lugano, Villa Riachuelo)",
    "Comuna 9 (Parque Avellaneda, Liniers, Mataderos)",
    "Comuna 10 (Floresta, Monte Castro, Vélez Sarsfield, Villa Luro, Versalles, Villa Real)",
    "Comuna 11 (Villa Devoto, Villa del Parque, Villa Santa Rita, Villa General Mitre)",
    "Comuna 12 (Coghlan, Saavedra, Villa Urquiza, Villa Pueyrredón)",
    "Comuna 13 (Belgrano, Núñez, Colegiales)",
    "Comuna 14 (Palermo)",
    "Comuna 15 (Villa Crespo, Chacarita, La Paternal, Villa Ortúzar, Agronomía, Parque Chas)",
    "Constitución", "Flores", "Floresta", "La Boca", "La Paternal",
    "Liniers", "Mataderos", "Monte Castro", "Monserrat", "Nueva Pompeya",
    "Núñez", "Palermo", "Parque Avellaneda", "Parque Chacabuco", "Parque Chas",
    "Parque Patricios", "Puerto Madero", "Recoleta", "Retiro", "Saavedra",
    "San Cristóbal", "San Nicolás", "San Telmo", "Versalles", "Villa Crespo",
    "Villa del Parque", "Villa Devoto", "Villa General Mitre", "Villa Lugano",
    "Villa Luro", "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo",
    "Villa Santa Rita", "Villa Soldati", "Villa Urquiza", "Vélez Sarsfield"
];

const nextStep = (currentStep) => {
  if (currentStep === 1) {
    if (formData.value.correo && formData.value.nombre && formData.value.apellido && formData.value.dni) {
      step.value = 2;
    } else {
      alert('Por favor, completa todos los campos obligatorios del paso 1.');
    }
  } else if (currentStep === 2) {
    if (formData.value.barrio && formData.value.calle && formData.value.altura) {
        step.value = 3;
    } else {
        alert('Por favor, completa todos los campos obligatorios de Domicilio y Entrega.');
    }
  }
};
</script>

<style scoped>
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

.bg-secondary-grey {
  background-color: #6c757d !important;
  color: white !important;
}

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

.form-check .form-check-input {
    width: auto;
    margin-right: 0.5em;
    margin-bottom: 0;
    flex-shrink: 0;
}

.form-check .form-check-label {
    margin-bottom: 0;
    display: inline-block;
    vertical-align: middle;
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