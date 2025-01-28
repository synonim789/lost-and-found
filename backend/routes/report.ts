import { Router } from 'express'
import { addReport, getAllReports } from '../controllers/report.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { addReportSchema } from '../schemas/report.js'
import { verifyJWT } from '../utils/jwt.js'

const router = Router()

router.post('/', validateData(addReportSchema), verifyJWT, addReport)
router.get('/', getAllReports)

export default router
