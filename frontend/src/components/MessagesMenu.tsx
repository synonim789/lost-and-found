import { useEffect, useRef, useState } from 'react'
import { MdOutlineMessage } from 'react-icons/md'
import { RiMessage2Fill } from 'react-icons/ri'
import { useNotifications } from '../hooks/useNotifications'
import Dropdown from './Dropdown'

type Props = {
  userId: number
}

const MessagesMenu = ({ userId }: Props) => {
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
        className="hover:opacity-70 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <RiMessage2Fill className="text-lg" />
      </button>
      {open && (
        <Dropdown title="Messages">
          {notifications
            .filter((n) => n.type === 'new_message')
            .slice(0, 7)
            .map((n) => {
              return (
                <div
                  className="flex items-center gap-5 p-1 border-b border-gray-600"
                  key={n.id}
                >
                  <MdOutlineMessage className="text-2xl" />
                  <p className="text-sm text-gray-400">{n.content}</p>
                </div>
              )
            })}
        </Dropdown>
      )}
    </div>
  )
}
export default MessagesMenu
