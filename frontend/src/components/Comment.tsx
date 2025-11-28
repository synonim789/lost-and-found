import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CgProfile } from 'react-icons/cg'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { api } from '../api/ky'
import { useAuth } from '../context/authContext'
import { CommentType } from '../types'

type Props = {
  comment: CommentType
}

const Comment = ({ comment }: Props) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const deleteComment = async () => {
    const { message } = await api
      .delete(`report/comment/${comment.id}`, {
        credentials: 'include',
      })
      .json<{ message: string }>()
    return message
  }

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['allReports'] })
    },
  })

  return (
    <div>
      <div className="flex gap-3 items-center">
        <CgProfile className="text-3xl text-blue-600" />
        <p className="text-base font-semibold text-gray-500">
          {comment.user.name} {comment.user.lastName}
        </p>
        {user?.id === comment.userId && (
          <button
            className="text-red-500 cursor-pointer"
            onClick={() => mutation.mutate()}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <div className="mt-2">
        <p className="text-gray-300">{comment.text}</p>
      </div>
      <div className="mt-4 border-t border-gray-600"></div>
    </div>
  )
}
export default Comment
