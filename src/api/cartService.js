import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Get user's cart
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/cart`, config)
  return response.data
}

// Add to cart
const addToCart = async (productId, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `${API_URL}/cart/add`,
    { productId, quantity },
    config
  )
  return response.data
}

// Remove from cart
const removeFromCart = async (productId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(
    `${API_URL}/cart/remove`,
    { productId },
    config
  )
  return response.data
}

const cartService = {
  getCart,
  addToCart,
  removeFromCart,
}

export default cartService