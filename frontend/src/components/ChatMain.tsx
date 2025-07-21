import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { useAuth } from '../context/authContext'
import useMessage from '../hooks/useMessage'
import { useSendMessage } from '../hooks/useSendMessage'
import { sendMessageSchema, SendMessageSchemType } from '../schemas/sendMessage'

const ChatMain = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const { messages } = useMessage(id)

  const messageEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SendMessageSchemType>({
    resolver: zodResolver(sendMessageSchema),
  })

  const { mutate } = useSendMessage(id)

  const onSubmit: SubmitHandler<SendMessageSchemType> = async (data) => {
    mutate(data)
    reset()
  }

  if (!user) {
    return
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] p-2">
        {messages.map((m) => (
          <div
            className={` ${m.senderId === user.id ? 'self-end' : 'self-start'}`}
            key={m.id}
          >
            <div className="text-sm text-gray-300">
              {m.sender.name} {m.sender.lastName}
            </div>
            <div
              className={`${' p-2 rounded-lg'} ${
                m.senderId === user.id ? 'bg-slate-500' : 'bg-slate-900'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-5">
        <input
          type="text"
          className="bg-slate-800 w-full rounded-lg p-1"
          {...register('content')}
        />
        {errors.content?.message && (
          <p className="text-red-400">{errors.content.message}</p>
        )}
        <button className="bg-blue-700 rounded-xl p-2 cursor-pointer hover:bg-blue-900 transition">
          Send
        </button>
      </form>
    </div>
  )
}
export default ChatMain
