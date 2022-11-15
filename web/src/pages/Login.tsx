import { useState, useRef } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { CgLock } from 'react-icons/cg'
import Input from '../components/Input'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Api from '../services/Api'

const Login = () => {

  const formRef = useRef<FormHandles>(null)

  interface ILoginRequest {
    email: string,
    password: string
  }

  const handleSubmit = (data: ILoginRequest) => {
    formRef.current?.setErrors({})
    Api.post('/user/login', data)
      .then((res) => console.log(res.data))
      .catch((e) => {
        const error = e.response
        if (error.status !== 400) {
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
      })
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}
      className="
        bg-gray-200 w-[100vw] h-[100vh] flex flex-col items-center justify-center px-6 gap-10
      ">
      <h2 className="text-3xl font-bold"> Bem-vindo! </h2>
      <div className="flex flex-col w-[100%] gap-4">
        <Input name='email' displayName='E-mail' type='email' Icon={HiOutlineMail} />
        <Input name='password' displayName='Senha' type='password' Icon={CgLock} />
      </div>
      <button type='submit' className="bg-green-400 w-[100%] h-14 rounded-lg text-white font-semibold text-xl"> Entrar </button>
    </Form>
  )
}

export default Login
