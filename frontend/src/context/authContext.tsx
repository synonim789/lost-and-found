import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../api/ky'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api
          .get('auth/me', { credentials: 'include' })
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
    <AuthContext.Provider value={{ error, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
