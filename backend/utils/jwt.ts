import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    res.sendStatus(401)
    return
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    res.sendStatus(401)
    return
  }

  jwt.verify(token, process.env.SECRET!, (err: unknown, decoded: any) => {
    if (err) {
      res.sendStatus(403)
      return
    }
    req.userId = decoded.userId
    next()
  })
}
