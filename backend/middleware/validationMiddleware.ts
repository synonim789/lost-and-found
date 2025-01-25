import type { NextFunction, Request, Response } from 'express'
import type { ZodObject } from 'zod'

export const validateData =
  (schema: ZodObject<any, any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors })
      return
    }
    next()
  }
