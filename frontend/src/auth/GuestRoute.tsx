import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/authContext'

const GuestRoute = () => {
  const { user } = useAuth()
  if (user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
export default GuestRoute
