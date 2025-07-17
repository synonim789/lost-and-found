import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { createServer } from 'http'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRouter from './routes/auth.js'
import messageRouter from './routes/message.js'
import reportRouter from './routes/report.js'
import userRouter from './routes/user.js'
import { initSocket } from './utils/websocket.js'

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/report', reportRouter)
app.use('/message', messageRouter)

const server = createServer(app)
initSocket(server)

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
