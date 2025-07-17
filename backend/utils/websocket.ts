import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'

let io: IOServer

export const initSocket = (server: HTTPServer) => {
  io = new IOServer(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected')
  })
}

export const emitNotification = (userId: number, payload: any) => {
  if (io) {
    io.to(`user:${userId}`).emit('notification', payload)
  }
}
