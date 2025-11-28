import { zodResolver } from '@hookform/resolvers/zod'
import { HTTPError } from 'ky'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { api } from '../api/ky'
import AddReportMap from '../components/AddReportMap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { center } from '../constants'
import { addReportSchema, AddReportShemaType } from '../schemas/addReport'
import { ReportType } from '../types'

export const AddReport = () => {
  const [positon, setPosition] = useState<{
    lat: number
    lng: number
  }>(center)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<AddReportShemaType>({
    resolver: zodResolver(addReportSchema),
  })

  const submitHandler: SubmitHandler<AddReportShemaType> = async ({
    description,
    image,
    title,
    type,
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

      await api
        .post('report', {
          body: formData,
          credentials: 'include',
        })
        .json<{ data: ReportType }>()

      navigate('/')
      toast.success('Report added successfully')
    } catch (error) {
      if (error instanceof HTTPError) {
        const errorJson = await error.response.json<{ message: string }>()
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
          <div className="w-90">
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
          <div className="w-90">
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
          <div className="w-90">
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
          <div className="w-90">
            <label htmlFor="image">Image:</label>
            <div className="relative bg-slate-800 px-1 py-2 rounded-lg w-full mt-1 flex items-center justify-between cursor-pointer">
              <span>{watch('image')?.[0]?.name || 'Choose a file...'}</span>
              <label
                htmlFor="image"
                className="bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-600 transition"
              >
                Browse
              </label>
              <input
                type="file"
                {...register('image')}
                name="image"
                id="image"
                className="hidden"
                accept="image/*"
              />
            </div>
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
