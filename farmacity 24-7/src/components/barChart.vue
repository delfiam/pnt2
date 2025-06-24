<template>
  <div class="w-full h-80 p-4">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <Bar :data="chartData" :options="options" class="h-64" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defineProps } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale
)

const props = defineProps({
  pedidos: { type: Array, required: true },
  title: { type: String, default: 'Cantidad total por Medicamento' },
  options: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: 'Medicamento' } },
        y: { beginAtZero: true, title: { display: true, text: 'Cantidad total' } }
      }
    })
  }
})

const chartData = computed(() => {
  const grupos = {}
  props.pedidos.forEach(p => {
    grupos[p.medicamento] = (grupos[p.medicamento] || 0) + p.cantidad
  })

  return {
    labels: Object.keys(grupos),
    datasets: [
      {
        label: 'Cantidad',
        data: Object.values(grupos),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  }
})
</script>