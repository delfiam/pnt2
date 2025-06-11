<script setup>
const props = defineProps({
    medicamento: {
        type: Object,
        required: true
    }
})
</script>

<template>
 
    <div class="card">
        <img :src="medicamento.imagen" class="card-img-top" alt="Imagen del medicamento">
        <div class="card-body">
        <h5 class="card-title">{{ medicamento.nombre }}</h5>
        <p class="card-text">Precio: ${{ medicamento.precio }}</p>
        <p class="card-text">Descripción: {{ medicamento.descripcion }}</p>
        <button class="btn btn-primary" @click="$emit('agregar-al-carrito', medicamento)">Agregar al carrito</button>
        </div>
    </div>
</template>