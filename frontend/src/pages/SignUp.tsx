import { zodResolver } from '@hookform/resolvers/zod'
import ky, { HTTPError } from 'ky'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { useUser } from '../context/userContext'
import { signUpSchema, SignUpSchemaType } from '../schemas/signUp'
import { User } from '../types'

const SignUp = () => {
  const navigate = useNavigate()
  const { setUser } = useUser()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) })

  const submitHandler: SubmitHandler<SignUpSchemaType> = async ({
    email,
    password,
    lastName,
    name,
  }) => {
    try {
      const { user } = await ky
        .post('http://localhost:3000/auth/signup', {
          json: { email, passwordRaw: password, name, lastName },
          credentials: 'include',
        })
        .json<{ user: User }>()
      setUser(user)
      navigate('/')
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  return (
    <section className="h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        Lost and <span className="text-red-400">Found</span>
      </h1>
      <div className="bg-slate-900 p-5 rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-5">Sign Up</h3>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-5 w-[300px]"
        >
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Email:"
              {...register('email')}
            />
            {errors.email?.message && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Name:"
              {...register('name')}
            />
            {errors.name?.message && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Name:"
              {...register('lastName')}
            />
            {errors.lastName?.message && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="block w-full bg-slate-800 px-1 py-2 rounded-lg mt-1"
              placeholder="*******"
              {...register('password')}
            />
            {errors.password?.message && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-red-700 text py-2  px-4 rounded-xl mt-5 cursor-pointer hover:bg-red-600 transition"
          >
            Login
          </button>
          <div className="flex gap-2 text-sm mt-3 items-center justify-center">
            <p className="">Already have an account?</p>
            <Link to="/login" className="underline text-red-500">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}
export default SignUp
