import { z } from 'zod'

export const addReportSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['FOUND', 'LOST']),
})

export type AddReportShemaType = z.infer<typeof addReportSchema>
