import { useMutation, useQueryClient } from '@tanstack/react-query'
import ky from 'ky'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { REPORT_TYPE } from '../constants'
import { useAuth } from '../context/authContext'
import { ReportType } from '../types'
import { getImage } from '../utils'
import Comment from './Comment'
import CommentForm from './CommentForm'

type Props = {
  report: ReportType
}

const PopupContent = ({ report }: Props) => {
  const queryClient = useQueryClient()
  const color = REPORT_TYPE.find((r) => r.value === report.type)?.color
  const label = REPORT_TYPE.find((r) => r.value === report.type)?.label

  const deleteReport = async () => {
    const { message } = await ky
      .delete(`http://localhost:3000/report/${report.id}`, {
        credentials: 'include',
      })
      .json<{ message: string }>()
    return message
  }

  const mutation = useMutation({
    mutationFn: deleteReport,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({ queryKey: ['allReports'] })
    },
  })

  const { error, loading, user } = useAuth()
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-lg font-bold">{report.title}</h2>
        {report.user.id === user?.id && (
          <div className="flex items-center gap-3 text-base">
            <button
              className="cursor-pointer text-red-500"
              onClick={() => mutation.mutate()}
            >
              <FaTrash />
            </button>
            <Link
              to={`/edit/${report.id}`}
              className="cursor-pointer text-blue-500"
            >
              <FaEdit />
            </Link>
          </div>
        )}
      </div>

      <Link to={`/profile/${user?.id}`} className="text-sm">
        {report.user.name} {report.user.lastName}
      </Link>

      <img src={getImage(report.image)} alt="" className="w-60 h-full" />
      <p className="text-base">{report.description}</p>
      <p className={`${color} font-bold text-lg`}>{label}</p>
      <div className="mb-4 flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow-md">
        {report.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
        <CommentForm reportId={report.id} />
      </div>
    </div>
  )
}
export default PopupContent
