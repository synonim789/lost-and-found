import multer, { diskStorage } from 'multer'
import path from 'path'

const storage = diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

export const uploadReportImage = upload.single('image')
