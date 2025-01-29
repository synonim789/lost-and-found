import { Router } from 'express'
import {
  addComment,
  addReport,
  deleteReport,
  getAllReports,
} from '../controllers/report.js'
import { validateData } from '../middleware/validationMiddleware.js'
import { addCommentSchema, addReportSchema } from '../schemas/report.js'
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
router.post(
  '/:id/comment',
  validateData(addCommentSchema),
  verifyJWT,
  addComment
)

export default router
