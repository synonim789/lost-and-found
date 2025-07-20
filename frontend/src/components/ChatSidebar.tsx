import { CgProfile } from 'react-icons/cg'
import { Link } from 'react-router'

const ChatSidebar = () => {
  const conversations = [
    {
      id: 'c1d1f4c2-e5b2-4b8d-92cd-0ef012345678',
      createdAt: new Date('2025-07-19T14:22:00Z'),
      updatedAt: new Date('2025-07-20T09:10:00Z'),
      participants: [
        {
          id: 1,
          email: 'oskar@example.com',
          name: 'Oskar',
          lastName: 'Fultowicz',
        },
        {
          id: 2,
          email: 'anna@example.com',
          name: 'Anna',
          lastName: 'Kowalska',
        },
      ],
      messages: [
        {
          id: 'm1a2b3c4-7890-4567-8901-abcdefabcdef',
          content: 'Hey, are we still meeting tomorrow?',
          senderId: 2,
          conversationId: 'c1d1f4c2-e5b2-4b8d-92cd-0ef012345678',
          createdAt: new Date('2025-07-20T09:08:00Z'),
          sender: {
            id: 2,
            email: 'anna@example.com',
            name: 'Anna',
            lastName: 'Kowalska',
          },
        },
      ],
    },
    {
      id: 'c2e3f5d6-a7c8-4d2a-b8e3-111122223333',
      createdAt: new Date('2025-07-10T12:10:00Z'),
      updatedAt: new Date('2025-07-19T19:45:00Z'),
      participants: [
        {
          id: 1,
          email: 'oskar@example.com',
          name: 'Oskar',
          lastName: 'Fultowicz',
        },
        {
          id: 3,
          email: 'jan@example.com',
          name: 'Jan',
          lastName: 'Nowak',
        },
      ],
      messages: [
        {
          id: 'm9z8y7x6-1234-5678-9876-fedcba987654',
          content: "Got it, I'll send the file later.",
          senderId: 1,
          conversationId: 'c2e3f5d6-a7c8-4d2a-b8e3-111122223333',
          createdAt: new Date('2025-07-19T19:44:00Z'),
          sender: {
            id: 1,
            email: 'oskar@example.com',
            name: 'Oskar',
            lastName: 'Fultowicz',
          },
        },
      ],
    },
  ]
  return (
    <div className="w-fit">
      <h2 className="mb-2 font-bold text-xl">Conversations</h2>
      <div className="flex flex-col gap-4 w-full">
        {conversations.map((c) => {
          return (
            <Link
              to={`${c.id}`}
              className="hover:bg-slate-600 p-2 rounded-lg transition cursor-pointer w-full"
            >
              {c.participants
                .filter((u) => u.id !== 1)
                .map((u) => (
                  <div className="flex items-center gap-3 mb-2 w-full">
                    <CgProfile className="text-3xl text-blue-400" />
                    <div>
                      {u.name} {u.lastName}
                    </div>
                  </div>
                ))}
              <div className="text-sm text-gray-400 w-full">
                {c.messages.map((m) =>
                  m.senderId === 1
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
