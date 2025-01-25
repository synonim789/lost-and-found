import { z } from 'zod'

export const signUpSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, 'Name is Required'),
  lastName: z.string().min(1, 'Last Name is Required'),
  password: z.string().min(1, 'Password is Required'),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
