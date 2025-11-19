import { FaBell, FaRocketchat } from 'react-icons/fa'
import { FiUser } from 'react-icons/fi'
import { RiMessage2Fill } from 'react-icons/ri'
import { Link } from 'react-router'
import { useNotifications } from '../hooks/useNotifications'
import { User } from '../types'

type Props = {
  user: User
  logout: () => Promise<void>
}

const MobileNavbar = ({ user, logout }: Props) => {
  const { notifications } = useNotifications(user.id)

  const readedNotifications = notifications
    .filter((n) => n.type === 'new_comment')
    .filter((n) => n.isRead === false)

  const messageNotification = Array.from(
    new Map(
      notifications
        .filter((n) => n.type === 'new_message')
        .reverse()
        .map((n) => [n.fromUserId, n])
    ).values()
  ).slice(0, 7)

  const readedMessageNotifications = messageNotification.filter(
    (n) => n.isRead === false
  )

  return (
    <div className="md:hidden mt-4 flex flex-col items-center gap-5 pb-3 animate-fadeIn">
      <Link to="/notification/messages" className="flex items-center gap-4">
        <div className="relative">
          <RiMessage2Fill className="text-lg" />
        </div>
        {readedMessageNotifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {readedMessageNotifications.length}
          </span>
        )}
        Messages
      </Link>
      <Link
        to="/notification/notifications"
        className="flex items-center gap-4"
      >
        <div className="relative">
          <FaBell />
          {readedNotifications.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {readedNotifications.length}
            </span>
          )}
        </div>
        Notifications
      </Link>

      <Link
        className="flex gap-2 items-center text-lg hover:text-red-400 transition"
        to="/messages"
      >
        <FaRocketchat />
        <span>Chat</span>
      </Link>

      <Link
        to={`/profile/${user.id}`}
        className="flex gap-2 items-center text-lg hover:text-red-400 transition"
      >
        <FiUser />
        <span>
          {user.name} {user.lastName}
        </span>
      </Link>

      <Link
        to="/add"
        className="text-lg underline hover:text-red-400 transition"
      >
        Add Report
      </Link>

      <button
        onClick={logout}
        className="font-semibold text-lg border-2 py-1 px-3 rounded-lg hover:bg-gray-100 transition"
      >
        Logout
      </button>
    </div>
  )
}

export default MobileNavbar
