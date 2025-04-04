import type { RequestHandler } from 'express'
import type { SendMessageBody } from '../schemas/message.js'
import { db } from '../utils/db.js'

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { id: receiverId } = req.params
    const { content } = req.body as SendMessageBody
    const { id: senderId } = req.user

    const receiver = await db.user.findUnique({
      where: { id: Number(receiverId) },
    })

    if (!receiver) {
      res.status(404).json({
        message: "User that you want to send message to doesn't exist",
      })
      return
    }

    if (Number(receiverId) === senderId) {
      res.status(400).json({ message: "You can't send message to yourself" })
      return
    }

    let conversation = await db.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: senderId } } },
          { participants: { some: { id: Number(receiverId) } } },
        ],
      },
    })

    if (!conversation) {
      conversation = await db.conversation.create({
        data: {
          participants: {
            connect: [{ id: senderId }, { id: Number(receiverId) }],
          },
        },
      })
    }

    const message = await db.message.create({
      data: {
        content,
        senderId,
        conversationId: conversation.id,
      },
    })

    res.status(201).json(message)
  } catch (error) {
    res.status(500).json({ error: 'There was an error' })
  }
}

export const getConversations: RequestHandler = async (req, res) => {
  try {
    const senderId = req.user.id

    const conversations = await db.conversation.findMany({
      where: {
        participants: { some: { id: senderId } },
      },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: true,
          },
        },
      },
    })

    res.status(200).json(conversations)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { receiverId } = req.params
    const senderId = req.user.id

    const conversation = await db.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { id: senderId } } },
          { participants: { some: { id: Number(receiverId) } } },
        ],
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!conversation) {
      res.status(200).json([])
      return
    }

    res.status(200).json(conversation.messages)
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
