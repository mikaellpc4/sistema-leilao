import { GrFormClose } from 'react-icons/gr'
import { useState } from 'react'

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

  const [bidValue, setBidValue] = useState('')

  const moneyMask = (value: string) => {
    if(value.length > 17) return value.replace(/.$/,"")
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

  if (!isOpen) return null
  return (
    <>
      <div className='fixed inset-0 h-screen bg-black bg-opacity-50 z-40'></div>
      <div className='fixed inset-0 flex z-50'>
        <div className='relative m-auto bg-gray-200 h-[28%] w-[80%] rounded-lg'>
          <GrFormClose className='absolute right-3 top-3' onClick={closeModal} size={30} />
          <div className='px-5 py-4 flex flex-col items-center'>
            <h1 className='font-bold text-2xl mb-4'> Faça seu lance! </h1>
            <div className='flex flex-col items-end mb-5'>
              <div className='flex flex-col items-center gap-3'>
                <p className='font-bold text-lg'> {auction.name} </p>
                <input className='rounded-md outline-none h-9 px-5 w-48 select-none'
                  placeholder='LC 00,00'
                  value={bidValue ? bidValue : ''}
                  onChange={(e) => {
                    handleInputChange(e)
                  }} />
              </div>
              <span className='text-sm'> Minimo: LC {auction.actualBid ? auction.actualBid : auction.minimumBid}</span>
            </div>
            <button className='bg-green-400 rounded-md p-3 w-[50%]'> Confirmar </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BidModal
