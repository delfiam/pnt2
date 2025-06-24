<template>
  <div class="w-full h-80 p-4">
    <h2 class="text-xl font-bold mb-4">Pedidos por Día de la Semana</h2>
    <Bar :data="chartData" :options="chartOptions" class="h-64" />
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
  pedidos: { type: Array, required: true }
})

const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const porSemana = computed(() => {
  const counts = [0, 0, 0, 0, 0, 0, 0]
  props.pedidos.forEach(p => {
    const date = new Date(p.fecha)
    const dayIndex = date.getDay() // 0 (Dom) - 6 (Sáb)
    counts[dayIndex]++
  })
  return counts
})

const chartData = computed(() => ({
  labels: diasSemana,
  datasets: [
    {
      label: 'Número de Pedidos',
      data: porSemana.value,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { title: { display: true, text: 'Día de la Semana' } },
    y: { beginAtZero: true, title: { display: true, text: 'Número de Pedidos' } }
  },
  plugins: {
    legend: { position: 'top' }
  }
}
</script>


