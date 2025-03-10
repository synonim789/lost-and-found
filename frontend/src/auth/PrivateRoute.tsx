import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/authContext'

const PrivateRoute = () => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
export default PrivateRoute
