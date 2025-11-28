import { useState } from 'react'
import { FaRocketchat } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { api } from '../api/ky'
import { useAuth } from '../context/authContext'
import MessagesMenu from './MessagesMenu'
import MobileNavbar from './MobileNavbar'
import NotificationMenu from './NotificationMenu'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const logout = async () => {
    const { message } = await api
      .post('auth/logout', {
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
    <div className="py-2 lg:py-3 px-3 w-full border-bshadow-sm">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-semibold hover:scale-105 transition-transform"
        >
          Lost and <span className="text-red-400">Found</span>
        </Link>

        {user?.id && user?.name !== 'guestUser' ? (
          <>
            <div className="hidden md:flex items-center gap-6">
              <MessagesMenu userId={user.id} />
              <NotificationMenu userId={user.id} />
              <Link
                className="flex gap-2 items-center text-lg hover:text-red-400 transition"
                to="/messages"
              >
                <FaRocketchat />
                <span>Chat</span>
              </Link>

              <Link
                to={`/profile/${user.id}`}
                className="flex gap-2 items-center text-lg hover:text-red-400 transition"
              >
                <FiUser />
                <span>
                  {user.name} {user.lastName}
                </span>
              </Link>

              <Link
                to="/add"
                className="text-lg underline hover:text-red-400 transition"
              >
                Add Report
              </Link>

              <button
                onClick={logout}
                className="font-semibold text-lg border-2 py-1 px-3 rounded-lg hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>

            {/* HAMBURGER */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded focus:outline-none"
            >
              {!open ? (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="border-2 py-1 px-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            onClick={login}
          >
            Login
          </Link>
        )}
      </div>

      {open && user?.id && user?.name !== 'guestUser' && (
        <MobileNavbar user={user} logout={logout} />
      )}
    </div>
  )
}
export default Navbar
