// src7store/carrito.js
//chequear forma de escribir (optionAPI es la que no se usa), compositionAPI (es la que se usa)
import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'
import { useProductosStore } from './product'
import { crearPedido } from '@/services/productService'
import { fetchPedidos } from '@/services/productService'

export const useCartStore = defineStore('cart', {
    state: () => ({
        itemsCarrito: [], // Array de productos en el carrito
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
            const productosStore = useProductosStore()

            if (!producto || !producto.id || cantidad <= 0) {
                this.error = 'Producto inválido o cantidad incorrecta'
                return
            }
            const itemExistente = this.itemsCarrito.find(p => p.id === producto.id)
            const cantidadSolicitada = (itemExistente?.cantidad || 0) + cantidad
            const productoEnStore = productosStore.productos.find(p => p.id === producto.id)

            if (!productoEnStore) {
                this.error = `Producto ID: ${producto.id} nombre: ${producto.nombre} no encontrado`
                return
            }

            if (productoEnStore.stock < cantidadSolicitada) {
                this.error = `Stock insuficiente. DISPONIBLE = ${producto.stock}`
                return
            }



            if (itemExistente) {
                // Si ya existe, actualizar cantidad
                itemExistente.cantidad += cantidad
            } else {
                // Si no existe, agregar al carrito              

                const authStore = useAuthStore()

                const { id,
                    nombre,
                    descuento,
                    presentacion,
                    concentracion,
                    precio,
                    imagen } = productoEnStore

                const nuevoItem = {
                    id,
                    nombre,
                    descuento,
                    presentacion,
                    concentracion,
                    precio,
                    imagen
                }

                nuevoItem.cantidad = cantidad
                nuevoItem.username = authStore.currentUser.username
                nuevoItem.fecha = new Date().toISOString()

                // calcular precio de venta
                let precioVenta = productoEnStore.precio
                if (productoEnStore.descuento && !isNaN(productoEnStore.descuento)
                    && productoEnStore.descuento > 0 && productoEnStore.descuento < 1) {
                    precioVenta = productoEnStore.precio * (1 - productoEnStore.descuento)
                }

                nuevoItem.precioVenta = precioVenta
                this.itemsCarrito.push(nuevoItem)
                // ver si fecha y usuario van por fuera del objeto, en el objeto transacción o si cada objeto los guarda

            }
        },

        retirarItem(id) {
            this.itemsCarrito = this.itemsCarrito.filter(p => p.id !== id)
        },

        async cerrarCompra() {
            if (this.itemsCarrito.length === 0) {
                this.error = 'No hay productos en el carrito'
                return []
            }

            this.saving = true
            this.error = null


            // actualizar stock local y server
            const productosStore = useProductosStore()
            
            const resumen = this.itemsCarrito.map(p => ({
                id: p.id,
                cant: p.cantidad
            }))
            await productosStore.actualizarStockDesdeResumen(resumen)

            // grabar pedido en server
            const authStore = useAuthStore()
            
            // conseguir id del pedido actual:

            const pedidosEnServer = await fetchPedidos()
            const currentId = pedidosEnServer.length + 1

            const nuevoPedido = {
                id: currentId,
                productos: [...this.itemsCarrito],
                user: authStore.currentUser.username,
                fecha: new Date().toISOString()
            }

            try {
                // // Simular log de transacciones (cambiar la URL en service y llamar al )
                await crearPedido(nuevoPedido)
                console.log('Transacción registrada: ' + JSON.stringify(nuevoPedido, null, 2))
            } catch (err) {
                console.error('Error al guardar transacción:', err)
                this.error = 'Error al guardar la transacción'
                return []
            } finally {
                this.saving = false
                this.itemsCarrito = [] // Vaciar carrito
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