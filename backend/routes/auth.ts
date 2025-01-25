import { Router } from 'express'
import { addUser, login } from '../controllers/auth.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.js'

const router = Router()

router.post('/login', validateData(loginSchema), login)
router.post('/register', validateData(registerSchema), addUser)
router.get('/:id')

export default router
