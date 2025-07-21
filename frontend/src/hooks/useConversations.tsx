import { useQuery, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'
import { useEffect } from 'react'
import { Conversation } from '../types'
import { socket } from '../utils/socket'

const useConversations = () => {
  const queryClient = useQueryClient()

  const getConversations = async (): Promise<Conversation[]> => {
    const { data } = await ky
      .get('http://localhost:3000/message/conversation', {
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
      console.log('it should refresh')

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
