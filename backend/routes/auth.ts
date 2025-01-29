import { Router } from 'express'
import { addUser, getUser, login } from '../controllers/auth.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.js'
import { verifyJWT } from '../utils/jwt.js'

const router = Router()

router.post('/login', validateData(loginSchema), login)
router.post('/register', validateData(registerSchema), addUser)
router.get('/me', verifyJWT, getUser)

export default router
