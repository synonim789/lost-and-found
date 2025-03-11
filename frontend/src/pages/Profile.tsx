import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { useParams } from 'react-router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
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
    const data = await ky
      .get(`http://localhost:3000/user/${id}`, {
        credentials: 'include',
      })
      .json<User & { comments: CommentType[]; reports: ReportType[] }>()

    return data
  }

  const { data } = useQuery({ queryKey: ['userProfile'], queryFn: getUser })

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full grow mt-5">
        <h1 className="text-5xl capitalize">
          {data?.name} {data?.lastName}
        </h1>
        <div>
          <h3 className="text-3xl my-5">Reports:</h3>
          {data?.reports.length === 0 && (
            <p className="mx-auto">Reports not found</p>
          )}
          {data?.reports.map((report) => (
            <ProfileReport report={report} key={report.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Profile
