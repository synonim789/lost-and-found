import { useEffect } from 'react'
import { FaCommentAlt } from 'react-icons/fa'
import { api } from '../api/ky'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'
import { useNotifications } from '../hooks/useNotifications'

const Notification = () => {
  const { user } = useAuth()
  const { notifications } = useNotifications(user?.id)

  const setNotificationAsRead = async () => {
    await api.put('notification/comment', {
      credentials: 'include',
    })
  }

  useEffect(() => {
    setNotificationAsRead()
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full grow mt-5 px-6">
        {notifications.length === 0 && (
          <h2 className="text-center text-3xl font-semibold mt-5">
            No Notifications Yet
          </h2>
        )}
        {notifications
          .filter((n) => n.type === 'new_comment')
          .slice(0, 7)
          .map((n) => {
            return (
              <div
                className="flex items-center gap-5 p-1 border-b border-gray-600"
                key={n.id}
              >
                <FaCommentAlt className="text-2xl" />
                <p className="text-sm text-gray-400">{n.content}</p>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Notification
