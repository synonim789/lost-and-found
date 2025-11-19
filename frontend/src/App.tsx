import { Route, Routes } from 'react-router'
import GuestRoute from './auth/GuestRoute'
import PrivateRoute from './auth/PrivateRoute'
import ChatMain from './components/ChatMain'
import ChooseConversation from './components/ChooseConversation'
import ProfileLayout from './layout/ProfileLayout'
import { AddReport } from './pages/AddReport'
import EditReport from './pages/EditReport'
import Home from './pages/Home'
import Login from './pages/Login'
import Messages from './pages/Messages'
import Notification from './pages/Notification'
import NotificationMessages from './pages/NotificationMessages'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import UpdateUser from './pages/UpdateUser'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PrivateRoute />}>
        <Route path="/add" element={<AddReport />} />

        <Route path="/notification/notifications" element={<Notification />} />
        <Route
          path="/notification/messages"
          element={<NotificationMessages />}
        />

        <Route path="/messages" element={<Messages />}>
          <Route index element={<ChooseConversation />} />
          <Route path=":id" element={<ChatMain />} />
        </Route>
        <Route path="/edit/:id" element={<EditReport />} />
        <Route path="/profile/:id" element={<ProfileLayout />}>
          <Route index element={<Profile />} />
          <Route path="update" element={<UpdateUser />} />
        </Route>
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
