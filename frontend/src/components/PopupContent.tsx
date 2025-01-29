import ky, { HTTPError } from 'ky'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { REPORT_TYPE } from '../constants'
import { useUser } from '../context/userContext'
import { ReportType } from '../types'
import { getImage } from '../utils'
import Comment from './Comment'
import CommentForm from './CommentForm'

type Props = {
  report: ReportType
  getReports: () => Promise<void>
}

const PopupContent = ({ report, getReports }: Props) => {
  const color = REPORT_TYPE.find((r) => r.value === report.type)?.color
  const label = REPORT_TYPE.find((r) => r.value === report.type)?.label

  console.log(report)

  const token = localStorage.getItem('authToken')

  const deleteReport = async () => {
    try {
      const { message } = await ky
        .delete(`http://localhost:3000/report/${report.id}`, {
          headers: { Authorization: `Bearer ${token}` },
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

  const { error, loading, user } = useUser()
  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{report.title}</h2>
        {report.user.id === user?.id && (
          <div className="flex items-center gap-3 text-base">
            <button
              className="cursor-pointer text-red-500"
              onClick={async () => await deleteReport()}
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

      <p className="text-sm">
        {report.user.name} {report.user.lastName}
      </p>

      <img src={getImage(report.image)} alt="" className="w-60 h-full" />
      <p className="text-base">{report.description}</p>
      <p className={`${color} font-bold text-lg`}>{label}</p>
      <div className="mb-4 flex flex-col gap-4 bg-gray-50 p-4 rounded-lg shadow-md">
        {report.comments.map((comment) => (
          <Comment comment={comment} />
        ))}
        <CommentForm reportId={report.id} getReports={getReports} />
      </div>
    </div>
  )
}
export default PopupContent
