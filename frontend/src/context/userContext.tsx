import ky from 'ky'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { User } from '../types'

interface UserContextType {
  user: User | null
  loading: boolean
  error: string | null
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const token = localStorage.getItem('authToken')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await ky
          .get('http://localhost:3000/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          })
          .json<User>()

        setUser(response)
      } catch (error) {
        setError('Failed to fetch user')
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])
  return (
    <UserContext.Provider value={{ error, loading, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
