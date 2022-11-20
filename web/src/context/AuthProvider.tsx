import { FormHandles } from '@unform/core'
import { AxiosError } from 'axios'
import { createContext, useState, useEffect } from 'react'
import Api, { AxiosApi } from '../services/Api'
import GetUser from '../services/GetUser'
import normalizeMoney from '../services/normalizeMoney'


interface IAuthContext {
  user: IUser
  signIn: (data: ILoginRequest) => Promise<void>
  logout: () => void
  setUser: (user: IUser) => void;
}

const AuthContext = createContext({} as IAuthContext)

interface IAuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {

  const defaultUser = {
    id: '',
    name: '',
    email: '',
    role: '',
    LCoins: 0
  }

  const [user, setUser] = useState<IUser>(defaultUser)

  useEffect(() => {
    const loadingStorageData = async () => {
      const storagedTokens = localStorage.getItem("@Auth:tokens")
      const storagedUser = localStorage.getItem("@Auth:user")
      if(storagedUser) setUser(JSON.parse(storagedUser))
      if (storagedTokens) {
        let tokens = JSON.parse(storagedTokens) as { refresh: string, acess: string }
        AxiosApi.defaults.headers['refreshtoken'] = tokens.refresh
        AxiosApi.defaults.headers['acesstoken'] = tokens.acess
        const res = await GetUser()
        if (res instanceof AxiosError) {
          setUser(defaultUser)
          localStorage.clear()
          return
        }
        const loggedUser = res as IUser
        localStorage.setItem("@Auth:user", JSON.stringify(loggedUser))
        setUser(loggedUser)
        return
      }
      setUser(defaultUser)
    }
    loadingStorageData()
  }, [])

  const signIn = async (data: ILoginRequest) => {
    type TSignInResponse = { message: string, tokens: { refresh: string, acess: string } }
    const { tokens } = await Api.post<ILoginRequest, TSignInResponse>('/user/login', data)
    localStorage.setItem('@Auth:tokens', JSON.stringify(tokens))
    AxiosApi.defaults.headers['refreshtoken'] = tokens.refresh
    AxiosApi.defaults.headers['acesstoken'] = tokens.acess
    const user = await GetUser() as IUser
    setUser(user)
  }

  const logout = () => {
    const storagedTokens = localStorage.getItem("@Auth:tokens")
    if (storagedTokens) {
      const tokens = JSON.parse(storagedTokens) as { refresh: string, acess: string }
      localStorage.clear()
      Api.post('/user/logout', {
        refreshToken: tokens.refresh
      })
        .then()
        .catch((e) => console.log(e))
      delete AxiosApi.defaults.headers['acesstoken']
      delete AxiosApi.defaults.headers['refreshtoken']
    }
    setUser(defaultUser)
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      logout,
      user,
      setUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext


