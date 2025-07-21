import { Outlet } from 'react-router'
import ChatSidebar from '../components/ChatSidebar'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'

const Messages = () => {
  const { user } = useAuth()

  if (!user) {
    return
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className=" mx-auto max-w-5xl w-full grow mt-5">
        <div className="flex gap-5 bg-slate-700 rounded-xl p-3 min-h-[500px]">
          <ChatSidebar userId={user.id} />
          <div className="w-px bg-slate-500 self-stretch" />
          <div className="flex-1 flex items-end justify-center">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Messages
