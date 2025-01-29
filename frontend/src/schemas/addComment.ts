import { z } from 'zod'

export const addCommentSchema = z.object({
  text: z.string().min(1, 'Required'),
})

export type AddCommentSchemaType = z.infer<typeof addCommentSchema>
