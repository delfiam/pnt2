<script setup>
import { useCartStore } from '@/store/carrito';
const carritoStore = useCartStore();
const props = defineProps({
  medicamento: {
    type: Object,
    required: true
  }
})
function handleAgregar() {
  carritoStore.agregarItem(props.medicamento, 1);
    if (carritoStore.error) {
    console.error('❌ Error al agregar:', carritoStore.error);
  } else {
    console.log('✅ Producto agregado:', JSON.stringify(carritoStore.itemsCarrito));
  }
}


</script>

<template>
  <div class="relative w-[240px] h-[360px] border rounded-xl shadow-md flex flex-col justify-between p-4 bg-white">

    <div v-if="medicamento.oferta"
      class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
      -{{ medicamento.oferta }} Oferta
    </div>

    <div>
      <img :src="medicamento.imagen" alt="Imagen del medicamento" class="h-[100px] w-full object-contain mb-4" />
      <h5 class="text-base font-semibold text-gray-800 mb-1">{{ medicamento.nombre }}</h5>
      <p class="text-green-600 font-bold text-lg mb-1">
        <span v-if="medicamento.descuento && medicamento.descuento > 0">
          <span class="line-through text-gray-500 mr-1">${{ medicamento.precio.toFixed(2) }}</span>
          ${{ (medicamento.precio * (1 - medicamento.descuento)).toFixed(2) }}
        </span>
        <span v-else>
          ${{ medicamento.precio.toFixed(2) }}
        </span>
      </p>

      <p class="text-xs text-gray-600 leading-snug line-clamp-3">
        {{ medicamento.descripcion }}
      </p>
    </div>

    <button @click="handleAgregar "
      class="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-md transition">
      Agregar al carrito
    </button>
  </div>
</template>
