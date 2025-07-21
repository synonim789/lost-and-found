import type { RequestHandler } from 'express'
import type { SendMessageBody } from '../schemas/message.js'
import { db } from '../utils/db.js'
import { emitNotification } from '../utils/websocket.js'

export const sendMessage: RequestHandler = async (req, res) => {
  try {
    const { id: conversationId } = req.params
    const { content } = req.body as SendMessageBody
    const { id: senderId } = req.user

    let conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
      },
      include: {
        participants: {
          where: {
            id: {
              not: senderId,
            },
          },
        },
      },
    })

    if (!conversation) {
      res.status(404).json({ message: 'Conversation not found' })
      return
    }

    const message = await db.message.create({
      data: {
        content,
        senderId,
        conversationId: conversation.id,
      },
    })

    emitNotification(Number(conversation.participants[0]?.id), {
      type: 'new_message',
      from: senderId,
      content: message.content,
      conversationId: conversation.id,
    })

    await db.notification.create({
      data: {
        type: 'new_message',
        content: `You received a new message from ${req.user.name}`,
        userId: Number(conversation.participants[0]?.id),
        fromUserId: senderId,
      },
    })

    res.status(201).json(message)
  } catch (error) {
    console.log(error)

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
        participants: {
          omit: {
            password: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          include: {
            sender: true,
          },
        },
      },
    })

    res.status(200).json({ data: conversations })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}

export const getMessages: RequestHandler = async (req, res) => {
  try {
    const { conversationId } = req.params

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
          include: { sender: { omit: { password: true } } },
        },
      },
    })

    if (!conversation) {
      res.status(200).json([])
      return
    }

    res.status(200).json({ data: conversation.messages })
  } catch (error) {
    console.log(error)

    res.status(500).json({ message: 'There was an error' })
  }
}

export const getConversationId: RequestHandler = async (req, res) => {
  try {
    const { receiverId } = req.params
    const senderId = req.user.id

    let conversation = await db.conversation.findFirst({
      where: {
        participants: {
          every: {
            id: {
              in: [senderId, Number(receiverId)],
            },
          },
        },
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

    res.status(200).json({ id: conversation.id })
  } catch (error) {
    res.status(500).json({ message: 'There was an error' })
  }
}
