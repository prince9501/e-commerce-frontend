import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons'

const Layout = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            E-Commerce
          </Link>
          <nav className="flex items-center space-x-6">
            <Link to="/">Home</Link>
            {user ? (
              <>
                <Link to="/cart" className="relative">
                  <FontAwesomeIcon icon={faShoppingCart} />
                  {/* Cart count badge would go here */}
                </Link>
                <div className="dropdown relative">
                  <button className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{user.name}</span>
                  </button>
                  <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg hidden">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} E-Commerce Store
        </div>
      </footer>
    </div>
  )
}

export default Layout