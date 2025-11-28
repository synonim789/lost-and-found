import React from 'react'
import { MdOutlineMessage } from 'react-icons/md'
import { useNavigate } from 'react-router'
import { api } from '../api/ky'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'
import { useNotifications } from '../hooks/useNotifications'
import { NotificationType } from '../types'

const NotificationMessages = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { notifications: notificationsData } = useNotifications(user?.id)

  const notifications = Array.from(
    new Map(
      notificationsData
        .filter((n) => n.type === 'new_message')
        .reverse()
        .map((n) => [n.fromUserId, n])
    ).values()
  ).slice(0, 7)

  return (
    <div className="min-h-screen">
      <Navbar />
      {notifications.length === 0 && (
        <h2 className="text-center text-3xl font-semibold mt-5">
          No Messages Yet
        </h2>
      )}
      {notifications.map((n) => {
        const navigateToConversation = async () => {
          const { data } = await api
            .get(`message/conversation/user/${n.fromUserId}`, {
              credentials: 'include',
            })
            .json<{ data: NotificationType }>()

          if (n.isRead === false) {
            api.put(`notification/message/${n.id}`, {
              credentials: 'include',
            })
          }

          navigate(`/messages/${data.id}`)
        }

        return (
          <React.Fragment key={n.id}>
            <div
              className="flex items-center gap-5 p-1 mt-0.5 border-gray-600 cursor-pointer hover:bg-gray-600 rounded-lg"
              onClick={navigateToConversation}
            >
              <MdOutlineMessage className="text-2xl" />
              <p className="text-sm text-gray-400">{n.content}</p>
            </div>
            <div className="border-b mt-0.5 border-gray-600"></div>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default NotificationMessages
