import { Router } from 'express'
import { deleteUser, getUser } from '../controllers/user.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.get('/:id', getUser)
router.delete('/', protectRoute, deleteUser)

export default router
