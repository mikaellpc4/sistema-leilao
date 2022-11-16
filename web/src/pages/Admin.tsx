import { Form } from '@unform/web'
import { useContext, useState, useRef } from 'react'
import Input from '../components/Input'
import AuthContext from '../context/AuthProvider'
import NotFound from './NotFound'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FiUser } from 'react-icons/fi'
import Api from '../services/Api'
import { AxiosError } from 'axios'
import { FormHandles } from '@unform/core'
import { Link, Navigate } from 'react-router-dom'

const Admin = () => {
  const { user } = useContext(AuthContext)

  if (user.role !== 'ADMIN') return <NotFound />

  const [LCoinsValue, setLCoinsValue] = useState('LC 0,00')
  const [message, setMessage] = useState('')

  const formRef = useRef<FormHandles>(null)

  const moneyMask = (value: string) => {
    if (value.length > 17) return value.replace(/.$/, "")
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
      Number(value) / 100
    )

    return 'LC ' + result
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLCoinsValue(moneyMask(e.target.value))
  }

  interface IAddLCoinsRequest {
    userId: string,
    LCoins: number
  }

  const handleAddLCoinsRequest = async (data: IAddLCoinsRequest) => {
    formRef.current?.setErrors({})
    setMessage('')
    const { userId } = data
    const normalizedLCoinsValue = Number(LCoinsValue.replace(/[^0-9]/g, '')) / 100
    Api.post('/admin/addLCoins', { userId, LCoins: normalizedLCoinsValue })
      .then((res) => setMessage(res.data))
      .catch((e) => {
        const res = e.response
        if (res.status === 500) {
          alert('Ocorreu um erro do nosso lado, tente novamente mais tarde')
        }
        switch (res.data) {
          case 'O ID do usuário é obrigatorio':
            formRef.current?.setFieldError('userId', res.data)
            break
          case 'O usuário não existe':
            formRef.current?.setFieldError('userId', res.data)
            break
          case 'A quantidade de LCoins é obrigatoria':
            formRef.current?.setFieldError('LCoins', res.data)
            break
          case 'quantidade de LCoins deve ser maior que 0,00':
            formRef.current?.setFieldError('LCoins', res.data)
            break
        }
      })
  }

  return (
    <div className='h-[89vh] bg-gray-100 p-10'>
      <Form ref={formRef} onSubmit={handleAddLCoinsRequest} className='flex flex-col items-center gap-5'>
        <h1 className='font-bold text-xl'> Adicione LCoins ao usuario </h1>
        <div className='flex flex-col gap-3 w-72'>
          <Input name='userId' displayName='Id do usuario' Icon={FiUser} />
          <Input onChange={handleInputChange} value={LCoinsValue} name='LCoins'
            displayName='Quantidade de LCoins' Icon={BsCurrencyDollar} />
        </div>
        <button type='submit' className='bg-green-400 p-5 rounded-lg w-64'> Adicionar </button>
        {message !== '' && <span className='text-green-400 font-semibold text-xl'>{message}</span>}
        <Link to='/'> Inicio </Link>
      </Form>
    </div>
  )
}

export default Admin
