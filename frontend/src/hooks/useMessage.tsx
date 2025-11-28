import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { api } from '../api/ky'
import { Message } from '../types'
import { socket } from '../utils/socket'

const useMessage = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const getMessages = async (): Promise<Message[]> => {
    const { data } = await api
      .get(`message/${id}`, {
        credentials: 'include',
      })
      .json<{ data: Message[] }>()
    return data
  }

  const { data: messages } = useQuery({
    queryKey: ['messages', id],
    queryFn: getMessages,
    initialData: [],
  })

  useEffect(() => {
    socket.connect()
    socket.emit('join_conversation', id)

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData<Message[]>(['messages', id], (old = []) => [
        ...old,
        message,
      ])
    }

    socket.on('new_message', handleNewMessage)

    return () => {
      socket.off('new_message', handleNewMessage)
    }
  }, [id, queryClient])
  return { messages }
}
export default useMessage
