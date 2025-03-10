import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
  } from 'react'
  import { api } from '../api'
  import { toast } from 'react-toastify'
  import { useNavigate } from 'react-router-dom'
  
  interface UserProps {
    id: string
    name: string
    email: string
  }
  
  type AuthContextType = {
    login: (email: string, password: string) => void
    user: UserProps
  }
  
  export const AuthContext = createContext({} as AuthContextType)
  
  interface AuthContextProviderProps {
    children: ReactNode
  }
  
  export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState({} as UserProps)

    const navigate = useNavigate()
  
    async function login(email: string, password: string) {
      api
        .post('/auth/login', {
          email,
          password,
        })
        .then((response) => {
          const { user } = response.data
          setUser(user)
  
          localStorage.setItem('@birthday-reminder:user', JSON.stringify(user))
  
          toast.success('Usuário logado com sucesso!', {
            position: 'bottom-left',
          })

          setTimeout(() => navigate('/birthday-register'), 1000)
        })
        .catch((error) => {
          const errorMsg =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : 'Erro ao fazer login. Tente novamente mais tarde'
  
          toast.error(errorMsg, {
            position: 'bottom-left',
          })

          if(errorMsg === "Usuário não encontrado"){
            setTimeout(() => navigate('/register'), 1000)
          }
        })
    }
  
    useEffect(() => {
      const user = localStorage.getItem('@birthday-reminder:user')
  
      if (user) {
        setUser(JSON.parse(user))
      }
    }, [])
    return (
      <AuthContext.Provider value={{ login, user }}>
        {children}
      </AuthContext.Provider>
    )
  }
  
  export function useAuth() {
    const context = useContext(AuthContext)
    return context
  }