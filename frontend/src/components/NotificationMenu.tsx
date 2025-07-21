import ky from 'ky'
import { useEffect, useRef, useState } from 'react'
import { FaBell, FaCommentAlt } from 'react-icons/fa'
import { useNotifications } from '../hooks/useNotifications'
import Dropdown from './Dropdown'

type Props = {
  userId: number
}

const NotificationMenu = ({ userId }: Props) => {
  const [open, setOpen] = useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const { notifications } = useNotifications(userId)

  useEffect(() => {
    const closeDropdown = (e: Event) => {
      if (menuRef && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    return () => document.body.removeEventListener('click', closeDropdown)
  }, [])

  const setNotificationAsRead = async () => {
    await ky.put('http://localhost:3000/notification/comment', {
      credentials: 'include',
    })
  }

  const readedNotifications = notifications
    .filter((n) => n.type === 'new_comment')
    .filter((n) => n.isRead === false)

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button
        className="cursor-pointer hover:opacity-70 relative"
        onClick={() => {
          setOpen(!open)
          setNotificationAsRead()
        }}
      >
        <FaBell />
        {readedNotifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {readedNotifications.length}
          </span>
        )}
      </button>
      {open && (
        <Dropdown title="Notifications">
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
        </Dropdown>
      )}
    </div>
  )
}
export default NotificationMenu
