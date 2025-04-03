import { z } from 'zod'

export const sendMessageSchema = z.object({
  content: z.string().min(1),
})

export type SendMessageBody = z.infer<typeof sendMessageSchema>
