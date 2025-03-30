import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productService from '../api/productService'
import { useAuth } from '../contexts/AuthContext'
import cartService from '../api/cartService'
import { toast } from 'react-toastify'

const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProduct(id)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      return
    }
    try {
      await cartService.addToCart(product._id, quantity, user.token)
      toast.success('Product added to cart')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-semibold mb-4">${product.price}</div>
          <p className="mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6">
            <label className="mr-2">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border p-2 w-20"
            />
          </div>
          
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductPage