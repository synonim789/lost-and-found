import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  passwordRaw: z.string().min(1),
})

export const registerSchema = z.object({
  email: z.string().email(),
  passwordRaw: z.string().min(1),
  name: z.string().min(1),
  lastName: z.string().min(1),
})

export type LoginBody = z.infer<typeof loginSchema>
export type RegisterBody = z.infer<typeof registerSchema>
