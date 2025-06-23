// src/services/userService.js

import axios from 'axios';

const API_URL = 'https://683656cf664e72d28e407eab.mockapi.io/stock';
//const API_URL_PEDIDOS = `https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos`
const API_URL_PEDIDOS = `https://683656cf664e72d28e407eab.mockapi.io/pedidos`

export async function fetchProductsMock() {
  try {
    const products = await axios.get(API_URL);
    return products.data
  } catch (error) {
    console.error('Error fetching products', error)
    throw error
  }
}

export async function crearPedido(transaccion) {
  try {
    const response = await axios.post(API_URL_PEDIDOS, transaccion)
    console.log(`pedido Guardado id: ${response.data.id}` )
    localStorage.setItem('pedidoActivo', response.data.id)
    return response.data
  } catch (error) {
    console.error(`error al guardar la transacción ${error}`)
    throw error
  }
}

export async function fetchPedidos() {
  try {
    const response = await axios.get(API_URL_PEDIDOS)
    return response.data
  } catch (error) {
    console.error('Error al obtener transacciones:', error)
    throw error
  }
}

export async function patchEstadoPedido(idPedido, nuevoEstado) {
  try {
    const pedidoToPAtch = await getPedidoXid(idPedido)
    const nuevoPedido = { ...pedidoToPAtch, estado: nuevoEstado }
    await putPedido(nuevoPedido)
  } catch (error) {
    console.error((`Error al modificar estado en pedido id: ${idPedido}:`, error))
    throw error
  }
}
export async function actualizarStockDesdeResumen(resumen) {
  for (const item of resumen) {
    const productoToPatch = await getProductoXId(item.id)
    if (!productoToPatch) {
      console.error(`no se encontró el producto id: ${item.id}`)
      return
    } 
    if (productoToPatch.stock < item.cantidad) {
      console.error(`no hay suficiente stock de producto: ${productoToPatch.nombre} id: ${item.id}`)
      return
    }    
      const nuevoStock = productoToPatch.stock - item.cantidad
      const nuevoProducto = { ...productoToPatch, stock: nuevoStock }
      console.log(nuevoProducto)
      const response = await putProducto(nuevoProducto)
      console.log(response)
    
  }
}

  export async function patchDireccion(idPedido, barrio, calle, altura, pisoDpto) {
    try {
      const pedidoToPAtch = await getPedidoXid(idPedido)
      const nuevaDireccion = `${calle} ${altura} - ${pisoDpto} - ${barrio}`
      const nuevoPedido = { ...pedidoToPAtch, direccion: nuevaDireccion }

      await putPedido(nuevoPedido)
    } catch (error) {
      console.error((`Error al modificar dirección en pedido id: ${idPedido}:`, error))
      throw error
    }
  }

  async function getPedidoXid(idPedido) {
    //const pedidoEncontrado = null
    console.log(`id pedido: ${idPedido}`)
    const GET_URL_PEDIDO = `${API_URL_PEDIDOS}/${idPedido}`
    try {
      const response = await axios.get(GET_URL_PEDIDO)
      return response.data
    } catch (error) {
      console.error((`Error al buscar pedido id: ${idPedido}:`, error))
      throw error
    }
  }

  async function putPedido(pedido) {
    try {
      const PUT_URL_PEDIDO = `${API_URL_PEDIDOS}/${pedido.id}`
      const response = await axios.put(PUT_URL_PEDIDO, pedido)
      return response
    } catch (error) {
      console.error(`Error al modificar pedido id: ${pedido.id}:`, error)
      throw error
    }
  }

  async function putProducto(producto) {
    try {
      const PUT_URL_PRODUCTO = `${API_URL}/${producto.id}`
      const response = await axios.put(PUT_URL_PRODUCTO, producto)
      return response
    } catch (error) {
      console.error(`Error al modificar pedido id: ${producto.id}:`, error)
      throw error
    }
  }
  
  
  async function getProductoXId(idProducto) {
    //const productoEncontrado = null
    const GET_URL_PRODUCTO = `${API_URL}/${idProducto}`
    try {
      const response = await axios.get(GET_URL_PRODUCTO)
      return response.data
    } catch (error) {
      console.error((`Error al buscar producto id: ${idPedido}:`, error))
      throw error
    }
  }
  

    
  







