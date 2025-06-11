<script setup>
import medicamentosCard from '@/components/medicamentosCard.vue';
//import medicamentos from '@/assets/medicamentos.json';

import axios from 'axios';
const medicamentos = ref([]);
import { ref, onMounted } from 'vue';
onMounted(async () => {
    try {
        const response = await axios.get('https://682d2cee4fae188947551d71.mockapi.io/stock/stock');
        medicamentos.value = response.data;
    } catch (error) {
        console.error('Error fetching medicamentos:', error);
    }
});
</script>
<template>
    <div class="container">
        <h1>Bienvenido a Farmacity</h1>
        <h2>Medicamentos</h2>
        <div class="row">
        <div class="col-md-4" v-for="medicamento in medicamentos" :key="medicamento.id">
            <medicamentosCard :medicamento="medicamento" />
        </div>
        </div>
</div>
</template>
