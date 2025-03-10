import { Router } from 'express'
import { getMe, login, signUp } from '../controllers/auth.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.post('/login', validateData(loginSchema), login)
router.post('/signup', validateData(registerSchema), signUp)
router.get('/me', protectRoute, getMe)

export default router
