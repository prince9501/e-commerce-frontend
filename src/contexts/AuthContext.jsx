import { createContext, useState, useEffect, useContext } from 'react'
import authService from '../api/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const userFromStorage = localStorage.getItem('user')
      if (userFromStorage) {
        const parsedUser = JSON.parse(userFromStorage)
        try {
          const userData = await authService.getProfile(parsedUser.token)
          setUser({ ...parsedUser, ...userData })
        } catch (error) {
          logout()
        }
      }
      setIsLoading(false)
    }
    initializeAuth()
  }, [])

  const login = async (email, password) => {
    const userData = await authService.login({ email, password })
    setUser(userData)
    return userData
  }

  const register = async (name, email, password) => {
    const userData = await authService.register({ name, email, password })
    setUser(userData)
    return userData
  }

  const logout = () => {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Default export (keep if needed by other files)
export default AuthContext