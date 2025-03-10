import type { RequestHandler } from 'express'
import { db } from '../utils/db.js'

export const getUser: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.id)

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: { comments: true, reports: true },
      omit: { password: true },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
