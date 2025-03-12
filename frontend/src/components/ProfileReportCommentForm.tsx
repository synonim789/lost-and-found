import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAddComment } from '../hooks/useAddComment'
import { addCommentSchema, AddCommentSchemaType } from '../schemas/addComment'

type Props = {
  reportId: number
}

const ProfileReportCommentForm = ({ reportId }: Props) => {
  const { mutate } = useAddComment(reportId, 'userProfile')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCommentSchemaType>({
    resolver: zodResolver(addCommentSchema),
  })

  const onSubmit: SubmitHandler<AddCommentSchemaType> = async (data) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        className="border-slate-600 border-2 rounded-lg h-20 w-full p-3 resize-none mb-4"
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
export default ProfileReportCommentForm
