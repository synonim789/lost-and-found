import { Router } from 'express'
import { sendMessage } from '../controllers/message.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { sendMessageSchema } from '../schemas/message.js'

const router = Router()

router.post('/:id', validateData(sendMessageSchema), sendMessage)

export default router
