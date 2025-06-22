<script setup>
import { useCartStore } from '@/store/carrito';
import { computed } from 'vue';
import { defineProps } from 'vue';
const carritoStore = useCartStore();
const props = defineProps({
  medicamento: {
    type: Object,
    required: true
  }
})
const cantidadEnCarrito = computed(() => {
  const item = carritoStore.itemsCarrito.find(p => p.id === props.medicamento.id);
  return item?.cantidad || 0;
});
function aumentarCantidad() {
  carritoStore.agregarItem(props.medicamento, 1);
}

function disminuirCantidad() {
  if (props.medicamento.cantidad > 1) {
    carritoStore.agregarItem(props.medicamento, -1);
  } else {
    carritoStore.retirarItem(props.medicamento.id);
  }
}
</script>

<template>
  <div class="flex items-center justify-between border rounded-md p-2 bg-white shadow-sm w-full max-w-sm">
    <img :src="medicamento.imagen" alt="med" class="w-12 h-12 object-contain mr-2" />

    <div class="flex-1">
      <p class="text-sm font-medium text-gray-800 truncate">{{ medicamento.nombre }}</p>
    <span v-if="medicamento.descuento > 0" class="text-gray-500 line-through mr-1">
          ${{ medicamento.precio.toFixed(2) }}
        </span>
        <span class="text-green-600">
          ${{ (medicamento.precio * (1 - medicamento.descuento)).toFixed(2) }}
        </span>
         <div class="flex items-center mt-1 space-x-2">
        <button @click="disminuirCantidad"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-2 py-0.5 text-sm">−</button>

        <span class="text-sm font-semibold">{{ cantidadEnCarrito }}</span>

        <button @click="aumentarCantidad"
          class="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-2 py-0.5 text-sm">+</button>
      </div>
    </div>

    <button @click="carritoStore.retirarItem(medicamento.id)"
      class="text-green-600 hover:green-red-800 text-xs font-semibold ml-2 transition">
      Eliminar
    </button>
  </div>
</template>

