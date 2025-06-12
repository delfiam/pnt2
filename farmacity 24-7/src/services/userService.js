// src/services/userService.js

import axios from 'axios';

const API_URL = 'https://www.mockachino.com/67b72957-8d8b-4d/users';

export async function fetchUsers() {
  try{
    const users = await axios.get(API_URL);
    return users.data
  } catch (error){
    console.error('Error fetching users', error)
    throw error
  }
}