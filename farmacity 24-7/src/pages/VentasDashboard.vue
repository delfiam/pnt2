<!-- src/pages/VentasDashboard.vue -->

<template>
  <div>
    <h2>Ventas por Producto (Simulado)</h2>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Registrar módulos necesarios para Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Datos simulados
const resumenVentas = [
  { id: 1, nombre: 'Producto A', cantidad: 10, ingresos: 2500 },
  { id: 2, nombre: 'Producto B', cantidad: 5, ingresos: 1200 },
  { id: 3, nombre: 'Producto C', cantidad: 15, ingresos: 3000 }
]

// Preparar los datos para el gráfico
const chartData = {
  labels: resumenVentas.map(p => p.nombre),
  datasets: [
    {
      label: 'Unidades Vendidas',
      backgroundColor: '#42b983',
      data: resumenVentas.map(p => p.cantidad)
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    tooltip: { enabled: true }
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Cantidad'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Producto'
      }
    }
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
}
</style>