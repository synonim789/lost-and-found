import { Router } from 'express'
import {
  getConversationId,
  getConversations,
  getMessages,
  sendMessage,
} from '../controllers/message.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { sendMessageSchema } from '../schemas/message.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.post(
  '/:conversationId',
  validateData(sendMessageSchema),
  protectRoute,
  sendMessage
)
router.get('/conversation', protectRoute, getConversations)
router.get('/:conversationId', protectRoute, getMessages)
router.get('/conversation/:receiverId', protectRoute, getConversationId)

export default router
