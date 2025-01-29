import { z } from 'zod'
import { zfd } from 'zod-form-data'

export const reportSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['FOUND', 'LOST']),
  latitude: z.number(),
  longtitude: z.number(),
  userId: z.number(),
})

export const addReportSchema = zfd.formData({
  title: zfd.text(z.string().min(1)),
  image: zfd.file(z.instanceof(File).optional()),
  description: zfd.text(z.string().min(1)),
  type: zfd.text(z.enum(['FOUND', 'LOST'])),
  latitude: zfd.text(z.string().min(1)),
  longtitude: zfd.text(z.string().min(1)),
})

export type ReportSchemaType = z.infer<typeof reportSchema>
export type AddReportSchemaType = z.infer<typeof addReportSchema>
