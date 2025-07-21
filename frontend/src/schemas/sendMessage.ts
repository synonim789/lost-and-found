import { z } from 'zod'

export const sendMessageSchema = z.object({
  content: z.string().min(1, 'Required'),
})

export type SendMessageSchemType = z.infer<typeof sendMessageSchema>
