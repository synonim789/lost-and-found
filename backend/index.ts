import cors from 'cors'
import express from 'express'
import authRouter from './routes/auth.js'
import reportRouter from './routes/report.js'

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)
app.use('/report', reportRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
