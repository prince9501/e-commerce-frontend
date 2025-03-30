import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Get all products
const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`)
  return response.data
}

// Get single product
const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/products/${productId}`)
  return response.data
}

const productService = {
  getProducts,
  getProduct,
}

export default productService