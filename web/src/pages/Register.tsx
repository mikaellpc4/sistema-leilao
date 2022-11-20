import { useRef, useContext } from 'react'
import Api from '../services/Api'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { HiOutlineMail } from 'react-icons/hi'
import { CgLock } from 'react-icons/cg'
import { FiUser } from 'react-icons/fi'
import Input from '../components/Input'
import AuthContext from '../context/AuthProvider'
import { Link, Navigate } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { AiOutlineLoading } from 'react-icons/ai'

const Register = () => {
  const { signIn, user } = useContext(AuthContext)

  if (user.name) return <Navigate to='/' />

  const formRef = useRef<FormHandles>(null)

  interface IRegisterRequest {
    name: string,
    email: string,
    password: string,
    passwordConfirm: string,
  }

  const register = async (reqData: IRegisterRequest) => {
    return Api.post<IRegisterRequest, void>('/user/register', reqData)
  }

  const { mutate, isLoading } = useMutation(register, {
    onMutate: () => {
      formRef.current?.setErrors({})
    },
    onError: (e: AxiosError) => {
      const error = e.response
      if (error?.status !== 400) {
        alert('Ocorreu um erro do nosso lado, tente novamente mais tarde')
        return
      }
      const errorMessage = error.data as string
      if (errorMessage.includes('nome')) return formRef.current?.setFieldError('name', errorMessage)
      if (errorMessage.includes('email')) return formRef.current?.setFieldError('email', errorMessage)
      if (errorMessage.includes('senhas')) return formRef.current?.setFieldError('passwordConfirm', errorMessage)
      if (errorMessage.includes('senha')) return formRef.current?.setFieldError('password', errorMessage)
    },
    onSuccess: (res, reqData) => {
      const { email, password } = reqData
      signIn({ email, password })
    }
  })

  const handleSubmit = (reqData: IRegisterRequest) => {
    mutate(reqData)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}
      className="
        bg-gray-200 w-[100vw] h-[100vh] flex flex-col items-center justify-center px-6 gap-5
      ">
      <Link to='/'>
        <GrHomeRounded size={40} />
      </Link>
      <h2 className="text-3xl font-bold"> Faça seu cadastro! </h2>
      <div className="flex flex-col w-[100%] gap-4">
        <Input name='name' displayName='Nome' Icon={FiUser} />
        <Input name='email' type='email' displayName='E-mail' Icon={HiOutlineMail} />
        <Input name='password' type='password' displayName='Senha' Icon={CgLock} />
        <Input name='passwordConfirm' type='password' displayName='Confirme sua senha' Icon={CgLock} />
      </div>
      <div className='flex flex-col items-center w-[100%] gap-5'>
        <span> Ja é cadastrado? <Link to='/user/login' className='underline'> Login </Link> </span>
        <button disabled={isLoading} type='submit' className="
          bg-green-400 w-[100%] h-14 rounded-lg 
          text-white font-semibold text-xl
          flex items-center justify-center 
        ">
          {isLoading
            ? <AiOutlineLoading className='text-white animate-[spin_.6s_linear_infinite]' size={35} />
            : 'Cadastrar'
          }
        </button>
      </div>
    </Form>
  )
}

export default Register
