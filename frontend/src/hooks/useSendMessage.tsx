import { useMutation, useQueryClient } from '@tanstack/react-query'
import ky, { HTTPError } from 'ky'
import { toast } from 'react-toastify'
import { SendMessageSchemType } from '../schemas/sendMessage'
import { Message } from '../types'

export const useSendMessage = (conversationId: string | undefined) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ content }: SendMessageSchemType) => {
      return ky
        .post(`http://localhost:3000/message/${conversationId}`, {
          json: {
            content,
          },
          credentials: 'include',
        })
        .json<Message>()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
    },
    onError: async (err) => {
      if (err instanceof HTTPError) {
        const errorJson = await err.response.json<{ message: string }>()
        toast.error(errorJson.message)
      } else {
        toast.error('Something went wrong')
      }
    },
  })
}
