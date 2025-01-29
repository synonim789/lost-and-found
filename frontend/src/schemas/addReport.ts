import { z } from 'zod'

export const addReportSchema = z.object({
  title: z.string().min(1, 'Required'),
  image: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      'Image is required'
    ),
  description: z.string().min(1, 'Required'),
  type: z.enum(['FOUND', 'LOST']),
})

export type AddReportShemaType = z.infer<typeof addReportSchema>
