import { useMutation, useQueryClient } from '@tanstack/react-query'
import ky, { HTTPError } from 'ky'
import { toast } from 'react-toastify'
import { SendMessageSchemType } from '../schemas/sendMessage'

export const useSendMessage = (receiverId: number | undefined) => {
  const queryClient = useQueryClient()
    
  return useMutation({
    mutationFn: async ({ content }: SendMessageSchemType) => {
      return ky
        .post(`http://localhost:3000/message/${receiverId}`, {
          json: {
            content,
          },
          credentials: 'include',
        })
        .json<Comment>()
    },
    onSuccess: () => {
      toast.success('Message sent added')
      queryClient.invalidateQueries({ queryKey: ['messages'] })
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
