// src/store/product.js

import { defineStore } from 'pinia'
import { fetchProductsMock } from '@/services/productService'
import { ref } from 'vue'

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
        for (const item of resumen) {
          const producto = this.productos.find(p => p.id === item.id)
          if (producto) {
            const nuevoStock = producto.stock - item.cant
            // // actualizamos en MockAPI, descomentar cuando el metodo put este configurado en server.
            // await axios.put(`https://mockapi.io/productos/${item.id}`, {
            //   ...producto,
            //   stock: nuevoStock //ERROR: lo que hay que hacer es gettear cada producto, actualizarlo y postearlo, o bien todo el array.
            // })
            console.log(`haciendo put de producto: ${producto.nombre} nuevo stock: ${producto.stock}`)
            // también lo actualizamos localmente
            producto.stock = nuevoStock
          }
        }
      } catch (e) {
        console.error('Error actualizando stock:', e)
        this.error = 'No se pudo actualizar el stock'
      }
    }
  }
})