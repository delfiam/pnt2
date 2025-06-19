// src/services/userService.js

import axios from 'axios';

const API_URL = 'https://682d2cee4fae188947551d71.mockapi.io/stock/stock';
const API_URL_PEDIDOS = `https://6848c71c45f4c0f5ee6f1594.mockapi.io/Pedidos/pedidos`

export async function fetchProductsMock() {
  try{
    const products = await axios.get(API_URL);
    return products.data
  } catch (error){
    console.error('Error fetching products', error)
    throw error
  }
}

export async function crearPedido(transaccion){
    try{
        const response = await axios.post(API_URL_PEDIDOS,transaccion)
        return response.data
    } catch (error){
        console.error (`error al guardar la transacción ${error}`)
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

export async function patchEstadoPedido(idPedido,nuevoEstado) {
  try {
    const PATCH_URL_PEDIDO = `${API_URL_PEDIDOS}/${idPedido}`
    const response = await axios.patch(PATCH_URL_PEDIDO, {estado:nuevoEstado})
    return response.data
  } catch (error) {
    console.error(`Error al modificar pedido id: ${idPedido}:`, error)
    throw error
  }
}
