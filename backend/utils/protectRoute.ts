import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { db } from './db.js'

interface DecodedToken extends JwtPayload {
  userId: number
}

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const decoded = jwt.verify(token, process.env.SECRET!) as DecodedToken

    if (!decoded) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const user = await db.user.findFirst({
      where: {
        id: decoded.userId,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
