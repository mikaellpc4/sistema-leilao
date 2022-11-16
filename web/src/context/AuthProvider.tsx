import { FormHandles } from '@unform/core'
import { Axios, AxiosError } from 'axios'
import { createContext, useState, useEffect, useContext } from 'react'
import Api from '../services/Api'
import GetUser from '../services/GetUser'


interface IAuthContext {
  user: IUser
  signIn: (data: ILoginRequest, formRef: React.RefObject<FormHandles>) => void
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

      if (storagedTokens) {
        let tokens = JSON.parse(storagedTokens) as { refresh: string, acess: string }
        Api.defaults.headers['refreshtoken'] = tokens.refresh
        Api.defaults.headers['acesstoken'] = tokens.acess
        const res = await GetUser()
        if (res instanceof AxiosError) {
          setUser(defaultUser)
          localStorage.clear()
          return
        }
        if (res?.newAcessToken) {
          Api.defaults.headers['acesstoken'] = res.newAcessToken
          tokens = { refresh: tokens.refresh, acess: res.newAcessToken }
          localStorage.setItem('@Auth:tokens', JSON.stringify(tokens))
          loadingStorageData()
          return
        }
        if (res?.newRefreshtoken) {
          Api.defaults.headers['refreshtoken'] = res.newRefreshtoken
          localStorage.clear()
          loadingStorageData()
          return
        }
        if (res?.user) {
          const loggedUser = res.user
          setUser(loggedUser)
          return
        }
      }
    }
    loadingStorageData()
  }, [])

  const signIn = async (data: ILoginRequest, formRef: React.RefObject<FormHandles>) => {
    try {
      await Api.post('/user/login', data)
        .then(async (res) => {
          const tokens = res.data.tokens as { refresh: string, acess: string }
          if (tokens) {
            Api.defaults.headers['refreshtoken'] = tokens.refresh
            Api.defaults.headers['acesstoken'] = tokens.acess
            localStorage.setItem('@Auth:tokens', JSON.stringify(tokens))
            const res = await GetUser()
            if (res instanceof AxiosError) return
            if (res?.user) {
              localStorage.setItem('@Auth:user', JSON.stringify(res.user))
              setUser(res.user)
            }
          }
        })
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = e.response
        if (error?.status !== 400) {
          console.log(e)
          alert('Ocorreu um erro do nosso lado, tente novamente mais tarde')
          return
        }
        switch (error.data) {
          case 'Dados invalidos':
            formRef.current?.setErrors({
              email: error.data,
              password: error.data
            })
            break
          case 'O email é obrigatorio':
            formRef.current?.setFieldError('email', error.data)
            break
          case 'A senha é obrigatoria':
            formRef.current?.setFieldError('password', error.data)
            break
          case 'O email não é valido':
            formRef.current?.setFieldError('email', error.data)
            break
          case 'Email ou senha incorreto(os)':
            formRef.current?.setErrors({
              email: error.data,
              password: error.data
            })
            break
        }
      }
    }
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
      delete Api.defaults.headers['acesstoken']
      delete Api.defaults.headers['refreshtoken']
      window.location.reload()
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      logout,
      user,
      setUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext


