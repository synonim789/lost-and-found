import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { api } from '../api/ky'
import ProfileComment from '../components/ProfileComment'
import ProfileReport from '../components/ProfileReport'
import { CommentType, ReportType, User } from '../types'

const Profile = () => {
  const { id } = useParams()

  const getUser = async (): Promise<
    User & {
      comments: CommentType[]
      reports: ReportType[]
    }
  > => {
    const data = await api
      .get(`user/${id}`, {
        credentials: 'include',
      })
      .json<User & { comments: CommentType[]; reports: ReportType[] }>()

    return data
  }

  const { data } = useQuery({ queryKey: ['userProfile', id], queryFn: getUser })

  return (
    <div className="p-5">
      <h3 className="text-3xl my-5 text-center font-bold">Reports</h3>
      {data?.reports.length === 0 && (
        <p className="text-center">This user has not added any reports</p>
      )}
      {data?.reports.map((report) => (
        <ProfileReport report={report} key={report.id} />
      ))}

      <h3 className="text-3xl my-5 text-center font-bold">Comments</h3>
      {data?.comments.length === 0 && (
        <p className="text-center">This user has not commented anything yet</p>
      )}
      <div className="flex flex-col gap-5">
        {data?.comments.map((comment) => (
          <ProfileComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  )
}
export default Profile
