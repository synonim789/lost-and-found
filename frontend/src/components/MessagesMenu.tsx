import ky from 'ky'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineMessage } from 'react-icons/md'
import { RiMessage2Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router'
import { useNotifications } from '../hooks/useNotifications'
import { NotificationType } from '../types'
import Dropdown from './Dropdown'

type Props = {
  userId: number
}

const MessagesMenu = ({ userId }: Props) => {
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const { notifications: notificationsData } = useNotifications(userId)

  useEffect(() => {
    const closeDropdown = (e: Event) => {
      if (menuRef && !menuRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.body.addEventListener('click', closeDropdown)

    return () => document.body.removeEventListener('click', closeDropdown)
  }, [])

  const notifications = Array.from(
    new Map(
      notificationsData
        .filter((n) => n.type === 'new_message')
        .reverse()
        .map((n) => [n.fromUserId, n])
    ).values()
  ).slice(0, 7)

  const readedNotifications = notifications.filter((n) => n.isRead === false)

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button
        className="hover:opacity-70 cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <RiMessage2Fill className="text-lg" />
        {readedNotifications.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {readedNotifications.length}
          </span>
        )}
      </button>
      {open && (
        <Dropdown title="Messages">
          {notifications.length === 0 && (
            <p className="mt-2 p-1 font-semibold">No Messages Yet</p>
          )}
          {notifications.map((n) => {
            const navigateToConversation = async () => {
              const { data } = await ky
                .get(
                  `http://localhost:3000/message/conversation/user/${n.fromUserId}`,
                  {
                    credentials: 'include',
                  }
                )
                .json<{ data: NotificationType }>()

              if (n.isRead === false) {
                ky.put(`http://localhost:3000/notification/message/${n.id}`, {
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
        </Dropdown>
      )}
    </div>
  )
}
export default MessagesMenu
