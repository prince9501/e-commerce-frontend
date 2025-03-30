import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signup`, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/signin`, userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

// Get user profile
const getProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(`${API_URL}/auth/profile`, config)
  return response.data
}

const authService = {
  register,
  login,
  logout,
  getProfile,
}

export default authService