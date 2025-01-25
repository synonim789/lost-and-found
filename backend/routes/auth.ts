import { Router } from 'express'
import { login } from '../controllers/auth.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { loginSchema } from '../schemas/auth.js'

const router = Router()

router.post('/login', validateData(loginSchema), login)
router.post('/register')
router.get('/:id')

export default router
