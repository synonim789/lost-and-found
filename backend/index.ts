import express from 'express'
import authRouter from './routes/auth.js'

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
