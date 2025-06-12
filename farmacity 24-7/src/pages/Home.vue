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
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
    
          <medicamentosCard
        v-for="medicamento in medicamentos"
        :key="medicamento.id"
        :medicamento="medicamento"
      />
       
        </div>
</div>
</template>
