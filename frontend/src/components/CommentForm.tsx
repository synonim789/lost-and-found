import { zodResolver } from '@hookform/resolvers/zod'
import ky, { HTTPError } from 'ky'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { addCommentSchema, AddCommentSchemaType } from '../schemas/addComment'

type Props = {
  reportId: number
  getReports: () => Promise<void>
}

const CommentForm = ({ reportId, getReports }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentSchemaType>({ resolver: zodResolver(addCommentSchema) })
  const token = localStorage.getItem('authToken')

  const addComment: SubmitHandler<AddCommentSchemaType> = async ({ text }) => {
    try {
      await ky
        .post(`http://localhost:3000/report/${reportId}/comment`, {
          json: {
            text,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json<Comment>()
      await getReports()
      toast.success('comment added')
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(addComment)}>
      <textarea
        className="border-gray-200 border-2 rounded-lg h-20 w-full p-3 resize-none mb-4"
        placeholder="Write your comment here..."
        {...register('text')}
      />
      {errors.text?.message && (
        <p className="text-red-400">{errors.text.message}</p>
      )}
      <button className="w-full bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer">
        Add Comment
      </button>
    </form>
  )
}
export default CommentForm
