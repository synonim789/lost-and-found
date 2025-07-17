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
  })
}

export const emitNotification = (userId: number, payload: any) => {
  if (io) {
    io.to(`user:${userId}`).emit('notification', payload)
  }
}
