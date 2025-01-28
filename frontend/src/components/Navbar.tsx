import { Link, useNavigate } from 'react-router'

const Navbar = () => {
  const navigate = useNavigate()
  const user = localStorage.getItem('authToken')!

  const logout = () => {
    localStorage.removeItem('authToken')
    navigate('/login')
  }

  return (
    <div className="py-3 px-2  max-w-4xl flex justify-between mx-auto">
      <Link
        to="/"
        className="text-2xl font-semibold hover:scale-110 transition"
      >
        Lost and <span className="text-red-400">Found</span>
      </Link>
      {user !== 'guestUser' ? (
        <div className="flex items-center justify-center gap-4 ">
          <Link
            to="/add"
            className="text-lg underline hover:text-red-400 transition"
          >
            Add Report
          </Link>
          <button
            className="cursor-pointer font-semibold text-lg border-2 py-1 px-2 rounded-lg"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="cursor-pointer font-semibold text-lg border-2 py-1 px-2 rounded-lg"
          onClick={logout}
        >
          Login
        </Link>
      )}
    </div>
  )
}
export default Navbar
