import { Router } from 'express'
import { getConversations, sendMessage } from '../controllers/message.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { sendMessageSchema } from '../schemas/message.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.post('/:id', validateData(sendMessageSchema), protectRoute, sendMessage)
router.get('/conversation', protectRoute, getConversations)

export default router
