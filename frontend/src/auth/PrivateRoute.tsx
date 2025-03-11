import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../context/authContext'

const PrivateRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
export default PrivateRoute
