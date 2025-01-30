import { Router } from 'express'
import {
  addComment,
  addReport,
  deleteReport,
  editReport,
  getAllReports,
  getSingleReport,
  removeComment,
} from '../controllers/report.js'
import { validateData } from '../middleware/validationMiddleware.js'
import {
  addCommentSchema,
  addReportSchema,
  editReportSchema,
} from '../schemas/report.js'
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
router.get('/:id', getSingleReport)
router.delete('/:id', verifyJWT, deleteReport)
router.put(
  '/:id',
  uploadReportImage,
  validateData(editReportSchema),
  verifyJWT,
  editReport
)

router.post(
  '/:id/comment',
  validateData(addCommentSchema),
  verifyJWT,
  addComment
)
router.delete('/comment/:id', verifyJWT, removeComment)

export default router
