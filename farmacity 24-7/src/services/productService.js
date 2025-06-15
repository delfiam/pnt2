// src/services/userService.js

import axios from 'axios';

const API_URL = 'https://682d2cee4fae188947551d71.mockapi.io/stock/stock';

export async function fetchProductsMock() {
  try{
    const products = await axios.get(API_URL);
    return products.data
  } catch (error){
    console.error('Error fetching products', error)
    throw error
  }
}