import type { RequestHandler } from 'express'
import { db } from '../utils/db.js'

export const getUser: RequestHandler = async (req, res) => {
  try {
    const userId = Number(req.params.id)

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
        },
        reports: {
          include: {
            comments: {
              include: {
                user: true,
              },
            },
          },
        },
      },
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

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = req.user.id

    const user = await db.user.findUnique({
      where: { id },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    await db.user.delete({
      where: { id },
    })

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
