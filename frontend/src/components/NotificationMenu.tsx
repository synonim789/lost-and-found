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

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button
        className="cursor-pointer hover:opacity-70"
        onClick={() => setOpen(!open)}
      >
        <FaBell />
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
