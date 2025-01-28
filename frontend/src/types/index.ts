export type ReportType = {
  id: number
  title: string
  image: string
  description: string
  type: 'FOUND' | 'LOST'
  latitude: number
  longtitude: number
  userId: string
}
