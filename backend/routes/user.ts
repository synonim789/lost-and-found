import { Router } from 'express'
import { getUser } from '../controllers/user.js'

const router = Router()

router.get('/:id', getUser)

export default router
