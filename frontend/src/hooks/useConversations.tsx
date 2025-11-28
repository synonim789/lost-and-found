import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { api } from '../api/ky'
import { Conversation } from '../types'
import { socket } from '../utils/socket'

const useConversations = () => {
  const queryClient = useQueryClient()

  const getConversations = async (): Promise<Conversation[]> => {
    const { data } = await api
      .get('message/conversation', {
        credentials: 'include',
      })
      .json<{ data: Conversation[] }>()
    return data
  }

  const { data: conversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
    initialData: [],
  })

  useEffect(() => {
    const refreshConversation = () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    }

    socket.on('new_message', refreshConversation)

    return () => {
      socket.off('new_message', refreshConversation)
    }
  }, [queryClient])

  return { conversations }
}
export default useConversations
