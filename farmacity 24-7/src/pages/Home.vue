<script setup>
import medicamentosCard from '@/components/medicamentosCard.vue';
//import medicamentos from '@/assets/medicamentos.json';
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import axios from 'axios';
import Navbar from '@/components/Navbar.vue';
import { useProductosStore } from '@/store/product';
import { ref, onMounted, computed } from 'vue';
const productosStore = useProductosStore();
const medicamentos = computed(() => productosStore.productos);

onMounted(async () => {
  if (productosStore.productos.length === 0) {
    await productosStore.fetchProductos();
  }
});

</script>
<template>
  <div class="p-6">
    <img src="../assets/Farmacity_logo.png" alt="Farmacity Logo" class="w-1/5 mx-auto mb-4" />
    <div class="p-6 bg-white rounded-xl shadow mb-10">
      <h2 class="text-2xl font-bold mb-6">Con descuento</h2>


      <Swiper v-if="medicamentos.length" :modules="[Navigation]" navigation :space-between="8" :breakpoints="{
        0: { slidesPerView: 2.2, spaceBetween: 8 },
        640: { slidesPerView: 3.2, spaceBetween: 10 },
        1024: { slidesPerView: 4, spaceBetween: 12 }
      }" class="mySwiper w-full">
        <SwiperSlide v-for="(medicamento, index) in medicamentos.filter(m => m.descuento != 0)" :key="index">
          <medicamentosCard :medicamento="medicamento" />
        </SwiperSlide>
      </Swiper>
    </div>
<br>
    <div class="p-6 bg-white rounded-xl shadow mb-10">
      <h2 class="text-2xl font-bold mb-6">Sin receta</h2>


      <Swiper v-if="medicamentos.length" :modules="[Navigation]" navigation :space-between="8" :breakpoints="{
        0: { slidesPerView: 2.2, spaceBetween: 8 },
        640: { slidesPerView: 3.2, spaceBetween: 10 },
        1024: { slidesPerView: 4, spaceBetween: 12 }
      }" class="mySwiper w-full">
        <SwiperSlide v-for="(medicamento, index) in medicamentos.filter(m => m.necesita_receta == false)" :key="index">
          <medicamentosCard :medicamento="medicamento" />
        </SwiperSlide>
      </Swiper>
    </div>
<br>
  <div class="container">

    <h2>Medicamentos</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">

      <medicamentosCard v-for="medicamento in medicamentos" :key="medicamento.id" :medicamento="medicamento" />

    </div>
  </div>

  </div>
</template>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}
</style>