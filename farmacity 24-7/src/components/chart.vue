<template>
  <ChartxDias :pedidos="pedidos" startDate="2025-01-01" endDate="2025-12-31" />
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-4">
    <div class="h-96">
       <BarChart
      :pedidos="pedidos"
      title="Total de unidades por Medicamento"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } },
        scales: {
          x: { title: { display: true, text: 'Medicamento' } },
          y: { beginAtZero: true, title: { display: true, text: 'Total Unidades' } }
        }
      }"
    />
    </div>

    <div class="h-96">
     <pedidosXEstado
      :pedidos="pedidos"
      title="Distribución de Pedidos por Estado"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }"
    />
    </div>

    <div class="h-96">
     <chartNecesitaReceta
      :pedidos="pedidos"
    :stock="stock"
      title="Pedidos con/sin Receta"
      :options="{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }"
    />
    </div>
<div class="h-96">
   <chartxDiaSemana :pedidos="pedidos" />
  
</div>
  </div>
</template>

<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
} from 'chart.js'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import BarChart from './barChart.vue'
import ChartxDias from './chartxDias.vue'
import chartxDiaSemana from './chartxDiaSemana.vue'
import pedidosXEstado from './pedidosXEstado.vue'
import chartNecesitaReceta from './chartNecesitaReceta.vue'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const pedidos = ref([])
const stock   = ref([])
const APIpedidos = 'https://683656cf664e72d28e407eab.mockapi.io/pedidos'
const APIstock   = 'https://683656cf664e72d28e407eab.mockapi.io/stock'


onMounted(async () => {
  const [pRes, sRes] = await Promise.all([
    axios.get(APIpedidos),
    axios.get(APIstock)
  ])
  pedidos.value = pRes.data
  stock.value   = sRes.data
})

</script>

