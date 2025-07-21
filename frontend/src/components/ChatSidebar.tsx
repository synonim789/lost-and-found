import { useQuery } from '@tanstack/react-query'
import ky from 'ky'
import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router'
import { Conversation } from '../types'

type Props = {
  userId: number
}

const ChatSidebar = ({ userId }: Props) => {
  const getConversations = async (): Promise<Conversation[]> => {
    const { data } = await ky
      .get('http://localhost:3000/message/conversation', {
        credentials: 'include',
      })
      .json<{ data: Conversation[] }>()
    return data
  }

  const { data: conversations } = useQuery({
    queryKey: ['conversations'],
    queryFn: getConversations,
    initialData: [],
  })

  return (
    <div className="w-fit">
      <h2 className="mb-2 font-bold text-xl">Conversations</h2>
      <div className="flex flex-col gap-4 w-full">
        {conversations.length > 0 &&
          conversations.map((c) => {
            return (
              <Link
                to={`${c.id}`}
                className="hover:bg-slate-600 p-2 rounded-lg transition cursor-pointer w-full"
                key={c.id}
              >
                {c.participants
                  .filter((u) => u.id !== userId)
                  .map((u) => (
                    <div
                      className="flex items-center gap-3 mb-2 w-full"
                      key={u.id}
                    >
                      <CgProfile className="text-3xl text-blue-400" />
                      <div>
                        {u.name} {u.lastName}
                      </div>
                    </div>
                  ))}
                <div className="text-sm text-gray-400 w-full">
                  {c.messages.map((m) =>
                    m.senderId === userId
                      ? `You: ${m.content}`
                      : `${m.sender.name}: ${m.content}`
                  )}
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
export default ChatSidebar
