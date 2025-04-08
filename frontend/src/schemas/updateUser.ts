import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>
