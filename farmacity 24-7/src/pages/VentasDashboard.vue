<!-- src/pages/VentasDashboard.vue -->

<template>
  <div>
    <h2>Ventas por Producto</h2>
    <Bar :data="productoChartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import { fetchPedidos } from '@/services/productService'
import {ref, computed, onMounted} from 'vue'


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

const pedidos = ref([])

onMounted(async () => {
  pedidos.value = await fetchPedidos()
})

const totalProductos = computed(()=>{
  const resultado = {}
  for (const p of pedidos.value){
    for (const prod of p.productos){
      const id = prod.id

      if(!resultado[id]){
        resultado[id] = {... prod}
      } else {
        resultado[id].cantidad += prod.cantidad 
      }
    }
  }
  return Object.values(resultado)

})

// Preparar los datos para el gráfico
const productoChartData = computed(()=>{
  const labels= totalProductos.value.map(p => p.nombre)
  const data = totalProductos.value.map(p => p.cantidad)

  return {
    labels,
    datasets: [{
      label: 'Total por Producto',
      data,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1

    }]
  }


  
})

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