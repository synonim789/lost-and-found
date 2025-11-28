import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { toast } from 'react-toastify'
import { api } from '../api/ky'
import { AddCommentSchemaType } from '../schemas/addComment'

export const useAddComment = (reportId: number, queryKey: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ text }: AddCommentSchemaType) => {
      return api
        .post(`report/${reportId}/comment`, {
          json: {
            text,
          },
          credentials: 'include',
        })
        .json<Comment>()
    },
    onSuccess: () => {
      toast.success('Comment added')
      queryClient.invalidateQueries({ queryKey: [queryKey] })
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
