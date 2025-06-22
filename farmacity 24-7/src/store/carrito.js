import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { useProductosStore } from './product'
import { crearPedido, fetchPedidos } from '@/services/productService'

export const useCartStore = defineStore('cart', {
  state: () => ({
    itemsCarrito: [],
    error: null,
    saving: false
  }),

  getters: {
    subtotal(state) {
      return state.itemsCarrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    },
    descuentoTotal(state) {
      return state.itemsCarrito.reduce((acc, p) => acc + (p.descuento * p.precio * p.cantidad), 0);
    },
    total(state) {
      return state.itemsCarrito.reduce((acc, p) => acc + ((1 - p.descuento) * p.precio) * p.cantidad, 0);
    },
    cantidadTotal(state) {
      return state.itemsCarrito.reduce((acc, p) => acc + p.cantidad, 0);
    }
  },

  actions: {
    agregarItem(producto, cantidad) {
      this.error = null;

      const productosStore = useProductosStore();
      const authStore = useAuthStore();

      if (!producto || !producto.id ) {
        this.error = 'Producto inválido o cantidad incorrecta';
        return;
      }

      if (!authStore.currentUser) {
        this.error = 'Usuario no autenticado';
        return;
      }

      const productoEnStore = productosStore.productos.find(p => p.id === producto.id);

      if (!productoEnStore) {
        this.error = `Producto ID: ${producto.id} no encontrado`;
        return;
      }

      const itemExistente = this.itemsCarrito.find(p => p.id === producto.id);
      const cantidadSolicitada = (itemExistente?.cantidad || 0) + cantidad;

      if (productoEnStore.stock < cantidadSolicitada) {
        this.error = `Stock insuficiente. Disponible: ${productoEnStore.stock}`;
        return;
      }

      if (itemExistente) {
        itemExistente.cantidad += cantidad;
      } else {
        const { id, nombre, descuento, presentacion, concentracion, precio, imagen } = productoEnStore;

        const nuevoItem = {
          id,
          nombre,
          descuento,
          presentacion,
          concentracion,
          precio,
          imagen,
          cantidad,
          username: authStore.currentUser.username,
          fecha: new Date().toISOString(),
          precioVenta: descuento > 0 && descuento < 1
            ? (precio * (1 - descuento))
            : precio
        };

        this.itemsCarrito.push(nuevoItem);
      }
    },

    retirarItem(id) {
      this.itemsCarrito = this.itemsCarrito.filter(p => p.id !== id);
    },

    async cerrarCompra() {
      this.error = null;

      if (this.itemsCarrito.length === 0) {
        this.error = 'No hay productos en el carrito';
        return [];
      }

      const productosStore = useProductosStore();
      const authStore = useAuthStore();

      if (!authStore.currentUser) {
        this.error = 'Usuario no autenticado';
        return [];
      }

      const resumen = this.itemsCarrito.map(p => ({
        id: p.id,
        cant: p.cantidad
      }));

      try {
        this.saving = true;

        await productosStore.actualizarStockDesdeResumen(resumen);

        const pedidosEnServer = await fetchPedidos();
        const currentId = pedidosEnServer.length + 1;

        const nuevoPedido = {
          id: currentId,
          productos: [...this.itemsCarrito],
          user: authStore.currentUser.username,
          fecha: new Date().toISOString()
        };

        await crearPedido(nuevoPedido);
        console.log('Transacción registrada:', nuevoPedido);

        this.itemsCarrito = [];
        return resumen;

      } catch (err) {
        console.error('Error al guardar transacción:', err);
        this.error = 'Error al guardar la transacción';
        return [];

      } finally {
        this.saving = false;
      }
    }
  },

  persist: {
    paths: ['itemsCarrito'],
    storage: localStorage
  }
});
