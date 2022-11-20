import { GrFormClose } from 'react-icons/gr'
import { useState, useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'
import Api from '../services/Api'
import { useMutation } from '@tanstack/react-query'
import queryClient from '../services/queryClient'
import { AxiosError } from 'axios'
import normalizeMoney from '../services/normalizeMoney'
import { AiOutlineLoading } from 'react-icons/ai'

interface IBidModal {
  isOpen: boolean,
  closeModal: () => void
  auction: {
    id: string,
    name: string,
    minimumBid: string,
    actualBid: string,
  }
}

const BidModal = ({ isOpen, closeModal, auction }: IBidModal) => {
  if (!isOpen) return null

  const { user, setUser } = useContext(AuthContext);

  if (user.name === '') return <Navigate to='/user/login' />

  const [bidValue, setBidValue] = useState('LC 0,00')

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
    setBidValue(moneyMask(e.target.value))
  }

  type TAddBidResponse = {
    message: string,
    bidValue: number,
    newUserBalance: number
  }

  const addBid = async (data: IAddBidRequest) => {
    return Api.post<typeof data, TAddBidResponse>('/auction/bid', data)
  }

  let prevAuctions: IAuction[] | undefined

  const { error, isLoading, mutateAsync } = useMutation(addBid, {
    onSuccess(res) {
      prevAuctions = queryClient.getQueryData<IAuction[]>(['auctions'])
      const newAuctions = prevAuctions?.map((item) => {
        if (item.props.id === auction.id) {
          return {
            props: {
              ...item.props,
              actualBid: res.bidValue,
              buyerId: user.id,
              buyer: {
                id: user.id,
                name: user.name
              }
            }
          }
        }
        return item
      })
      newAuctions && queryClient.setQueryData<IAuction[]>(['auctions'], newAuctions)
      setUser({
        ...user,
        LCoins: res.newUserBalance
      })
      closeModal()
    },
  })

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const normalizedBidValue = normalizeMoney(bidValue)
    const normalizedBidValueNumber = Number(normalizedBidValue.replace(/[^0-9]/g, '')) / 100
    const data = {
      auctionId: auction.id,
      bidValue: normalizedBidValueNumber,
      bidUserId: user.id
    }
    mutateAsync(data)
  }

  return (
    <form>
      <div className='fixed inset-0 h-screen bg-black bg-opacity-50 z-40'></div>
      <div className='fixed inset-0 flex z-50'>
        <div className='relative m-auto bg-gray-200 h-72 w-[80%] rounded-lg'>
          <GrFormClose className='absolute right-3 top-3' type='button' size={30} onClick={() => {
            if(!isLoading){
              closeModal()
            }
          }}/>
          <div className={`px-5 py-4 flex flex-col items-center gap-${error instanceof AxiosError ? '2' : '7'}`}>
            <h1 className='font-bold text-2xl'> Faça seu lance! </h1>
            <div className='flex flex-col items-center'>
              <div className='flex flex-col items-center gap-2'>
                <p className='font-bold text-lg'> {auction.name} </p>
                <input className='rounded-md outline-none h-9 px-5 w-48 select-none'
                  value={bidValue ? bidValue : ''}
                  onChange={(e) => {
                    handleInputChange(e)
                  }} />
              </div>
              <span className='text-sm self-end'> Minimo: LC {auction.actualBid ? auction.actualBid : auction.minimumBid}</span>
              {error instanceof AxiosError
                ? <span className='text-red-600 font-semibold text-sm max-w-[10rem] text-center'> {error.response?.data} </span>
                : ''
              }
            </div>
            <button onClick={handleSubmit} disabled={isLoading}
              className='
                rounded-md w-[50vw] h-16
                bg-green-400 
                flex justify-center items-center
                text-xl text-white
              '>
              {isLoading
                ? <AiOutlineLoading className='text-white animate-[spin_.6s_linear_infinite]' size={40} />
                : 'Confirmar'
              }
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default BidModal
