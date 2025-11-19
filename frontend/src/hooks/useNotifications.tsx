import ky from 'ky'
import { useEffect, useState } from 'react'
import { NotificationType } from '../types'
import { socket } from '../utils/socket'

export const useNotifications = (userId: number | undefined) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([])
  const fetchNotifications = async () => {
    const data = await ky
      .get('http://localhost:3000/notification', { credentials: 'include' })
      .json<NotificationType[]>()
    setNotifications(data)
  }

  useEffect(() => {
    socket.connect()
    socket.emit('join', userId)
    console.log('connected')

    socket.on('notification', () => {
      console.log('notification arrived')

      fetchNotifications()
    })

    fetchNotifications()
    return () => {
      socket.disconnect()
    }
  }, [userId])

  return { notifications }
}
