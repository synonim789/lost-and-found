import type { NextFunction, Request, Response } from 'express'

export const validateData =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({ errors: result.error.errors })
      return
    }
    next()
  }
