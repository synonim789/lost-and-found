import { z } from 'zod'

export const reportSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['FOUND', 'LOST']),
  latitude: z.number(),
  longtitude: z.number(),
  userId: z.number(),
})

export const addReportSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['FOUND', 'LOST']),
  latitude: z.number(),
  longtitude: z.number(),
})

export type ReportSchemaType = z.infer<typeof reportSchema>
export type AddReportSchemaType = z.infer<typeof addReportSchema>
