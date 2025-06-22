<script setup>
import { computed } from 'vue';
import { useCartStore } from '@/store/carrito';

const carritoStore = useCartStore();

const props = defineProps({
  medicamento: {
    type: Object,
    required: true
  }
});

const cantidad = computed(() => {
  const item = carritoStore.itemsCarrito.find(p => p.id === props.medicamento.id);
  return item?.cantidad || 0;
});

const precioFinal = computed(() => {
  const { precio, descuento } = props.medicamento;
  return descuento > 0 ? precio * (1 - descuento) : precio;
});

const total = computed(() => {
  return (precioFinal.value * cantidad.value).toFixed(2);
});
</script>

<template>
  <div class="relative w-[240px] border rounded-xl shadow-md flex flex-col justify-between p-4 bg-white">
    <div v-if="medicamento.descuento > 0" class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
      -{{ (medicamento.descuento * 100).toFixed(0) }}%
    </div>

    <div>
      <img
        :src="medicamento.imagen"
        alt="Imagen del medicamento"
        class="h-[100px] w-full object-contain mb-4"
      />
      <h5 class="text-base font-semibold text-gray-800 mb-1">{{ medicamento.nombre }}</h5>

      <p class="text-sm">
        <span v-if="medicamento.descuento > 0" class="line-through text-gray-500 mr-1">${{ medicamento.precio.toFixed(2) }}</span>
        <span class="text-green-600 font-bold">${{ precioFinal.toFixed(2) }} c/u</span>
      </p>

      <p class="text-sm text-gray-700 mt-1">Cantidad: <strong>{{ cantidad }}</strong></p>

      <p class="text-sm text-gray-700">Total: <strong class="text-blue-700">${{ total }}</strong></p>

      <p class="text-xs text-gray-600 leading-snug line-clamp-3 mt-1">
        {{ medicamento.descripcion }}
      </p>
    </div>

    <button
      @click="carritoStore.retirarItem(medicamento.id)"
      class="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-md transition"
    >
      Eliminar
    </button>
  </div>
</template>
