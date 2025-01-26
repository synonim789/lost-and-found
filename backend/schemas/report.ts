import { z } from 'zod'

export const reportSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['FOUND', 'LOST']),
  latitude: z.string().min(1),
  longtitude: z.string().min(1),
  userId: z.number(),
})

export type ReportSchemaType = z.infer<typeof reportSchema>
