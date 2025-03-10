import ky, { HTTPError } from 'ky'
import { CgProfile } from 'react-icons/cg'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/authContext'
import { CommentType } from '../types'

type Props = {
  comment: CommentType
  getReports: () => Promise<void>
}

const Comment = ({ comment, getReports }: Props) => {
  const { user } = useAuth()
  const token = localStorage.getItem('authToken')

  const deleteComment = async () => {
    try {
      const { message } = await ky
        .delete(`http://localhost:3000/report/comment/${comment.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json<{ message: string }>()
      toast.success(message)
      await getReports()
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  return (
    <div>
      <div className="flex gap-3 items-center">
        <CgProfile className="text-3xl text-blue-600" />
        <p className="text-base font-semibold text-gray-800">
          {comment.user.name} {comment.user.lastName}
        </p>
        {user?.id === comment.userId && (
          <button
            className="text-red-500 cursor-pointer"
            onClick={async () => await deleteComment()}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <div className="mt-2">
        <p className="text-gray-700">{comment.text}</p>
      </div>
      <div className="mt-4 border-t border-gray-200"></div>
    </div>
  )
}
export default Comment
