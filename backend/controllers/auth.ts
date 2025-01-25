import { compare, hash } from 'bcrypt'
import type { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import type { LoginBody, RegisterBody } from '../schemas/auth.js'
import { db } from '../utils/db.js'

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, passwordRaw } = req.body as LoginBody

    const user = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const passwordMatch = await compare(passwordRaw, user.password)

    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid email or password' })
      return
    }

    const token = jwt.sign({ userId: user.id }, process.env.SECRET!, {
      expiresIn: '7d',
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(400).json({ message: 'There was an error' })
  }
}

export const addUser: RequestHandler = async (req, res) => {
  try {
    const { email, lastName, name, passwordRaw } = req.body as RegisterBody
    const exists = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (exists) {
      res.status(409).json({ message: 'User with this email already exists' })
    }

    const passwordHash = await hash(passwordRaw, 10)

    const user = await db.user.create({
      data: {
        email,
        lastName,
        name,
        password: passwordHash,
      },
    })

    const token = jwt.sign({ userId: user.id }, process.env.SECRET!, {
      expiresIn: '7d',
    })

    res.status(200).json({ token })
  } catch (error) {
    res.status(400).json({ message: 'There was an error' })
  }
}
