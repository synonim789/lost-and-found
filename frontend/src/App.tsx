import { useQueryClient } from '@tanstack/react-query'
import { Route, Routes } from 'react-router'
import GuestRoute from './auth/GuestRoute'
import PrivateRoute from './auth/PrivateRoute'
import { AddReport } from './pages/AddReport'
import EditReport from './pages/EditReport'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'



const App = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddReport />} />
        <Route path="/edit/:id" element={<EditReport />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<GuestRoute />}>
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  )
}
export default App
