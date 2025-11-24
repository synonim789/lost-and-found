import { zodResolver } from '@hookform/resolvers/zod'
import ky, { HTTPError } from 'ky'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import { useAuth } from '../context/authContext'
import { updateUserSchema, UpdateUserSchemaType } from '../schemas/updateUser'

const UpdateUser = () => {
  const { user } = useAuth()
  const { id: userId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: user?.name,
      lastName: user?.lastName,
    },
  })

  if (!user) {
    return
  }

  if (user?.id !== Number(userId)) {
    navigate(`/profile/${userId}`)
  }

  const submitHandler: SubmitHandler<UpdateUserSchemaType> = async ({
    lastName,
    name,
  }) => {
    try {
      const { message } = await ky
        .put('http://localhost:3000/user', {
          json: { name, lastName },
          credentials: 'include',
        })
        .json<{ message: string }>()
      toast.success(message)
      navigate(`/profile/${userId}`)
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  return (
    <div className="flex flex-col">
      <h3 className="text-3xl my-5 font-bold text-center">Update</h3>
      <form
        className="flex items-center flex-col p-5"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full lg:w-120">
          <div className="w-full">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Name"
              {...register('name')}
            />
            {errors.name?.message && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Last Name"
              {...register('lastName')}
            />
            {errors.lastName?.message && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-red-700 text py-2 px-4 rounded-xl mt-8 lg:mt-5 cursor-pointer hover:bg-red-600 transitio w-full n lg:w-120"
        >
          Update User
        </button>
      </form>
    </div>
  )
}
export default UpdateUser
