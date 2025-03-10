declare namespace Express {
  export interface Request {
    user: {
      name: string
      id: number
      email: string
      lastName: string
    }
  }
}
