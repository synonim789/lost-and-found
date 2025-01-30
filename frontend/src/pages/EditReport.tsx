import { zodResolver } from '@hookform/resolvers/zod'
import ky, { HTTPError } from 'ky'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import AddReportMap from '../components/AddReportMap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { center } from '../constants'
import { editReportSchema, EditReportSchemaType } from '../schemas/editReport'
import { ReportType } from '../types'

const EditReport = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem('authToken')

  const [positon, setPosition] = useState<{
    lat: number
    lng: number
  }>(center)

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditReportSchemaType>({
    resolver: zodResolver(editReportSchema),
  })

  useEffect(() => {
    const getReport = async () => {
      try {
        const { description, title, image, type, longtitude, latitude } =
          await ky.get(`http://localhost:3000/report/${id}`).json<ReportType>()
        reset({
          description,
          title,
          image,
          type,
        })
        setPosition({
          lat: latitude,
          lng: longtitude,
        })
      } catch (error) {
        if (error instanceof HTTPError) {
          const errorJson = await error.response.json<{
            message: string
          }>()
          toast.error(errorJson.message)
        }
      }
    }

    getReport()
  }, [id, reset])

  const submitHandler: SubmitHandler<EditReportSchemaType> = async ({
    description,
    title,
    type,
    image,
  }) => {
    try {
      const formData = new FormData()
      formData.append('description', description)
      formData.append('title', title)
      formData.append('type', type)
      formData.append('longtitude', positon.lng.toString())
      formData.append('latitude', positon.lat.toString())

      const file = image[0]
      if (file) {
        formData.append('image', file)
      }

      await ky
        .put(`http://localhost:3000/report/${id}`, {
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json<ReportType>()

      navigate('/')
      toast.success('Report edited successfully')
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{
          message: string
        }>()
        toast.error(errorJson.message)
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="md:flex md:items-center md:justify-center block md:flex-row">
        <form
          className="flex flex-col items-center mb-5 md:mb-0 md:w-1/2 gap-5"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="w-96">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              {...register('title')}
              name="title"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Title:"
            />
            {errors.title?.message && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="w-96">
            <label htmlFor="description">Description:</label>
            <textarea
              {...register('description')}
              name="description"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1 resize-none h-32"
              placeholder="Description:"
            />
            {errors.description?.message && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          <div className="w-96">
            <label htmlFor="type">Type:</label>
            <select
              {...register('type')}
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
            >
              <option value="FOUND">Found</option>
              <option value="LOST">Lost</option>
            </select>
            {errors.type?.message && (
              <p className="text-red-500">{errors.type.message}</p>
            )}
          </div>
          <div className="w-96">
            <label htmlFor="image">Image:</label>
            <input
              type="file"
              {...register('image')}
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="bg-red-700 text py-2  px-4 rounded-xl mt-5 cursor-pointer hover:bg-red-600 transition w-92"
          >
            Add Report
          </button>
        </form>
        <AddReportMap position={positon} setPosition={setPosition} />
      </div>
      <Footer />
    </>
  )
}
export default EditReport
