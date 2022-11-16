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

  const handleSubmit = (data: IRegisterRequest) => {
    formRef.current?.setErrors({})
    Api.post('/user/register', data)
      .then(() => {
        const { email, password } = data
        signIn({ email, password }, formRef)
      })
      .catch((e) => {
        const error = e.response
        if (error.status !== 400) {
          alert('Ocorreu um erro do nosso lado, tente novamente mais tarde')
          return
        }
        switch (error.data) {
          case 'Dados invalidos':
            formRef.current?.setErrors({
              name: error.data,
              email: error.data,
              password: error.data,
              passwordConfirm: error.data
            })
            break
          case 'O nome é obrigatório':
            formRef.current?.setFieldError('name', error.data)
            break
          case 'O nome deve possuir no minimo 3 caracters':
            formRef.current?.setFieldError('name', error.data)
            break
          case 'O email é obrigatório':
            formRef.current?.setFieldError('email', error.data)
            break
          case 'O email não é valido':
            formRef.current?.setFieldError('email', error.data)
            break
          case 'Este email ja foi registrado':
            formRef.current?.setFieldError('email', error.data)
            break
          case 'A senha é obrigatoria':
            formRef.current?.setFieldError('password', error.data)
            break
          case 'A senha deve possuir no minimo 8 caracters':
            formRef.current?.setFieldError('password', error.data)
            break
          case 'As senhas não coincidem':
            formRef.current?.setFieldError('passwordConfirm', error.data)
            break
        }
      })
  }

  return (
    <>
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
          <button type='submit' className="bg-green-400 w-[100%] h-14 rounded-lg text-white font-semibold text-xl"> Cadastrar </button>
        </div>
      </Form>
    </>
  )
}

export default Register
