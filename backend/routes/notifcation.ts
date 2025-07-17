import { Router } from 'express'
import {
  getNotifications,
  markNotificationRead,
} from '../controllers/notifications.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.get('/', protectRoute, getNotifications)
router.put('/:id', protectRoute, markNotificationRead)

export default router
