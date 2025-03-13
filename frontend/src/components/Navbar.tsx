import ky from 'ky'
import { FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../context/authContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const logout = async () => {
    const { message } = await ky
      .post('http://localhost:3000/auth/logout', {
        credentials: 'include',
      })
      .json<{ message: string }>()
    setUser(null)
    toast.success(message)
    navigate('/login')
  }

  const login = () => {
    setUser(null)
  }

  return (
    <div className="py-3 px-2 w-full  max-w-4xl flex justify-between mx-auto">
      <Link
        to="/"
        className="text-2xl font-semibold hover:scale-110 transition"
      >
        Lost and <span className="text-red-400">Found</span>
      </Link>
      {user?.name !== 'guestUser' ? (
        <div className="flex items-center justify-center gap-4 ">
          <Link
            to={`/profile/${user?.id}`}
            className="flex gap-2 items-center text-lg hover:text-red-400"
          >
            <FiUser />

            <div>
              {user?.name} {user?.lastName}
            </div>
          </Link>
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
          onClick={login}
        >
          Login
        </Link>
      )}
    </div>
  )
}
export default Navbar
