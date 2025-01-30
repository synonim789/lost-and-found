import { z } from 'zod'

export const editReportSchema = z.object({
  title: z.string().min(1, 'Required'),
  image: z.any(),
  description: z.string().min(1, 'Required'),
  type: z.enum(['FOUND', 'LOST']),
})

export type EditReportSchemaType = z.infer<typeof editReportSchema>
