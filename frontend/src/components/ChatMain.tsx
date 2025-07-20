const ChatMain = () => {
  const messages = [
    {
      id: 'msg1',
      createdAt: new Date('2025-07-20T10:15:00Z'),
      content: 'Hey, are you coming to the meeting later?',
      senderId: 1,
      conversationId: 'conv1',
      sender: {
        id: 1,
        name: 'Oskar',
        lastName: 'Fultowicz',
        email: 'oskarfultowicz@gmail.com',
      },
    },
    {
      id: 'msg2',
      createdAt: new Date('2025-07-20T10:16:30Z'),
      content: 'Yes, I’ll be there in 10 minutes.',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
    {
      id: 'msg3',
      createdAt: new Date('2025-07-20T11:05:00Z'),
      content: 'Don’t forget to bring the report.',
      senderId: 1,
      conversationId: 'conv1',
      sender: {
        id: 1,
        name: 'Oskar',
        lastName: 'Fultowicz',
        email: 'oskarfultowicz@gmail.com',
      },
    },
    {
      id: 'msg4',
      createdAt: new Date('2025-07-20T11:06:10Z'),
      content: 'Got it. See you soon!',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
    {
      id: 'msg4',
      createdAt: new Date('2025-07-20T11:06:10Z'),
      content: 'Got it. See you soon!',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
    {
      id: 'msg4',
      createdAt: new Date('2025-07-20T11:06:10Z'),
      content: 'Got it. See you soon!',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
    {
      id: 'msg4',
      createdAt: new Date('2025-07-20T11:06:10Z'),
      content: 'Got it. See you soon!',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
    {
      id: 'msg4',
      createdAt: new Date('2025-07-20T11:06:10Z'),
      content: 'Got it. See you soon!',
      senderId: 2,
      conversationId: 'conv1',
      sender: {
        id: 2,
        name: 'Anna',
        email: 'Annaz@gmail.com',
        lastName: 'Kowalska',
      },
    },
  ]

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px] p-2">
        {messages.map((m) => (
          <div className={` ${m.senderId === 1 ? 'self-end' : 'self-start'}`}>
            <div className="text-sm text-gray-300">
              {m.sender.name} {m.sender.lastName}
            </div>
            <div
              className={`${' p-2 rounded-lg'} ${
                m.senderId === 1 ? 'bg-slate-500' : 'bg-slate-900'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <form action="" className="flex gap-5">
        <input type="text" className="bg-slate-800 w-full rounded-lg p-1" />
        <button className="bg-blue-700 rounded-xl p-2 cursor-pointer hover:bg-blue-900 transition">
          Send
        </button>
      </form>
    </div>
  )
}
export default ChatMain
