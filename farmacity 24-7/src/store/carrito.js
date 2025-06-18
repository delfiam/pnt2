// src7store/carrito.js
//chequear forma de escribir (optionAPI es la que no se usa), compositionAPI (es la que se usa)
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { useProductosStore } from './product'

export const useCartStore = defineStore('cart', {
    state: () => ({
        productos: [], // Array de productos en el carrito
        error: null,   // Para manejar errores
        saving: false,  // Estado de carga durante la compra
    }),
    getters: {
        subtotal(state) {
            return state.productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
        },
        descuentoTotal(state) {
            return state.productos.reduce((acc, p) => acc + (p.descuento * p.precio * p.cantidad), 0);
        },
        total(state) {
            return state.productos.reduce((acc, p) => acc + ((1 - p.descuento) * p.precio) * p.cantidad, 0);
        },
        cantidadTotal(state) {
            return state.productos.reduce((acc, p) => acc + p.cantidad, 0);
        }
    },
    actions: {
        agregarItem(producto, cantidad) {
            this.error = null

            if (!producto || !producto.id || cantidad <= 0) {
                this.error = 'Producto inválido o cantidad incorrecta'
                return
            }

            const existente = this.productos.find(p => p.id === producto.id)
            if (existente) {
                // Si ya existe, actualizar cantidad
                existente.cantidad += cantidad
            } else {
                // Si no existe, agregar al carrito
                this.productos.push({
                    ...producto,
                    cantidad: cantidad
                })
                console.log('Producto agregado al carrito:', this.productos)
            }
        },

        retirarItem(id) {
            this.productos = this.productos.filter(p => p.id !== id)
            console.log(this.productos)
        },

        async cerrarCompra() {
            if (this.productos.length === 0) {
                this.error = 'No hay productos en el carrito'
                return []
            }

            this.saving = true
            this.error = null

            const authStore = useAuthStore()

            const resumen = this.productos.map(p => ({
                id: p.id,
                cant: p.cantidad
            }))
            const productosStore = useProductosStore()
            await productosStore.actualizarStockDesdeResumen(resumen)

            const transaccion = {
                productos: [...this.productos],
                user: authStore.currentUser,
                fecha: new Date().toISOString()
            }

            try {
                // // Simular log de transacciones (podés cambiar la URL o guardarlo local si es mock)
                // await axios.post('https://jsonplaceholder.typicode.com/posts', transaccion)
                console.log('Transacción registrada: ' + JSON.stringify(transaccion, null, 2))
            } catch (err) {
                console.error('Error al guardar transacción:', err)
                this.error = 'Error al guardar la transacción'
                return []
            } finally {
                this.saving = false
                this.productos = [] // Vaciar carrito
            }

            return resumen
        }
    },
      persist: {
    paths: ['productos'], 
    storage: localStorage  
  }

}
)