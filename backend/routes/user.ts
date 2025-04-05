import { Router } from 'express'
import { deleteUser, getUser, updateUser } from '../controllers/user.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { updateUserSchema } from '../schemas/user.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.get('/:id', getUser)
router.delete('/', protectRoute, deleteUser)
router.put('/', validateData(updateUserSchema), protectRoute, updateUser)

export default router
