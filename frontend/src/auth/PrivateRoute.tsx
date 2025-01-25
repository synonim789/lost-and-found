import { Navigate, Outlet } from 'react-router'

const PrivateRoute = () => {
  const user = localStorage.getItem('authToken')
  if (!user) {
    return <Navigate to="/login" />
  }
  return <Outlet />
}
export default PrivateRoute
