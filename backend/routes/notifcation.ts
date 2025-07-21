import { Router } from 'express'
import {
  getNotifications,
  markCommentNotificationsAsRead,
  markMessageNotificationAsRead,
} from '../controllers/notifications.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.get('/', protectRoute, getNotifications)
router.put('/message/:id', protectRoute, markMessageNotificationAsRead)
router.put('/comment', protectRoute, markCommentNotificationsAsRead)

export default router
