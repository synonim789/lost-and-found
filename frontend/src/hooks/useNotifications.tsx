import { useEffect, useState } from 'react'
import { api } from '../api/ky'
import { NotificationType } from '../types'
import { socket } from '../utils/socket'

export const useNotifications = (userId: number | undefined) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const fetchNotifications = async () => {
    const data = await api
      .get('notification', { credentials: 'include' })
      .json<NotificationType[]>()
    setNotifications(data)
  }

  useEffect(() => {
    socket.connect()
    socket.emit('join', userId)

    socket.on('notification', () => {
      fetchNotifications()
    })

    fetchNotifications()
    return () => {
      socket.disconnect()
    }
  }, [userId])

  return { notifications }
}
