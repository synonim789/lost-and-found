export type ReportType = {
  user: {
    name: string
    id: number
    email: string
    lastName: string
  }
  id: number
  title: string
  image: string
  description: string
  type: 'FOUND' | 'LOST'
  latitude: number
  longtitude: number
  userId: string
  comments: CommentType[]
}

export type CommentType = {
  id: number
  text: string
  createdAt: string
  reportId: number
  userId: number
  user: User
}

export type User = {
  name: string
  id: number
  email: string
  lastName: string
}

export type NotificationType = {
  id: number
  type: string
  content: string
  isRead: boolean
  createdAt: string
  fromUserId: number
}

export type Message = {
  id: string
  content: string
  senderId: number
  conversationId: string
  createdAt: Date
  sender: User
}

export type Conversation = {
  id: string
  createdAt: Date
  updatedAt: Date
  participants: User[]
  messages: Message[]
}
