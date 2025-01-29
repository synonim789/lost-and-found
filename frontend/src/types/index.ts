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
}

export type User = {
  name: string
  id: number
  email: string
  lastName: string
}
