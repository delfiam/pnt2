<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 p-4">
    <div class="h-96">
      <h2 class="text-xl font-bold mb-2">Cantidad por Cliente</h2>
      <Bar :data="barChartData" :options="chartOptions" />
    </div>

    <div class="h-96">
      <h2 class="text-xl font-bold mb-2">Cantidad Acumulada</h2>
      <Line :data="lineChartData" :options="chartOptions" />
    </div>

    <div class="h-96">
      <h2 class="text-xl font-bold mb-2">Distribución por Estado</h2>
      <Pie :data="pieChartData" :options="chartOptions" />
    </div>
<div class="h-96">
  <h2 class="text-xl font-bold mb-2">Cantidad por Medicamento</h2>
  <Bar :data="medicamentoChartData" :options="horizontalBarOptions" />
</div>

  </div>
</template>

<script setup>
import { Bar, Line, Pie } from 'vue-chartjs'
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
const API = 'https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos'

onMounted(async () => {
  const res = await axios.get(API)
  pedidos.value = res.data
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const barChartData = computed(() => ({
  labels: pedidos.value.map(p => p.cliente),
  datasets: [
    {
      label: 'Cantidad por Cliente',
      data: pedidos.value.map(p => p.cantidad),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }
  ]
}))

const lineChartData = computed(() => ({
  labels: pedidos.value.map(p => `ID ${p.id}`),
  datasets: [
    {
      label: 'Cantidad acumulada',
      data: pedidos.value.reduce((acc, curr, i) => {
        acc.push((acc[i - 1] || 0) + curr.cantidad)
        return acc
      }, []),
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)',
      tension: 0.1
    }
  ]
}))
const medicamentoChartData = computed(() => {
  const grupos = {}
  pedidos.value.forEach(p => {
    grupos[p.medicamento] = (grupos[p.medicamento] || 0) + p.cantidad
  })

  return {
    labels: Object.keys(grupos),
    datasets: [
      {
        label: 'Cantidad por Medicamento',
        data: Object.values(grupos),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  }
})

const horizontalBarOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true
    }
  }
}


const pieChartData = computed(() => {
  const counts = { without: 0, with: 0 }

  pedidos.value.forEach(pedido => {
    pedido.productos.forEach(prod => {
      if (prod.necesita_receta) counts.with += 1
      else counts.without += 1
    })
  })

  return {
    labels: ['Sin receta', 'Con receta'],
    datasets: [
      {
        label: 'Medicamentos',
        data: [counts.without, counts.with],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',  
          'rgba(255, 99, 132, 0.6)'   
        ],
        borderWidth: 1
      }
    ]
  }
})

</script>

