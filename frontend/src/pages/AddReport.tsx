import { zodResolver } from '@hookform/resolvers/zod'
import ky from 'ky'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import AddReportMap from '../components/AddReportMap'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { center } from '../constants'
import { addReportSchema, AddReportShemaType } from '../schemas/addReport'

export const AddReport = () => {
  const [positon, setPosition] = useState<{
    lat: number
    lng: number
  }>(center)
  const token = localStorage.getItem('authToken')!
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddReportShemaType>({
    resolver: zodResolver(addReportSchema),
  })

  const submitHandler: SubmitHandler<AddReportShemaType> = async ({
    description,
    image,
    title,
    type,
  }) => {
    const { data } = await ky
      .post('http://localhost:3000/report', {
        json: {
          description,
          title,
          image,
          type,
          longtitude: positon.lng,
          latitude: positon.lat,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .json()

    console.log(data)
    navigate('/')
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
          </div>
          <div className="w-96">
            <label htmlFor="description">Description:</label>
            <textarea
              {...register('description')}
              name="description"
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1 resize-none h-32"
              placeholder="Description:"
            />
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
          </div>
          <div className="w-96">
            <label htmlFor="image">Image:</label>
            <input
              type="text"
              {...register('image')}
              className="block bg-slate-800 px-1 py-2 rounded-lg w-full mt-1"
              placeholder="Image"
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
