<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Intensidad de Pedidos por Día</h2>
    <CalendarHeatmap
      :values="heatmapValues"
      :start-date="startDate"
      :end-date="endDate"
      :week-start="1"
      :cell-size="16"
      :cell-padding="4"
      default-color="#ebedf0"
      :color-scale="colorScale"
      empty-color="#ffffff"
      show-month-labels
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'
import 'vue3-calendar-heatmap/dist/style.css'
import { eachDayOfInterval, format } from 'date-fns'

const props = defineProps({
  pedidos: { type: Array, required: true },
  startDate: { type: String, default: () => {
    const d = new Date(); d.setFullYear(d.getFullYear() - 1);
    return format(d, 'yyyy-MM-dd')
  }},
  endDate: { type: String, default: () => format(new Date(), 'yyyy-MM-dd') }
})

const countsByDate = computed(() => {
  const counts = {}
  props.pedidos.forEach(p => {
    const day = format(new Date(p.fecha), 'yyyy-MM-dd')
    counts[day] = (counts[day] || 0) + 1
  })
  return counts
})

const heatmapValues = computed(() => {
  const days = eachDayOfInterval({ start: new Date(props.startDate), end: new Date(props.endDate) })
  return days.map(d => ({ date: format(d, 'yyyy-MM-dd'), count: countsByDate.value[format(d, 'yyyy-MM-dd')] || 0 }))
})

const colorScale = [
  '#ebedf0',
  '#c6e48b',
  '#7bc96f',
  '#239a3b',
  '#196127'
]
</script>

