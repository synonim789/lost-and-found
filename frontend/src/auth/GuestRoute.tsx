import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/authContext'

const GuestRoute = () => {
  const { user, loading } = useAuth()
  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
export default GuestRoute
