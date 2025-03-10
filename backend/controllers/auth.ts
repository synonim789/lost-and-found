import { compare, hash } from 'bcrypt'
import type { RequestHandler } from 'express'
import type { LoginBody, RegisterBody } from '../schemas/auth.js'
import { db } from '../utils/db.js'
import { generateToken } from '../utils/generateToken.js'

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, passwordRaw } = req.body as LoginBody

    const user = await db.user.findUnique({
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

    generateToken(user.id, res)

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { email, lastName, name, passwordRaw } = req.body as RegisterBody
    const exists = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (exists) {
      res.status(409).json({ message: 'User with this email already exists' })
      return
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

    generateToken(user.id, res)

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'There was an error' })
  }
}

export const getMe: RequestHandler = async (req, res) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id: req.user.id,
      },
      omit: {
        password: true,
      },
    })

    if (!user) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const logout: RequestHandler = async (req, res) => {
  try {
    res.clearCookie('jwt')
    res.status(200).json({ message: 'User logged out' })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
