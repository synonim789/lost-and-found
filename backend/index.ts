import express from 'express'
import authRouter from './routes/auth.js'
import cors from 'cors'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
