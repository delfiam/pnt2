<script setup>
import { useCartStore } from '@/store/carrito';
const carritoStore = useCartStore();
const props = defineProps({
  medicamento: {
    type: Object,
    required: true
  }
})
</script>

<template>
   <div class="relative w-[240px] h-[360px] border rounded-xl shadow-md flex flex-col justify-between p-4 bg-white">

    <div v-if="medicamento.oferta" class="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
      -{{ medicamento.oferta }} Oferta
    </div>

    <div>
      <img
        :src="medicamento.imagen"
        alt="Imagen del medicamento"
        class="h-[100px] w-full object-contain mb-4"
      />
      <h5 class="text-base font-semibold text-gray-800 mb-1">{{ medicamento.nombre }}</h5>
      <p class="text-green-600 font-bold text-lg mb-1">
        ${{ medicamento.precio }}
      </p>
      <p class="text-xs text-gray-600 leading-snug line-clamp-3">
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
