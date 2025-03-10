import { Navigate, Outlet } from 'react-router'
import { useUser } from '../context/userContext'

const GuestRoute = () => {
  const { user } = useUser()
  if (user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
export default GuestRoute
