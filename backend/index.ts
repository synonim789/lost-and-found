import cors from 'cors'
import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.js'
import reportRouter from './routes/report.js'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/auth', authRouter)
app.use('/report', reportRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
