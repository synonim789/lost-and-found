import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  passwordRaw: z.string().min(1),
})

export const registerSchema = z.object({
  email: z.string().email(),

})

export type LoginBody = z.infer<typeof loginSchema>
