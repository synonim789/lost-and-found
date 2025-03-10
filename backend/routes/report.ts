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
import { uploadReportImage } from '../utils/multer.js'
import { protectRoute } from '../utils/protectRoute.js'

const router = Router()

router.post(
  '/',
  uploadReportImage,
  validateData(addReportSchema),
  protectRoute,
  addReport
)
router.get('/', getAllReports)
router.get('/:id', getSingleReport)
router.delete('/:id', protectRoute, deleteReport)
router.put(
  '/:id',
  uploadReportImage,
  validateData(editReportSchema),
  protectRoute,
  editReport
)

router.post(
  '/:id/comment',
  validateData(addCommentSchema),
  protectRoute,
  addComment
)
router.delete('/comment/:id', protectRoute, removeComment)

export default router
