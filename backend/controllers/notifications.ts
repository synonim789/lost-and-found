import type { RequestHandler } from 'express'
import { db } from '../utils/db.js'

export const getNotifications: RequestHandler = async (req, res) => {
  try {
    const notifcations = await db.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      include: { fromUser: { select: { id: true, name: true } } },
    })

    res.status(200).json(notifcations)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifcations' })
  }
}

export const markMessageNotificationAsRead: RequestHandler = async (
  req,
  res
) => {
  try {
    const { id } = req.params

    const notification = await db.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    })

    res.status(200).json(notification)
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notifcation as read' })
  }
}

export const markCommentNotificationsAsRead: RequestHandler = async (
  req,
  res
) => {
  try {
    const { id: userId } = req.user

    const notifications = await db.notification.updateMany({
      where: {
        userId: Number(userId),
        type: 'new_comment',
      },
      data: {
        isRead: true,
      },
    })

    res.status(200).json({ data: notifications })
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark notifcation as read' })
  }
}
