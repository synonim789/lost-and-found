import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'

let io: IOServer

export const initSocket = (server: HTTPServer) => {
  io = new IOServer(server, {
    cors: {
      origin: '*',
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected')

    socket.on('join', (userId: number) => {
      socket.join(`user:${userId}`)
    })

    socket.on('join_conversation', (conversationId: string) => {
      socket.join(`conversation:${conversationId}`)
    })
  })
}

export const emitNotification = (userId: number, payload: any) => {
  if (io) {
    io.to(`user:${userId}`).emit('notification', payload)
  }
}

export const emitNewMessage = (conversationId: string, message: any) => {
  if (io) {
    io.to(`conversation:${conversationId}`).emit('new_message', message)
  }
}
