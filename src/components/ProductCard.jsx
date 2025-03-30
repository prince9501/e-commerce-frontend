import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <div className="h-48 bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="font-bold">${product.price}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard