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
    default: 'Distribución Productos con/sin Receta'
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
  const counts = { "Con receta": 0, "Sin receta": 0 }
  props.pedidos.forEach(pedido => {
    pedido.productos.forEach(prod => {
      if (prod.necesita_receta) counts["Con receta"]++
      else counts["Sin receta"]++
    })
  })

  return {
    labels: ["Sin receta", "Con receta"],
    datasets: [
      {
        label: 'Productos por receta',
        data: [counts["Sin receta"], counts["Con receta"]],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',  
          'rgba(255, 99, 132, 0.6)'  
        ],
        borderWidth: 1
      }
    ]
  }
})
</script>

