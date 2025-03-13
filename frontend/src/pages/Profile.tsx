import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { useParams } from 'react-router'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProfileComment from '../components/ProfileComment'
import ProfileReport from '../components/ProfileReport'
import { useAuth } from '../context/authContext'
import { CommentType, ReportType, User } from '../types'

const Profile = () => {
  const { id } = useParams()
  const { user, setUser } = useAuth()

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

  const deleteUser = async () => {
    await ky.delete('http://localhost:3000/user', { credentials: 'include' })
    toast.success('User deleted succesfully')
    setUser(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full grow mt-5">
        <div className="flex justify-between">
          <h1 className="text-5xl capitalize">
            {data?.name} {data?.lastName}
          </h1>
          {user?.id === data?.id && (
            <button
              className="border-2 border-red-400 px-4 py-2 cursor-pointer rounded-full text-red-400 hover:bg-red-400 hover:text-white transition"
              onClick={deleteUser}
            >
              Delete User
            </button>
          )}
        </div>

        <div>
          <h3 className="text-3xl my-5 text-center font-bold">Reports</h3>
          {data?.reports.length === 0 && (
            <p className="text-center">This user has not added any reports</p>
          )}
          {data?.reports.map((report) => (
            <ProfileReport report={report} key={report.id} />
          ))}

          <h3 className="text-3xl my-5 text-center font-bold">Comments</h3>
          {data?.comments.length === 0 && (
            <p className="text-center">
              This user has not commented anything yet
            </p>
          )}
          <div className="flex flex-col gap-5">
            {data?.comments.map((comment) => (
              <ProfileComment comment={comment} key={comment.id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Profile
