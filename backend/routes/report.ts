import { Router } from 'express'
import {
  addReport,
  deleteReport,
  getAllReports,
} from '../controllers/report.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { addReportSchema } from '../schemas/report.js'
import { verifyJWT } from '../utils/jwt.js'
import { uploadReportImage } from '../utils/multer.js'

const router = Router()

router.post(
  '/',
  uploadReportImage,
  validateData(addReportSchema),
  verifyJWT,
  addReport
)
router.get('/', getAllReports)
router.delete('/:id', verifyJWT, deleteReport)

export default router
