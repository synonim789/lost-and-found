import { zodResolver } from '@hookform/resolvers/zod'
import ky, { HTTPError } from 'ky'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { loginSchema, LoginSchemaType } from '../schemas/login'

const Login = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(loginSchema) })

  const submitHandler: SubmitHandler<LoginSchemaType> = async ({
    email,
    password,
  }) => {
    try {
      const { token } = await ky
        .post('http://localhost:3000/auth/login', {
          json: { email, passwordRaw: password },
        })
        .json<{ token: string }>()
      localStorage.setItem('authToken', token)
      navigate('/')
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
        toast.error(errorJson.message)
      }
    }
  }

  const loginAsGuest = () => {
    localStorage.setItem('authToken', 'guestUser')
    navigate('/')
  }

  return (
    <section className="h-screen flex items-center justify-center flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        Lost and <span className="text-red-400">Found</span>
      </h1>
      <div className="bg-slate-900 p-5 rounded-lg">
        <h3 className="text-xl font-semibold text-center mb-5">Login</h3>
        <button
          className="text-center underline hover:text-red-600 transition cursor-pointer w-full"
          onClick={loginAsGuest}
        >
          Log in as a guest
        </button>
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
        </form>
        <div className="flex gap-2 text-sm mt-3 items-center justify-center">
          <p className="">Don't have an account?</p>
          <Link to="/signup" className="underline text-red-500">
            Create one
          </Link>
        </div>
      </div>
    </section>
  )
}
export default Login
