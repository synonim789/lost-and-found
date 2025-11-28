import { useMutation, useQueryClient } from '@tanstack/react-query'
import { HTTPError } from 'ky'
import { CgProfile } from 'react-icons/cg'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { api } from '../api/ky'
import { useAuth } from '../context/authContext'
import { CommentType } from '../types'

type Props = {
  comment: CommentType
}

const ProfileReportComment = ({ comment }: Props) => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const deleteComment = async () => {
    try {
      const { message } = await api
        .delete(`report/comment/${comment.id}`, {
          credentials: 'include',
        })
        .json<{ message: string }>()
      toast.success(message)
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  const mutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    },
  })

  return (
    <div>
      <div className="flex gap-3 items-center">
        <CgProfile className="text-3xl text-blue-600" />
        <p className="text-base font-semibold">
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
        <p className="text-white">{comment.text}</p>
      </div>
      <div className="mt-4 border-t border-slate-600"></div>
    </div>
  )
}
export default ProfileReportComment
