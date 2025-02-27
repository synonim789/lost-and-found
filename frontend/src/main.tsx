import 'leaflet/dist/leaflet.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import GuestRoute from './auth/GuestRoute'
import PrivateRoute from './auth/PrivateRoute'
import { UserProvider } from './context/userContext'
import './index.css'
import { AddReport } from './pages/AddReport'
import EditReport from './pages/EditReport'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddReport />} />
            <Route path="/edit/:id" element={<EditReport />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<GuestRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
        <ToastContainer theme="dark" />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
)
