<template>
  <div class="w-full h-80 p-4">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <Pie :data="chartData" :options="options" class="h-64" />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController
)

const props = defineProps({
  pedidos: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Distribución por Estado'
  },
  options: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' }
      }
    })
  }
})

const chartData = computed(() => {
  const counts = { pendiente: 0, 'en camino': 0, entregado: 0 }
  props.pedidos.forEach(p => {
    if (counts[p.estado] !== undefined) {
      counts[p.estado] += 1
    }
  })

  return {
    labels: ['Pendiente', 'En camino', 'Entregado'],
    datasets: [
      {
        label: 'Pedidos por Estado',
        data: [counts.pendiente, counts['en camino'], counts.entregado],
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)', 
          'rgba(54, 162, 235, 0.6)',  
          'rgba(75, 192, 192, 0.6)'   
        ],
        borderWidth: 1
      }
    ]
  }
})
</script>

