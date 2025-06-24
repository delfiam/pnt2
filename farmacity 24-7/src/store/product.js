// src/store/product.js

import { defineStore } from 'pinia'
import { fetchProductsMock } from '@/services/productService'
import { ref } from 'vue'
import { actualizarStockDesdeResumen } from '@/services/productService'

export const useProductosStore = defineStore('productos', {
  state: () => ({
    productos: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProductos() {
      this.loading = true
      try {
        const res = await fetchProductsMock()
        this.productos = res
        console.log(this.productos)
      } catch (e) {
        this.error = 'Error cargando productos'
        console.error(e)
      } finally {
        this.loading = false
      }
    },

    async actualizarStockDesdeResumen(resumen) {
      try {
        await actualizarStockDesdeResumen (resumen)
      } catch (e) {
        console.error('Error actualizando stock:', e)
        this.error = 'No se pudo actualizar el stock'
      }
      await this.fetchProductos()
    }
  }
})