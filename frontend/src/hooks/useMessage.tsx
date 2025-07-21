import { useQuery, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'
import { useEffect } from 'react'
import { Message } from '../types'
import { socket } from '../utils/socket'

const useMessage = (id: string | undefined) => {
  const queryClient = useQueryClient()

  const getMessages = async (): Promise<Message[]> => {
    const { data } = await ky
      .get(`http://localhost:3000/message/${id}`, {
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
      console.log(id)

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
