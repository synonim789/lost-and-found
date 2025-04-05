import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { Link, Outlet, useParams } from 'react-router'
import { toast } from 'react-toastify'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/authContext'
import { CommentType, ReportType, User } from '../types'

const ProfileLayout = () => {
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

  const deleteUser = async () => {
    await ky.delete('http://localhost:3000/user', { credentials: 'include' })
    toast.success('User deleted succesfully')
    setUser(null)
  }

  const { data } = useQuery({ queryKey: ['userProfile'], queryFn: getUser })
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-4xl mx-auto w-full grow mt-5">
        <div className="flex justify-between">
          <h1 className="text-5xl capitalize">
            {data?.name} {data?.lastName}
          </h1>
          {user?.id === data?.id && (
            <div className="flex gap-4">
              <button
                className="border-2 border-red-400 px-4 py-2 cursor-pointer rounded-full text-red-400 hover:bg-red-400 hover:text-white transition"
                onClick={deleteUser}
              >
                Delete User
              </button>
              <Link
                to={`update`}
                className="border-2 border-blue-400 px-4 py-2 cursor-pointer rounded-full text-blue-400 hover:bg-blue-400 hover:text-white transition"
              >
                Update User
              </Link>
            </div>
          )}
        </div>

        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
export default ProfileLayout
