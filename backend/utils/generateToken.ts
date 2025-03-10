import type { Response } from 'express'
import jwt from 'jsonwebtoken'

export const generateToken = (userId: number, res: Response): string => {
  const token = jwt.sign({ userId }, process.env.SECRET!, {
    expiresIn: '15d',
  })

  res.cookie('jwt', token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV !== 'development',
  })

  return token
}
