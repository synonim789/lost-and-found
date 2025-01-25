import { Navigate, Outlet } from 'react-router'

const GuestRoute = () => {
  const user = localStorage.getItem('authToken')
  if (user) {
    return <Navigate to="/" />
  }
  return <Outlet />
}
export default GuestRoute
