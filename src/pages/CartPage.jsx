import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import cartService from '../api/cartService'
import { toast } from 'react-toastify'

const CartPage = () => {
  const { user } = useAuth()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchCart = async () => {
      try {
        const data = await cartService.getCart(user.token)
        setCart(data.cart)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCart()
  }, [user])

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeFromCart(productId, user.token)
      setCart(cart.filter((item) => item.productId._id !== productId))
      toast.success('Item removed from cart')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to remove item')
    }
  }

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    )
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl mb-4">Your Cart is Empty</h2>
        <p className="mb-4">Please login to view your cart</p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
      </div>
    )
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-2xl mb-4">Your Cart is Empty</h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.productId._id} className="py-4 flex">
                <div className="w-24 h-24 bg-gray-200 rounded mr-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.productId.name}</h3>
                  <p>${item.productId.price} x {item.quantity}</p>
                  <p>Total: ${(item.productId.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.productId._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between text-xl font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage