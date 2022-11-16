import { useContext, useRef } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { CgLock } from 'react-icons/cg'
import Input from '../components/Input'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import AuthContext from '../context/AuthProvider'
import { Link, Navigate } from 'react-router-dom'
import { GrHomeRounded } from 'react-icons/gr'

const Login = () => {
  const { signIn, user } = useContext(AuthContext);
  if (user.name) return <Navigate to='/' />

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = async (data: ILoginRequest) => {
    signIn(data, formRef)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}
      className="
        bg-gray-200 w-[100vw] h-[100vh] flex flex-col items-center justify-center px-6 gap-7
      ">
      <Link to='/'>
        <GrHomeRounded size={40} />
      </Link>
      <h2 className="text-3xl font-bold"> Bem-vindo! </h2>
      <div className="flex flex-col w-[100%] gap-4">
        <Input name='email' displayName='E-mail' type='email' Icon={HiOutlineMail} />
        <Input name='password' displayName='Senha' type='password' Icon={CgLock} />
      </div>
      <span> Não possui uma conta? <Link to='/user/register' className='underline'> Registre-se agora! </Link> </span>
      <button type='submit' className="bg-green-400 w-[100%] h-14 rounded-lg text-white font-semibold text-xl"> Entrar </button>
    </Form>
  )
}

export default Login
