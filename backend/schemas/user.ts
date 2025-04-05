import { z } from 'zod'

export const updateUserSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>
